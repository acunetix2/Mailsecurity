// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        // v2 reads the session automatically from URL if detectSessionInUrl=true
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("OAuth callback error:", error.message);
          navigate("/auth");
          return;
        }

        if (session) {
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
