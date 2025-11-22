import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const dropdownData = {
  Features: [
    {
      title: "EMAIL VERIFICATION",
      description:
        "Mail Insight verifies sender domains and detects impersonation by comparing email sources against trusted domain records and known phishing patterns.",
    },
    {
      title: "SCANNING LINKS AND IMAGES",
      description:
        "Scans embedded links in emails, checks mismatched URLs, and validates them using threat intelligence like Google Safe Browse.",
    },
    {
      title: "RISK SCORING",
      description:
        "Assigns a risk score based on sender history, message content, and known scams.",
    },
    {
      title: "ALERT SYSTEM",
      description:
        "Real-time pop-up warnings and personalized recommendations based on the risk score.",
    },
  ],
  Pricing: [
    {
      title: "Free Basic Plan",
      description:
        "Price: Free\nLimited email verification, basic link scanning, standard risk scoring, email alerts.",
    },
    {
      title: "Standard Plan",
      description:
        "Price: $5/month or $50/year (save 17%)\nAll Free Basic, plus: unlimited email verification, advanced scanning, daily reports, support.",
    },
    {
      title: "Premium Plan",
      description:
        "Price: $15/month or $150/year\nAll Standard, plus: threat intelligence, customizable risk scoring, API, account manager, 24/7 support.",
    },
  ],
  Download: [
    { title: "🧩 Chrome Extension" },
    { title: "📧 Outlook Add-in" },
  ],
  Tutorial: [
    { title: "1. Install from Chrome Web Store." },
    { title: "2. Pin to browser toolbar." },
    { title: "3. Sign in with your email." },
    { title: "4. Open inbox for real-time scanning." },
    { title: "5. Follow alerts & recommendations." },
  ],
};

export const Header: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white sticky top-0 z-50 w-full shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full border-2 border-green-500 p-0.5 shadow-sm">
            <svg viewBox="0 0 48 48" className="w-full h-full">
              {/* Envelope base */}
              <path
                d="M8 14 L24 26 L40 14 L40 34 C40 36 38 38 36 38 L12 38 C10 38 8 36 8 34 Z"
                fill="url(#gradient1)"
                stroke="#f97316"
                strokeWidth="1.5"
              />
              {/* Envelope flap */}
              <path
                d="M8 14 L24 26 L40 14 L24 8 Z"
                fill="#fb923c"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Shield overlay */}
              <path
                d="M32 18 L32 26 C32 28 30 31 24 32 C18 31 16 28 16 26 L16 18 L24 16 Z"
                fill="rgba(255,255,255,0.95)"
                stroke="#ea580c"
                strokeWidth="1.5"
              />
              {/* Check mark inside shield */}
              <path
                d="M20 24 L22 26 L28 20"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-orange-600 font-bold text-xl">MailInsight</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {Object.keys(dropdownData).map((key) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setOpenDropdown(key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 font-medium hover:text-orange-600 transition-colors">
                {key} <ChevronDown size={16} />
              </button>

              {openDropdown === key && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg p-4 space-y-3 border border-gray-200 z-50">
                  {dropdownData[key as keyof typeof dropdownData].map((item, idx) => {
                    const linksMap: Record<string, string> = {
                      "🧩 Chrome Extension":
                        "https://chrome.google.com/webstore/detail/mailinsight-extension-link",
                      "📧 Outlook Add-in":
                        "https://appsource.microsoft.com/en-us/product/office/WA200005432",
                    };
                    const isLink = linksMap[item.title];

                    return isLink ? (
                      <a
                        key={idx}
                        href={linksMap[item.title]}
                        target="_blank"
                        rel="noopener"
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors text-gray-700"
                      >
                        <span className="font-semibold text-orange-600">{item.title}</span>
                      </a>
                    ) : (
                      <div key={idx} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed whitespace-pre-line">
                            {item.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex bg-orange-400 text-black rounded-full px-6 hover:bg-orange-500"
            onClick={() => (window.location.href = "/auth")}
          >
            INSTALL
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6"
            onClick={() => (window.location.href = "/auth")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;