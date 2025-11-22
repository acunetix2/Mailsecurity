import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EmailAnalysisSchema = z.object({
  emailId: z.string().min(1, "Email ID is required").max(255, "Email ID too long"),
  subject: z.string().min(1, "Subject is required").max(500, "Subject must be less than 500 characters"),
  sender: z.string().min(1, "Sender name is required").max(255, "Sender name too long"),
  senderEmail: z.string().email("Invalid email format").max(255, "Email address too long"),
  content: z.string().min(1, "Content is required").max(50000, "Content must be less than 50KB"),
  receivedDate: z.string().datetime("Invalid date format"),
  hasAttachments: z.boolean(),
});

type EmailAnalysisRequest = z.infer<typeof EmailAnalysisSchema>;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract user from JWT token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client with service role for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Verify the JWT and get user
    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error("User verification failed:", userError);
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: userError?.message || "Invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("User authenticated:", user.id);

    // Parse and validate request body
    const requestBody = await req.json();
    const validationResult = EmailAnalysisSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      console.error("Validation failed:", errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data", 
          details: errors 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailData = validationResult.data;
    console.log("Analyzing email:", emailData.subject);

    // Call Lovable AI for threat analysis
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an advanced email security analyst AI. Analyze emails for phishing, spoofing, malicious content, and security threats.

Return a JSON object with:
- riskScore (0-100): Overall threat level
- riskLevel ("safe" | "suspicious" | "dangerous"): Based on score: 0-30=safe, 31-70=suspicious, 71-100=dangerous
- threatIndicators (array): List of specific threats found
- analysisSummary (string): Brief explanation of findings

Evaluate:
1. Sender authenticity (domain reputation, email patterns)
2. Subject line for phishing keywords (urgent, verify, suspended, action required)
3. Content analysis (suspicious links, requests for credentials, urgency tactics)
4. Grammar and formatting anomalies
5. Attachment risks
6. Social engineering tactics`,
          },
          {
            role: "user",
            content: `Analyze this email for security threats:

Subject: ${emailData.subject}
Sender: ${emailData.sender} <${emailData.senderEmail}>
Has Attachments: ${emailData.hasAttachments}
Content: ${emailData.content.substring(0, 2000)}

Provide detailed threat analysis.`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI analysis failed:", aiResponse.status, errorText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    const analysisText = aiResult.choices[0]?.message?.content || "";

    // Parse AI response (expecting JSON)
    let analysis;
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if AI doesn't return JSON
        analysis = {
          riskScore: 15,
          riskLevel: "safe",
          threatIndicators: [],
          analysisSummary: analysisText.substring(0, 500),
        };
      }
    } catch {
      analysis = {
        riskScore: 15,
        riskLevel: "safe",
        threatIndicators: ["Unable to parse detailed analysis"],
        analysisSummary: analysisText.substring(0, 500),
      };
    }

    // Store scan result in database
    const { data: scanResult, error: dbError } = await supabaseClient
      .from("email_scans")
      .insert({
        user_id: user.id,
        email_id: emailData.emailId,
        subject: emailData.subject,
        sender: emailData.sender,
        sender_email: emailData.senderEmail,
        preview: emailData.content.substring(0, 200),
        received_date: emailData.receivedDate,
        risk_score: analysis.riskScore,
        risk_level: analysis.riskLevel,
        threat_indicators: analysis.threatIndicators,
        analysis_summary: analysis.analysisSummary,
        content_preview: emailData.content.substring(0, 500),
        has_attachments: emailData.hasAttachments,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Email analysis complete:", scanResult.id);

    return new Response(JSON.stringify(scanResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in analyze-email function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
