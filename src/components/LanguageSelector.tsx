import React, { useState } from "react";
import { useRoast } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useRoast();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === "dark";
  const selectedLanguage =
    languages.find((lang) => lang.value === language)?.label ||
    "Select language";

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-2">
        <Globe className="w-5 h-5 text-purple-500" />
        <span className="font-medium text-lg">Choose Language:</span>
      </div>

      <div className="relative">
        {/* Custom dropdown button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full p-3 px-4 rounded-lg
            flex items-center justify-between
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
            ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700 hover:border-purple-500"
                : "bg-white text-gray-800 border border-gray-300 hover:border-purple-400"
            }
          `}
        >
          <span>{selectedLanguage}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            } ${isDark ? "text-gray-400" : "text-gray-600"}`}
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className={`
              absolute z-10 w-full mt-1 rounded-lg shadow-lg
              max-h-60 overflow-auto
              ${
                isDark
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }
            `}
          >
            {languages.map((lang) => (
              <div
                key={lang.value}
                onClick={() => {
                  setLanguage(lang.value);
                  setIsOpen(false);
                }}
                className={`
                  p-3 cursor-pointer
                  transition-colors duration-150
                  ${
                    language === lang.value
                      ? "bg-purple-500 bg-opacity-20 text-purple-500"
                      : ""
                  }
                  ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                `}
              >
                {lang.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <p
        className={`text-sm italic mt-1 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Select the programming language of your code for a tailored roast.
      </p>
    </div>
  );
};

export default LanguageSelector;
