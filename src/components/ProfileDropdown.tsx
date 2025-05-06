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
    label: "Mean Teacher",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Grades your code like it's a failing assignment",
  },
  {
    value: "angrySenior",
    label: "Angry Senior Dev",
    icon: <Angry className="w-5 h-5" />,
    description: "Reviews your PR like it's Monday morning",
  },
  {
    value: "sarcasticMentor",
    label: "Sarcastic Mentor",
    icon: <MessageSquare className="w-5 h-5" />,
    description: "Roasts with wit and questionable wisdom",
  },
  {
    value: "disappointedArchitect",
    label: "Disappointed Architect",
    icon: <HardHat className="w-5 h-5" />,
    description: "Judges your architectural decisions",
  },
];

type ProfileSelectorProps = {
  mode: "buttons" | "dropdown"; // Allow switching between buttons and dropdown
};

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ mode }) => {
  const { profile, setProfile } = useRoast();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === "dark";
  const selectedProfile = profileOptions.find((p) => p.value === profile);

  const handleProfileSelect = (value: AIProfile) => {
    setProfile(value);
    setIsOpen(false);
  };

  if (mode === "dropdown") {
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
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-gold
              ${
                isDark
                  ? "bg-navy text-gold border border-gold hover:border-navy"
                  : "bg-gold-light text-navy border border-navy hover:border-gold"
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
                    ${
                      isDark
                        ? "hover:bg-gold hover:text-navy"
                        : "hover:bg-navy hover:text-gold"
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
                    className={`text-sm ${
                      isDark
                        ? "text-gold group-hover:text-[#001a33]"
                        : "text-gold group-hover:text-navy"
                    }`}
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
  }

  return null; // For simplicity, only handling dropdown mode here
};

export default ProfileSelector;
