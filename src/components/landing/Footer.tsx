import React from "react";

export const Footer = () => {
  const footerSections = [
    {
      title: "ABOUT US",
      links: [
        { text: "About Page", href: "/about" },
        { text: "Contact", href: "/contact" },
        { text: "Team", href: "/team" },
        { text: "Branding", href: "/branding" },
        { text: "Careers", href: "/careers" },
        { text: "Press", href: "/press" },
      ],
    },
    {
      title: "FEATURES",
      links: [
        "Email Verification",
        "Link & Image Scanning",
        "Risk Scoring",
        "Alert System",
        "Real-time Protection",
      ],
    },
    {
      title: "SOLUTIONS",
      links: [
        "Individuals",
        "Small Businesses",
        "Enterprises",
        "Remote Teams",
        "Education",
      ],
    },
    {
      title: "DOWNLOAD",
      links: [
        {
          text: "Chrome Extension",
          href: "https://chrome.google.com/webstore/detail/mailinsight-extension-link",
        },
        {
          text: "Outlook Add-in",
          href: "https://appsource.microsoft.com/en-us/product/office/WA200005432",
        },
        {
          text: "Android App",
          href: "https://play.google.com/store/apps/details?id=mailinsight.android",
        },
        {
          text: "iOS App",
          href: "https://apps.apple.com/app/mailinsight-ios",
        },
      ],
    },
    {
      title: "RESOURCES",
      links: ["Pricing", "Blog", "FAQs", "Security Tips", "Support"],
    },
  ];

  return (
    <footer className="bg-[#081325] text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {footerSections.map((section, index) => (
          <div key={index}>
            <h4 className="text-orange-400 font-semibold mb-3">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, linkIndex) => {
                // Object links have href + text
                if (typeof link === "object" && link.href) {
                  return (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-orange-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-sm text-orange-400">
        &copy; CyberKnights Team
      </div>
    </footer>
  );
};
