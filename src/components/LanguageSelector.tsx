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
        <Globe className="w-5 h-5 text-gold" />
        <span className="font-medium text-lg text-navy">
          Choisis le language de programmation que tu as saboté:
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full p-3 px-4 rounded-lg
            flex items-center justify-between
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-flame
            ${
              isDark
                ? "bg-navy text-gold border border-gold hover:border-navy"
                : "bg-gold-light text-navy border border-navy hover:border-gold"
            }
          `}
        >
          <span>{selectedLanguage}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            } ${isDark ? "text-cambridge" : "text-jet"}`}
          />
        </button>

        {isOpen && (
          <div
            className={`
              absolute z-10 w-full mt-1 rounded-lg shadow-lg
              max-h-60 overflow-auto
              ${
                isDark
                  ? "bg-jet border border-hunter"
                  : "bg-cambridge border border-chestnut"
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
                      ? "bg-flame bg-opacity-20 text-flame"
                      : ""
                  }
                  ${isDark ? "hover:bg-gold" : "hover:bg-navy"}
                `}
              >
                {lang.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
