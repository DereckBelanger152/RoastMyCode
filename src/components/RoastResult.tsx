import React, { useState } from "react";
import { ArrowLeft, Share2, Copy, Check } from "lucide-react";
import { IntensityLevel, AIProfile } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

interface RoastResultProps {
  result: {
    code: string;
    language: string;
    intensity: IntensityLevel;
    profile: AIProfile;
    response: string;
    timestamp: number;
  };
  onBack: () => void;
}

const intensityColors = {
  mild: "text-gold",
  medium: "text-navy",
  spicy: "text-[#e85c3a]",
  brutal: "text-[#ff4d4d]",
};

const profileLabels = {
  meanTeacher: "Mean Teacher",
  angrySenior: "Angry Senior Dev",
  sarcasticMentor: "Sarcastic Mentor",
  disappointedArchitect: "Disappointed Architect",
};

const RoastResult: React.FC<RoastResultProps> = ({ result, onBack }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(result.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "RoastMyCode - Code Roast",
          text: `Check out this ${result.intensity} code roast from ${
            profileLabels[result.profile]
          }:\n\n${result.response}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
      handleCopy();
    }
  };

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300
      ${theme === "dark" ? "bg-navy" : "bg-gold-light"}`}
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className={`flex items-center space-x-1 p-2 rounded-lg transition-colors
              ${
                theme === "dark"
                  ? "hover:bg-gold text-gold hover:text-navy"
                  : "hover:bg-navy text-navy hover:text-gold"
              }`}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-colors flex items-center space-x-1
                ${
                  theme === "dark"
                    ? "hover:bg-gold text-gold hover:text-navy"
                    : "hover:bg-navy text-navy hover:text-gold"
                }`}
            >
              {copied ? (
                <Check size={18} className="text-gold" />
              ) : (
                <Copy size={18} />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-navy hover:bg-gold text-white rounded-lg transition-colors flex items-center space-x-1"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <span
              className={`text-lg font-bold ${
                intensityColors[
                  result.intensity as keyof typeof intensityColors
                ] || "text-gray-500"
              }`}
            >
              {result.intensity.charAt(0).toUpperCase() +
                result.intensity.slice(1)}{" "}
              Roast
            </span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-navy font-medium">
              {profileLabels[result.profile]}
            </span>
            <span className="mx-2 text-gray-500">•</span>
            <span className={theme === "dark" ? "text-gold" : "text-navy"}>
              {new Date(result.timestamp).toLocaleString()}
            </span>
          </div>

          {/* Code Section */}
          <div
            className={`p-6 rounded-lg transition-colors duration-300 mb-6
            ${theme === "dark" ? "bg-[#001a33]" : "bg-[#fff8e1]"}`}
          >
            <pre className="whitespace-pre-wrap font-mono text-sm text-navy">
              <code>{result.code}</code>
            </pre>
          </div>

          {/* Response Section */}
          <div
            className={`p-6 rounded-lg transition-all duration-300 
            border-l-4 animate-fade-in
            ${theme === "dark" ? "bg-[#001122]" : "bg-[#fff4d6]"}
            ${
              result.intensity === "mild"
                ? "border-gold"
                : result.intensity === "medium"
                ? "border-navy"
                : result.intensity === "savage"
                ? "border-[#e85c3a]"
                : "border-[#ff4d4d]"
            }`}
          >
            <p className="whitespace-pre-line text-lg text-navy">
              {result.response}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
