import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  Mail,
  Clock,
  User,
  FileText,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface EmailScan {
  id: string;
  subject: string;
  sender: string;
  sender_email: string;
  content_preview: string;
  received_date: string;
  risk_score: number;
  risk_level: "safe" | "suspicious" | "dangerous";
  threat_indicators: string[];
  analysis_summary: string;
  has_attachments: boolean;
}

const EmailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<EmailScan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEmailDetail(id);
    }
  }, [id]);

  const fetchEmailDetail = async (emailId: string) => {
    try {
      const { data, error } = await supabase
        .from("email_scans")
        .select("*")
        .eq("id", emailId)
        .single();

      if (error) throw error;
      setEmail(data as EmailScan);
    } catch (error: any) {
      console.error("Error fetching email:", error);
      toast.error("Failed to load email details");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    const colors = {
      safe: "text-green-600 bg-green-500/10 border-green-500/20",
      suspicious: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20",
      dangerous: "text-red-600 bg-red-500/10 border-red-500/20",
    };
    return colors[riskLevel as keyof typeof colors] || colors.safe;
  };

  const getRiskIcon = (riskLevel: string) => {
    if (riskLevel === "safe") return <CheckCircle className="h-8 w-8" />;
    return <AlertTriangle className="h-8 w-8" />;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inbox
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-foreground">Email Security Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Risk Score Card */}
        <Card className={`p-8 mb-8 border-2 ${getRiskColor(email.risk_level)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getRiskIcon(email.risk_level)}
              <div>
                <h2 className="text-2xl font-bold capitalize mb-1">
                  {email.risk_level} Email
                </h2>
                <p className="text-sm opacity-90">
                  Risk Score: {email.risk_score}/100
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{email.risk_score}</div>
              <div className="text-sm opacity-90">Threat Level</div>
            </div>
          </div>
        </Card>

        {/* Email Details */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subject</label>
              <p className="text-foreground mt-1 font-medium">{email.subject}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <User className="h-4 w-4" />
                  From
                </label>
                <p className="text-foreground mt-1">
                  {email.sender} &lt;{email.sender_email}&gt;
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Received
                </label>
                <p className="text-foreground mt-1">
                  {new Date(email.received_date).toLocaleString()}
                </p>
              </div>
            </div>

            {email.has_attachments && (
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Attachments
                </label>
                <Badge variant="secondary" className="mt-1">
                  Contains Attachments
                </Badge>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">Content Preview</label>
              <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground whitespace-pre-wrap">{email.content_preview}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Threat Analysis */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Threat Analysis
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Summary</label>
              <p className="text-foreground mt-2 leading-relaxed">
                {email.analysis_summary}
              </p>
            </div>

            {email.threat_indicators && email.threat_indicators.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Threat Indicators ({email.threat_indicators.length})
                </label>
                <div className="space-y-2">
                  {email.threat_indicators.map((indicator, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{indicator}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Recommended Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recommended Actions
          </h3>
          <div className="space-y-3">
            {email.risk_level === "dangerous" && (
              <>
                <div className="flex items-center gap-3 text-red-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Delete this email immediately</span>
                </div>
                <div className="flex items-center gap-3 text-red-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Report as phishing to your email provider</span>
                </div>
                <div className="flex items-center gap-3 text-red-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Do not click any links or open attachments</span>
                </div>
              </>
            )}
            {email.risk_level === "suspicious" && (
              <>
                <div className="flex items-center gap-3 text-yellow-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Exercise caution with this email</span>
                </div>
                <div className="flex items-center gap-3 text-yellow-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Verify sender identity through alternate channels</span>
                </div>
                <div className="flex items-center gap-3 text-yellow-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Avoid clicking links or downloading attachments</span>
                </div>
              </>
            )}
            {email.risk_level === "safe" && (
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>This email appears safe based on our analysis</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailDetail;
