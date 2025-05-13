import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useRoast } from "../contexts/RoastContext";
import { History, X } from "lucide-react";

interface SidebarProps {
  onClose: () => void;
}

const profileLabels = {
  meanTeacher: "Professeur sévère",
  angrySenior: "Développeur senior en colère",
  sarcasticMentor: "Mentor sarcastique",
  disappointedArchitect: "Architecte déçu",
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const {
    roastHistory,
    setCurrentCode,
    setLanguage,
    setIntensity,
    setProfile,
  } = useRoast();

  const handleReuseCode = (index: number) => {
    const roast = roastHistory[index];
    setCurrentCode(roast.code);
    setLanguage(roast.language);
    setIntensity(roast.intensity);
    setProfile(roast.profile);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClose();
  };

  const intensityColors: Record<
    "Constructif" | "Taquin" | "SansPitié",
    string
  > = {
    Constructif: "text-gold", // Gold for mild intensity
    Taquin: "text-navy", // Navy for medium intensity
    SansPitié: "text-[#e85c3a]", // Slightly brighter chestnut for spicy
  };

  return (
    <div
      className={`h-full flex flex-col shadow-xl transition-colors duration-300
      ${theme === "dark" ? "bg-navy" : "bg-gold-light"}`}
    >
      <div
        className={`p-4 flex items-center justify-between border-b
        ${theme === "dark" ? "border-gold" : "border-navy"}`}
      >
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-gold" />
          <h2 className="text-lg font-bold text-gold">Roast History</h2>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors
            ${theme === "dark" ? "hover:bg-gold" : "hover:bg-navy"}`}
        >
          <X
            size={20}
            className={`${theme === "dark" ? "text-gold" : "text-navy"}`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {roastHistory.length === 0 ? (
          <div
            className={`p-4 text-center ${
              theme === "dark" ? "text-gold" : "text-navy"
            }`}
          >
            No roasts yet. Start by submitting some code!
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {roastHistory.map((roast, index) => (
              <div
                key={roast.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                  hover:transform hover:scale-[1.02]
                  ${
                    theme === "dark"
                      ? "bg-gold hover:bg-navy"
                      : "bg-navy hover:bg-gold-light"
                  }`}
                onClick={() => handleReuseCode(index)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        intensityColors[
                          roast.intensity as keyof typeof intensityColors
                        ]
                      }`}
                    >
                      {roast.intensity.charAt(0).toUpperCase() +
                        roast.intensity.slice(1)}
                    </span>
                    <span className="text-sm text-gold font-medium">
                      {profileLabels[roast.profile]}
                    </span>
                  </div>

                  <div className="line-clamp-2 text-sm font-mono text-gold">
                    {roast.code.trim().slice(0, 100)}
                    {roast.code.length > 100 && "..."}
                  </div>

                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gold" : "text-navy"
                    }`}
                  >
                    {new Date(roast.timestamp).toLocaleString()}
                  </div>

                  <div
                    className={`text-sm italic ${
                      theme === "dark" ? "text-gold" : "text-navy"
                    }`}
                  >
                    "{roast.response.slice(0, 60)}
                    {roast.response.length > 60 && "..."}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
