import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, Zap, Crown } from "lucide-react";

const Billing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "100 emails per month",
        "Basic threat detection",
        "Email support",
        "7-day retention",
      ],
      current: true,
      icon: Check,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      features: [
        "Unlimited emails",
        "Advanced AI analysis",
        "Priority support",
        "30-day retention",
        "Custom alerts",
      ],
      current: false,
      icon: Zap,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Unlimited retention",
        "Dedicated support",
        "Custom integrations",
      ],
      current: false,
      icon: Crown,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Billing & Plans</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Current Plan: Free</h2>
            <p className="text-muted-foreground">You're currently on the Free plan</p>
          </div>
          <Badge className="bg-gradient-primary text-white px-4 py-2">Active</Badge>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <Card key={idx} className={`p-6 ${plan.current ? "border-primary border-2" : ""}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  {plan.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
        <p className="text-muted-foreground mb-4">No payment method on file</p>
        <Button variant="outline">Add Payment Method</Button>
      </Card>
    </div>
  );
};

export default Billing;
