import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, Mail, Palette, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGmailStatus();
    handleOAuthCallback();
  }, []);

  const fetchGmailStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("gmail_connected")
        .eq("id", user?.id)
        .single();

      if (!error && data) {
        setGmailConnected(data.gmail_connected || false);
      }
    } catch (error) {
      console.error("Failed to fetch Gmail status:", error);
    }
  };

  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('connect-gmail', {
          body: { action: 'connect', code }
        });

        if (error) throw error;

        toast.success("Gmail connected successfully");
        setGmailConnected(true);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error: any) {
        console.error('OAuth callback error:', error);
        toast.error(error.message || "Failed to complete Gmail connection");
      } finally {
        setLoading(false);
      }
    }
  };

  const connectGmail = async () => {
    setLoading(true);
    try {
      const redirectUri = `${window.location.origin}/settings`;
      
      // Get OAuth URL from backend
      const { data, error } = await supabase.functions.invoke('get-gmail-auth-url', {
        body: { redirect_uri: redirectUri }
      });

      if (error) throw error;

      // Redirect to Google OAuth
      window.location.href = data.auth_url;
    } catch (error: any) {
      console.error('Gmail connection error:', error);
      toast.error(error.message || "Failed to initiate Gmail connection");
      setLoading(false);
    }
  };

  const disconnectGmail = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("connect-gmail", {
        body: { action: "disconnect" },
      });

      if (error) throw error;

      setGmailConnected(false);
      toast.success("Gmail disconnected successfully");
    } catch (error: any) {
      console.error("Gmail disconnection error:", error);
      toast.error("Failed to disconnect Gmail");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <LinkIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Gmail Integration</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Gmail account to automatically fetch and analyze your emails for security threats.
            </p>
            {gmailConnected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Gmail Connected</span>
                </div>
                <Button
                  onClick={disconnectGmail}
                  variant="destructive"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    "Disconnect Gmail"
                  )}
                </Button>
              </div>
            ) : (
              <Button onClick={connectGmail} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Connect Gmail
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Account</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={user?.email || ""} disabled className="mt-2" />
            </div>
            <div>
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your name" 
                defaultValue={user?.user_metadata?.full_name || ""}
                className="mt-2" 
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications for threats</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Alerts</p>
                <p className="text-sm text-muted-foreground">Get email alerts for dangerous emails</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-foreground">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-Scan New Emails</p>
                <p className="text-sm text-muted-foreground">Automatically scan incoming emails</p>
              </div>
              <Switch checked={autoScan} onCheckedChange={setAutoScan} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
