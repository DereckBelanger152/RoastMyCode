import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useRoast } from "../contexts/RoastContext";
import { History, X } from "lucide-react";

interface SidebarProps {
  onClose: () => void;
}

const profileLabels = {
  meanTeacher: "Mean Teacher",
  angrySenior: "Angry Senior Dev",
  sarcasticMentor: "Sarcastic Mentor",
  disappointedArchitect: "Disappointed Architect",
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
    "mild" | "medium" | "spicy" | "brutal",
    string
  > = {
    mild: "text-[#a3f7b5]", // Brighter green for mild intensity
    medium: "text-[#ff914d]", // Brighter orange for medium intensity
    spicy: "text-[#e85c3a]", // Slightly brighter chestnut for spicy
    brutal: "text-[#ff4d4d]", // Bright red for brutal
  };

  return (
    <div
      className={`h-full flex flex-col shadow-xl transition-colors duration-300
      ${theme === "dark" ? "bg-jet" : "bg-cambridge"}`}
    >
      <div
        className={`p-4 flex items-center justify-between border-b
        ${theme === "dark" ? "border-hunter" : "border-chestnut"}`}
      >
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-[#ff914d]" />{" "}
          {/* Brighter orange */}
          <h2 className="text-lg font-bold text-hunter">Roast History</h2>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors
            ${theme === "dark" ? "hover:bg-hunter" : "hover:bg-flame"}`}
        >
          <X
            size={20}
            className={`${theme === "dark" ? "text-cambridge" : "text-jet"}`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {roastHistory.length === 0 ? (
          <div
            className={`p-4 text-center ${
              theme === "dark" ? "text-cambridge" : "text-jet"
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
                      ? "bg-[#356b48] hover:bg-[#3e5641]"
                      : "bg-jet hover:bg-cambridge"
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
                    <span className="text-sm text-[#ff914d] font-medium">
                      {profileLabels[roast.profile]}
                    </span>
                  </div>

                  <div className="line-clamp-2 text-sm font-mono text-hunter">
                    {roast.code.trim().slice(0, 100)}
                    {roast.code.length > 100 && "..."}
                  </div>

                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-cambridge" : "text-jet"
                    }`}
                  >
                    {new Date(roast.timestamp).toLocaleString()}
                  </div>

                  <div
                    className={`text-sm italic ${
                      theme === "dark" ? "text-cambridge" : "text-jet"
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
