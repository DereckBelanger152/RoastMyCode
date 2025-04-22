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
  mild: "text-cambridge",
  medium: "text-flame",
  spicy: "text-chestnut",
  brutal: "text-red-500",
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
      ${theme === "dark" ? "bg-jet" : "bg-cambridge"}`}
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className={`flex items-center space-x-1 p-2 rounded-lg transition-colors
              ${
                theme === "dark"
                  ? "hover:bg-hunter text-cambridge hover:text-white"
                  : "hover:bg-chestnut text-jet hover:text-hunter"
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
                    ? "hover:bg-hunter text-cambridge hover:text-white"
                    : "hover:bg-chestnut text-jet hover:text-hunter"
                }`}
            >
              {copied ? (
                <Check size={18} className="text-cambridge" />
              ) : (
                <Copy size={18} />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-flame hover:bg-chestnut text-white rounded-lg transition-colors flex items-center space-x-1"
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
            <span className="text-flame font-medium">
              {profileLabels[result.profile]}
            </span>
            <span className="mx-2 text-gray-500">•</span>
            <span className={theme === "dark" ? "text-cambridge" : "text-jet"}>
              {new Date(result.timestamp).toLocaleString()}
            </span>
          </div>

          {/* Code Section */}
          <div
            className={`p-6 rounded-lg transition-colors duration-300 mb-6
            ${theme === "dark" ? "bg-[#2e2f2e]" : "bg-[#e6f2ed]"}`}
          >
            <pre className="whitespace-pre-wrap font-mono text-sm text-hunter">
              <code>{result.code}</code>
            </pre>
          </div>

          {/* Response Section */}
          <div
            className={`p-6 rounded-lg transition-all duration-300 
            border-l-4 animate-fade-in
            ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#f0f9f5]"}
            ${
              result.intensity === "mild"
                ? "border-cambridge"
                : result.intensity === "medium"
                ? "border-flame"
                : result.intensity === "savage"
                ? "border-chestnut"
                : "border-red-500"
            }`}
          >
            <p className="whitespace-pre-line text-lg text-hunter">
              {result.response}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
