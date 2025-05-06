import React, { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useRoast } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const profileLabels = {
  meanTeacher: "Mean Teacher",
  angrySenior: "Angry Senior Dev",
  sarcasticMentor: "Sarcastic Mentor",
  disappointedArchitect: "Disappointed Architect",
};

const RoastHistory: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    roastHistory,
    setCurrentCode,
    setLanguage,
    setIntensity,
    setProfile,
  } = useRoast();
  const { theme } = useTheme();

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const displayedHistory = isExpanded ? roastHistory : roastHistory.slice(0, 3);

  const handleReuseCode = (index: number) => {
    const roast = roastHistory[index];
    setCurrentCode(roast.code);
    setLanguage(roast.language);
    setIntensity(roast.intensity);
    setProfile(roast.profile);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const intensityColors = {
    mild: "text-gold",
    medium: "text-navy",
    spicy: "text-[#e85c3a]",
    brutal: "text-[#ff4d4d]",
  };

  return (
    <section
      className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300
      ${theme === "dark" ? "bg-navy" : "bg-gold-light"}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center text-gold">
            <Clock className="mr-2 text-gold" size={20} />
            History
          </h3>
          {roastHistory.length > 3 && (
            <button
              onClick={toggleExpand}
              className={`flex items-center space-x-1 p-2 rounded-lg transition-colors
                ${
                  theme === "dark"
                    ? "hover:bg-gold text-gold hover:text-navy"
                    : "hover:bg-navy text-navy hover:text-gold"
                }`}
            >
              <span>{isExpanded ? "Show Less" : "Show All"}</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {displayedHistory.map((roast, index) => (
            <div
              key={roast.id}
              className={`p-4 rounded-lg transition-colors
                ${
                  theme === "dark"
                    ? "bg-gold hover:bg-navy"
                    : "bg-navy hover:bg-gold-light"
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span
                    className={`font-medium ${
                      intensityColors[
                        roast.intensity as keyof typeof intensityColors
                      ] || "text-gray-500"
                    }`}
                  >
                    {roast.intensity.charAt(0).toUpperCase() +
                      roast.intensity.slice(1)}{" "}
                    Roast
                  </span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gold font-medium">
                    {profileLabels[roast.profile]}
                  </span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gold" : "text-navy"
                    }`}
                  >
                    {new Date(roast.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleReuseCode(index)}
                  className="text-sm text-gold hover:text-[#e85c3a] transition-colors"
                >
                  Re-use Code
                </button>
              </div>

              <div className="line-clamp-2 text-sm font-mono mb-2 overflow-hidden text-gold">
                {roast.code.trim().slice(0, 100)}
                {roast.code.length > 100 && "..."}
              </div>

              <p className="text-sm italic text-navy">
                "{roast.response.slice(0, 60)}
                {roast.response.length > 60 && "..."}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoastHistory;
