import React from "react";
import laptopScanning from "@/assets/laptop-scanning.png"; // or "../assets/laptop-scanning.png"

export const Hero: React.FC = () => {
  return (
    <section className="bg-[#08192e] text-white py-16 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Left: Text Content */}
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
          Welcome to <span className="italic text-orange-500">MailInsight®</span> : AI-Powered Email Security
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-orange-400 mb-6">
          where we protect your data
        </h2>
        <p className="text-white-600 text-md leading-relaxed">
          <span className="italic text-white-600">An AI-powered tool </span> designed to protect users from phishing and email scams as they happen.
          MailInsight scans your emails in real-time, providing instant alerts and recommendations to keep your inbox safe.
          With advanced threat detection, it identifies suspicious links, verifies sender authenticity, and offers personalized security tips.
          Whether you're using Gmail, Outlook, or any other email service, MailInsight seamlessly integrates to enhance your email security.
        </p>
      </div>

      {/* Right: Image with hover glow */}
      <div className="md:w-1/2 relative rounded-xl overflow-hidden border-2 border-orange-400 shadow-lg transition-all duration-200 hover:shadow-[0_0_20px_#3B82F6]">
        <img
          src={laptopScanning}
          alt="Email protection view"
          className="w-full h-auto object-cover"
        />

        {/* Email Status Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/80 text-green-400 p-4 rounded-lg text-sm shadow-md w-[90%] md:w-auto">
          <p className="text-green-500 font-medium">youremail@example.com</p>
          <p>MailInsight is analyzing your inbox</p>
          <p>
            Protection Status: <span className="font-bold text-green-600">Active</span>
          </p>
        </div>
      </div>
    </section>
  );
};
