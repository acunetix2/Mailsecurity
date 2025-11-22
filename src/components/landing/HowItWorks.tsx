import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Gmail",
    description:
      "Securely authenticate with Google OAuth. We only request read-only access to scan your emails.",
  },
  {
    number: "02",
    title: "Automatic Scanning Begins",
    description:
      "AI immediately analyzes all emails in your inbox, checking for threats without any manual action.",
  },
  {
    number: "03",
    title: "View Threat Reports",
    description:
      "Browse your dashboard to see risk scores, detailed analysis, and actionable recommendations.",
  },
  {
    number: "04",
    title: "Stay Protected",
    description:
      "Continuous monitoring scans new emails as they arrive, keeping you safe 24/7.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-[#081325] text-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl text-orange-400">
            Security in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
              Four Simple Steps
            </span>
          </h2>
          <p className="text-lg text-orange-200">
            Get protected in under 60 seconds. No configuration, no manual scanning required.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-2xl bg-[#0b1c31] shadow-md border border-orange-700 transition-all hover:shadow-lg animate-slide-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white text-2xl font-bold shadow-soft">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold text-orange-400 group-hover:text-orange-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-orange-200 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-8 text-orange-700/50">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
