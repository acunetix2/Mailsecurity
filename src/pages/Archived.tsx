import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Search, Archive, Loader2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface EmailScan {
  id: string;
  email_id: string;
  subject: string;
  sender: string;
  sender_email: string;
  preview: string;
  received_date: string;
  risk_score: number;
  risk_level: "safe" | "suspicious" | "dangerous";
  threat_indicators: string[];
  analysis_summary: string;
  is_read: boolean;
}

const Archived = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<EmailScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchArchivedEmails();
  }, []);

  const fetchArchivedEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("email_scans")
        .select("*")
        .order("received_date", { ascending: false });

      if (error) throw error;
      setEmails((data || []) as EmailScan[]);
    } catch (error: any) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to load archived emails");
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (riskLevel: string, riskScore: number) => {
    const variants: Record<string, { color: string; icon: any }> = {
      safe: { color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle },
      suspicious: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: AlertTriangle },
      dangerous: { color: "bg-red-500/10 text-red-600 border-red-500/20", icon: AlertTriangle },
    };
    const config = variants[riskLevel] || variants.safe;
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} border px-3 py-1`}>
        <Icon className="h-3 w-3 mr-1" />
        {riskScore}
      </Badge>
    );
  };

  const filteredEmails = emails.filter((email) =>
    searchQuery === "" ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Archive className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Archived Emails</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archived emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredEmails.length === 0 ? (
        <div className="text-center py-16">
          <Archive className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Archived Emails</h3>
          <p className="text-muted-foreground">Archived emails will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => navigate(`/email/${email.id}`)}
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:shadow-soft transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {getRiskBadge(email.risk_level, email.risk_score)}
                    <h3 className="font-semibold text-foreground truncate">{email.subject}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    From: {email.sender} &lt;{email.sender_email}&gt;
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(email.received_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archived;
