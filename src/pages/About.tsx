import { useState } from "react";
import { Shield, Mail, Lock, Zap, Users, Target, Award, Heart, ChevronDown, Sparkles, Brain, Eye } from "lucide-react";

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const features = [
    {
      id: "verification",
      icon: Shield,
      title: "Email Verification",
      color: "orange",
      preview: "Advanced sender authentication and domain verification",
      content: "MailInsight employs state-of-the-art email verification technology that goes beyond basic SPF, DKIM, and DMARC checks. Our system analyzes sender domains, compares them against trusted records, detects domain spoofing attempts, and identifies impersonation patterns used by sophisticated attackers. We maintain a real-time database of known malicious domains and use machine learning to identify new threats as they emerge."
    },
    {
      id: "scanning",
      icon: Zap,
      title: "Real-Time Scanning",
      color: "blue",
      preview: "Instant analysis of links, attachments, and content",
      content: "Every email that enters your inbox is scanned in real-time using our advanced AI engine. We check embedded URLs against threat intelligence databases, analyze attachment behavior patterns, inspect image metadata for hidden threats, and evaluate content for social engineering tactics. Our scanning process completes in milliseconds, ensuring you're protected without any noticeable delay."
    },
    {
      id: "risk",
      icon: Brain,
      title: "Intelligent Risk Scoring",
      color: "purple",
      preview: "AI-powered threat assessment for every message",
      content: "Our proprietary risk scoring algorithm evaluates multiple factors to assign each email a security rating. We analyze sender reputation history, message content patterns, link destinations and redirects, attachment characteristics, and behavioral anomalies. The system learns from millions of data points daily, continuously improving its accuracy and adapting to new threat vectors."
    },
    {
      id: "privacy",
      icon: Lock,
      title: "Privacy-First Architecture",
      color: "green",
      preview: "Your data stays encrypted and confidential",
      content: "Privacy is at the core of MailInsight's design. All email analysis happens using zero-knowledge encryption techniques that allow us to detect threats without accessing your message content. Your emails are never stored on our servers, all processing is done in real-time and discarded immediately, and we maintain strict data isolation between users. We're committed to transparency and compliance with international privacy regulations including GDPR and CCPA."
    }
  ];

  const teamValues = [
    {
      id: "mission",
      icon: Target,
      title: "Our Mission",
      content: "In an era where email remains a primary attack vector for cyberattacks, MailInsight was born from a simple vision: make enterprise-grade email security accessible to everyone. We believe that protecting yourself from phishing, malware, and social engineering shouldn't require a cybersecurity degree or expensive infrastructure. Our mission is to democratize email security through intelligent, automated protection that works invisibly in the background."
    },
    {
      id: "team",
      icon: Users,
      title: "The CyberKnights Team",
      content: "MailInsight is developed by CyberKnights, a collective of cybersecurity researchers, AI engineers, and full-stack developers united by a passion for digital safety. Our team brings together expertise from leading tech companies, academic research institutions, and cybersecurity firms. We've worked on everything from threat intelligence platforms to machine learning systems, and we're applying that knowledge to solve one of the internet's most persistent problems: email security."
    },
    {
      id: "innovation",
      icon: Sparkles,
      title: "Continuous Innovation",
      content: "The threat landscape evolves daily, and so do we. Our research team monitors emerging attack patterns, analyzes new phishing techniques, and continuously updates our AI models. We invest heavily in R&D, partnering with security researchers worldwide and contributing to open-source security projects. We continuously process emails to refine our detection algorithms, ensuring MailInsight stays ahead of the latest threats."
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      green: "bg-green-100 text-green-600 border-green-200"
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-950 to-black text-white py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="relative h-24 w-24 mb-8 rounded-full border-3 border-green-500 p-1.5 shadow-2xl animate-float">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <path
                  d="M8 14 L24 26 L40 14 L40 34 C40 36 38 38 36 38 L12 38 C10 38 8 36 8 34 Z"
                  fill="url(#gradient-hero)"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 14 L24 26 L40 14 L24 8 Z"
                  fill="#fb923c"
                  stroke="#f97316"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M32 18 L32 26 C32 28 30 31 24 32 C18 31 16 28 16 26 L16 18 L24 16 Z"
                  fill="rgba(255,255,255,0.95)"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 24 L22 26 L28 20"
                  stroke="#ea580c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-6xl font-bold mb-6">
              About <span className="text-orange-500">MailInsight</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Next-generation email security powered by artificial intelligence. Protecting inboxes worldwide.
            </p>
            <div className="mt-8 flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                <span>Advanced Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Real-Time Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-500" />
                <span>Zero-Knowledge Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Dropdowns */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MailInsight Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any feature to learn more about our advanced security technology
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isOpen = openSection === feature.id;
              
              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleSection(feature.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${getColorClasses(feature.color)}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.preview}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-[72px] pr-8">
                        <p className="text-gray-700 leading-relaxed">
                          {feature.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team & Values Section with Dropdowns */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Story & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about the team and principles behind MailInsight
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {teamValues.map((item) => {
              const Icon = item.icon;
              const isOpen = openSection === item.id;
              
              return (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-orange-200 overflow-hidden hover:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-orange-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-[72px] pr-8">
                        <p className="text-gray-700 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-orange-950 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">
                <Shield className="h-16 w-16 mx-auto" />
              </div>
              <div className="text-gray-300 mt-4">Enterprise-Grade Security</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">
                <Zap className="h-16 w-16 mx-auto" />
              </div>
              <div className="text-gray-300 mt-4">Lightning-Fast Scanning</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-500 mb-2">
                <Lock className="h-16 w-16 mx-auto" />
              </div>
              <div className="text-gray-300 mt-4">Privacy Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Secure Your Inbox?
            </h2>
            <p className="text-xl text-orange-100 mb-10 leading-relaxed">
              Join users who trust MailInsight to protect their email communications every day.
            </p>
            <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative h-10 w-10 rounded-full border-2 border-green-500 p-0.5">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path
                    d="M8 14 L24 26 L40 14 L40 34 C40 36 38 38 36 38 L12 38 C10 38 8 36 8 34 Z"
                    fill="url(#gradient-footer)"
                    stroke="#f97316"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 14 L24 26 L40 14 L24 8 Z"
                    fill="#fb923c"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 18 L32 26 C32 28 30 31 24 32 C18 31 16 28 16 26 L16 18 L24 16 Z"
                    fill="rgba(255,255,255,0.95)"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 24 L22 26 L28 20"
                    stroke="#ea580c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MailInsight</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 MailInsight. Powered by <span className="text-orange-500 font-semibold">CyberKnights Team</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default About;