import { Shield, Zap, Lock, Brain, CheckCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning models analyze email patterns, sender behavior, and content to identify sophisticated threats.",
  },
  {
    icon: Zap,
    title: "Real-Time Scanning",
    description:
      "Instant email analysis as messages arrive. Get threat alerts within milliseconds of receiving suspicious emails.",
  },
  {
    icon: Shield,
    title: "Multi-Layer Protection",
    description:
      "SPF, DKIM, DMARC validation combined with content analysis, link checking, and attachment scanning.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your emails stay private. Local-first processing with encrypted transmission and minimal data retention.",
  },
  {
    icon: CheckCircle,
    title: "Smart Risk Scoring",
    description:
      "Color-coded 0-100 risk scores help you instantly identify safe emails vs dangerous threats.",
  },
  {
    icon: AlertTriangle,
    title: "Actionable Insights",
    description:
      "Detailed threat breakdowns with recommendations: block sender, report phishing, or safely delete.",
  },
];

export const Features = () => {
  return (
    <section className="bg-[#08192e] text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl text-orange-400">
            Enterprise-Grade Security
            <br />
            <span className="text-orange-500">For Everyone</span>
          </h2>
          <p className="text-orange-300 text-lg">
            Stop phishing, spoofing, and malicious emails with AI technology
            trusted by security professionals worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-2 border-orange-400 hover:border-orange-500 transition-all hover:shadow-[0_0_20px_rgba(255,165,0,0.5)] rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-orange-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
