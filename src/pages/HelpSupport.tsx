import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, Mail, Book, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const HelpSupport = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted successfully");
  };

  const resources = [
    {
      icon: Book,
      title: "Documentation",
      description: "Learn how to use MailInsight AI effectively",
      link: "#",
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users and share tips",
      link: "#",
    },
    {
      icon: ExternalLink,
      title: "API Reference",
      description: "Integrate MailInsight AI with your tools",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {resources.map((resource, idx) => {
          const Icon = resource.icon;
          return (
            <Card key={idx} className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Contact Support</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              type="text" 
              placeholder="Describe your issue briefly"
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Provide detailed information about your issue"
              className="mt-2 min-h-32"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Submit Ticket
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">How accurate is the threat detection?</h3>
            <p className="text-sm text-muted-foreground">Our AI-powered system achieves over 95% accuracy in detecting phishing and malicious emails.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Can I integrate with other email providers?</h3>
            <p className="text-sm text-muted-foreground">Currently, we support Gmail. Support for Outlook and other providers is coming soon.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">How is my data protected?</h3>
            <p className="text-sm text-muted-foreground">All email data is encrypted end-to-end and processed securely. We never share your data with third parties.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HelpSupport;
