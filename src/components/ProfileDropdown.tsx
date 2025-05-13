import React, { useState } from "react";
import {
  GraduationCap,
  Angry,
  MessageSquare,
  HardHat,
  ChevronDown,
} from "lucide-react";
import { useRoast, AIProfile } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const profileOptions: {
  value: AIProfile;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: "meanTeacher",
    label: "Enseignant sévère",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Notes ton code comme un examen",
  },
  {
    value: "angrySenior",
    label: "Développeur senior en colère",
    icon: <Angry className="w-5 h-5" />,
    description: "Review ton code avec frustration",
  },
  {
    value: "sarcasticMentor",
    label: "Mentor sarcastique",
    icon: <MessageSquare className="w-5 h-5" />,
    description: "Roast ton code avec un savoir inquiétant",
  },
  {
    value: "disappointedArchitect",
    label: "Architecte déçu",
    icon: <HardHat className="w-5 h-5" />,
    description: "Critique ton code avec déception",
  },
];

const ProfileSelector: React.FC = () => {
  const { profile, setProfile } = useRoast();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === "dark";
  const selectedProfile = profileOptions.find((p) => p.value === profile);

  const handleProfileSelect = (value: AIProfile) => {
    setProfile(value);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <label
        className={`block font-medium text-lg mb-2 ${
          isDark ? "text-gold" : "text-navy"
        }`}
      >
        Choisis un profil:
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full p-3 px-4 rounded-lg
            flex items-center justify-between
            ${
              isDark
                ? "bg-navy text-gold border border-gold"
                : "bg-gold-light text-navy border border-navy "
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <span
              id={`profile-icon-${selectedProfile?.value}`}
              className={isDark ? "text-gold" : "text-navy"}
            >
              {selectedProfile?.icon}
            </span>
            <span>{selectedProfile?.label}</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            } ${isDark ? "text-gold" : "text-navy"}`}
          />
        </button>

        {isOpen && (
          <div
            className={`
              absolute z-10 w-full mt-1 rounded-lg shadow-lg
              max-h-60 overflow-auto
              ${
                isDark
                  ? "bg-navy border border-gold"
                  : "bg-gold-light border border-navy"
              }
            `}
          >
            {profileOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleProfileSelect(option.value)}
                className={`
                  p-4 cursor-pointer
                  transition-colors duration-150
                  ${
                    profile === option.value
                      ? "bg-gold bg-opacity-20 text-gold"
                      : ""
                  }
                `}
              >
                <div className="flex items-center mb-1">
                  <span
                    className={`mr-3 ${isDark ? "text-gold" : "text-navy"}`}
                  >
                    {option.icon}
                  </span>
                  <span className="font-medium">{option.label}</span>
                </div>
                <div
                  className={`text-sm ${isDark ? "text-gold" : "text-navy"}`}
                >
                  {option.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSelector;
