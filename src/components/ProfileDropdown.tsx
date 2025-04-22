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

    if (mode === "buttons") {
      const button = document.querySelector(`button[data-profile="${value}"]`);
      button?.classList.add("animate-wiggle");
      setTimeout(() => button?.classList.remove("animate-wiggle"), 500);
    } else {
      // Animation for dropdown mode
      const animateElement = document.querySelector(`#profile-icon-${value}`);
      animateElement?.classList.add("animate-wiggle");
      setTimeout(() => animateElement?.classList.remove("animate-wiggle"), 500);
    }
  };

  if (mode === "dropdown") {
    return (
      <div className="mb-6">
        <label className="block font-medium text-lg mb-2">
          Choose Your Roaster:
        </label>

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
            <div className="flex items-center space-x-3">
              <span
                id={`profile-icon-${selectedProfile?.value}`}
                className="text-purple-500"
              >
                {selectedProfile?.icon}
              </span>
              <span>{selectedProfile?.label}</span>
            </div>
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
                ${
                  isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
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
                        ? "bg-purple-500 bg-opacity-20"
                        : ""
                    }
                    ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                  `}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-purple-500 mr-3">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
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

  return (
    <div className="space-y-2">
      <label className="block font-medium">Choose Your Roaster:</label>
      <div className="grid grid-cols-2 gap-3">
        {profileOptions.map((option) => (
          <button
            key={option.value}
            data-profile={option.value}
            onClick={() => handleProfileSelect(option.value)}
            className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover-scale
              ${
                profile === option.value
                  ? `ring-2 ring-offset-2 ring-purple-500 transform scale-105`
                  : ""
              }
              ${
                theme === "dark"
                  ? profile === option.value
                    ? "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                  : profile === option.value
                  ? "bg-gray-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <div className="p-4 relative z-10">
              <div className="flex items-center mb-2">
                <span
                  className={`text-purple-500 mr-3 transition-transform duration-300 group-hover:rotate-12`}
                >
                  {option.icon}
                </span>
                <div className="font-bold">{option.label}</div>
              </div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {option.description}
              </div>
            </div>
            {profile === option.value && (
              <div className="absolute inset-0 bg-purple-500 opacity-5"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelector;
