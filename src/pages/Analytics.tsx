import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Mail, Shield } from "lucide-react";
import { toast } from "sonner";

interface EmailScan {
  risk_level: "safe" | "suspicious" | "dangerous";
  received_date: string;
  risk_score: number;
}

const Analytics = () => {
  const [emails, setEmails] = useState<EmailScan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmailScans();
  }, []);

  const fetchEmailScans = async () => {
    try {
      const { data, error } = await supabase
        .from("email_scans")
        .select("risk_level, received_date, risk_score")
        .order("received_date", { ascending: false });

      if (error) throw error;
      setEmails((data || []) as EmailScan[]);
    } catch (error: any) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: emails.length,
    safe: emails.filter((e) => e.risk_level === "safe").length,
    suspicious: emails.filter((e) => e.risk_level === "suspicious").length,
    dangerous: emails.filter((e) => e.risk_level === "dangerous").length,
    avgRiskScore: emails.length > 0 
      ? Math.round(emails.reduce((sum, e) => sum + e.risk_score, 0) / emails.length)
      : 0,
  };

  const safetyRate = emails.length > 0 
    ? Math.round((stats.safe / stats.total) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Scanned</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stats.total}</p>
            </div>
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Safety Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{safetyRate}%</p>
            </div>
            <Shield className="h-12 w-12 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Risk Score</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stats.avgRiskScore}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.safe}</p>
              <p className="text-sm text-muted-foreground">Safe Emails</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.suspicious}</p>
              <p className="text-sm text-muted-foreground">Suspicious Emails</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.dangerous}</p>
              <p className="text-sm text-muted-foreground">Dangerous Emails</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Threat Distribution</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Safe</span>
              <span className="text-sm font-semibold text-foreground">{stats.safe}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 transition-all" 
                style={{ width: `${stats.total > 0 ? (stats.safe / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Suspicious</span>
              <span className="text-sm font-semibold text-foreground">{stats.suspicious}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-600 transition-all" 
                style={{ width: `${stats.total > 0 ? (stats.suspicious / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Dangerous</span>
              <span className="text-sm font-semibold text-foreground">{stats.dangerous}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all" 
                style={{ width: `${stats.total > 0 ? (stats.dangerous / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
