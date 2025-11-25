import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        // Parse the OAuth response from the URL and store session
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

        if (error) {
          console.error("OAuth callback error:", error.message);
          navigate("/auth");
          return;
        }

        if (data.session) {
          navigate("/dashboard");
        } else {
          navigate("/auth");
        }
      } catch (err) {
        console.error("Unexpected OAuth error:", err);
        navigate("/auth");
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
}
