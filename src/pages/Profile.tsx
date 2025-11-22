import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    return user?.email?.split("@")[0] || "User";
  };

  const handleSave = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage 
              src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture} 
              alt={getUserDisplayName()} 
            />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold text-3xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{getUserDisplayName()}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              type="text" 
              defaultValue={getUserDisplayName()}
              className="mt-2" 
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                value={user?.email || ""} 
                disabled 
                className="pl-10" 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="joined">Member Since</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="joined" 
                type="text" 
                value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"} 
                disabled 
                className="pl-10" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Connected Accounts</h3>
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">Gmail</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Disconnect</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
