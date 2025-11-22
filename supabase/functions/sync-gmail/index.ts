import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user's Gmail refresh token from profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("gmail_refresh_token")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.gmail_refresh_token) {
      return new Response(
        JSON.stringify({ error: "Gmail not connected. Please connect your Gmail account first." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Fetching Gmail access token...");

    // Exchange refresh token for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: Deno.env.get("GOOGLE_CLIENT_ID") ?? "",
        client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET") ?? "",
        refresh_token: profile.gmail_refresh_token,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token refresh failed:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to refresh Gmail access token" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { access_token } = await tokenResponse.json();
    console.log("Access token obtained");

    // Fetch recent emails from Gmail
    const gmailResponse = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=is:inbox",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (!gmailResponse.ok) {
      const errorText = await gmailResponse.text();
      console.error("Gmail API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch emails from Gmail" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await gmailResponse.json();

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ message: "No new emails to analyze", count: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${messages.length} emails to analyze`);

    // Process each email
    let analyzedCount = 0;
    const errors: string[] = [];

    for (const message of messages) {
      try {
        // Fetch full email details
        const emailResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (!emailResponse.ok) continue;

        const emailData = await emailResponse.json();
        const headers = emailData.payload.headers;

        const subject = headers.find((h: any) => h.name === "Subject")?.value || "No Subject";
        const from = headers.find((h: any) => h.name === "From")?.value || "Unknown";
        const date = headers.find((h: any) => h.name === "Date")?.value || new Date().toISOString();

        // Extract sender name and email
        const senderMatch = from.match(/^(.*?)\s*<(.+?)>$/) || from.match(/^(.+)$/);
        const senderName = senderMatch?.[1]?.trim() || from;
        const senderEmail = senderMatch?.[2]?.trim() || from;

        // Get email body
        let body = "";
        if (emailData.payload.parts) {
          const textPart = emailData.payload.parts.find(
            (p: any) => p.mimeType === "text/plain"
          );
          if (textPart?.body?.data) {
            body = atob(textPart.body.data.replace(/-/g, "+").replace(/_/g, "/"));
          }
        } else if (emailData.payload.body?.data) {
          body = atob(emailData.payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
        }

        // Check if already analyzed
        const { data: existing } = await supabaseClient
          .from("email_scans")
          .select("id")
          .eq("email_id", message.id)
          .eq("user_id", user.id)
          .single();

        if (existing) {
          console.log(`Email ${message.id} already analyzed, skipping`);
          continue;
        }

        // Analyze email using existing function
        const analysisResponse = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/analyze-email`,
          {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailId: message.id,
              subject,
              sender: senderName,
              senderEmail,
              content: body.substring(0, 10000),
              receivedDate: new Date(date).toISOString(),
              hasAttachments: emailData.payload.parts?.some(
                (p: any) => p.filename && p.filename.length > 0
              ) || false,
            }),
          }
        );

        if (analysisResponse.ok) {
          analyzedCount++;
        } else {
          const error = await analysisResponse.text();
          errors.push(`Failed to analyze ${subject}: ${error}`);
        }
      } catch (error: any) {
        console.error("Error processing email:", error);
        errors.push(error.message);
      }
    }

    console.log(`Successfully analyzed ${analyzedCount} emails`);

    return new Response(
      JSON.stringify({
        success: true,
        analyzed: analyzedCount,
        total: messages.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in sync-gmail function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
