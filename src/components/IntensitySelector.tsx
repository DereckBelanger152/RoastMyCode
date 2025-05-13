import React from "react";
import { Thermometer, Flame, Zap } from "lucide-react";
import { useRoast, IntensityLevel } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const intensityOptions: {
  value: IntensityLevel;
  label: string;
  icon: React.ReactNode;
  gradient: string;
}[] = [
  {
    value: "Constructif",
    label: "Constructif",
    icon: <Thermometer className="w-5 h-5" />,
    gradient: "from-[#e0f7fa] to-[#b2ebf2]", // Light blue gradient
  },
  {
    value: "Taquin",
    label: "Taquin",
    icon: <Flame className="w-5 h-5" />,
    gradient: "from-[#ffe082] to-[#ffca28]", // Yellow-orange gradient
  },
  {
    value: "Brutal",
    label: "Brutal",
    icon: <Zap className="w-5 h-5" />,
    gradient: "from-[#ff8a80] to-[#ff5252]", // Intense red gradient
  },
];

const IntensitySelector: React.FC = () => {
  const { intensity, setIntensity } = useRoast();
  const { theme } = useTheme();

  const handleIntensitySelect = (value: IntensityLevel) => {
    setIntensity(value);
    const button = document.querySelector(`button[data-intensity="${value}"]`);
    button?.classList.add("animate-bounce-scale");
    setTimeout(() => button?.classList.remove("animate-bounce-scale"), 600);
  };

  return (
    <div className="space-y-2">
      <label
        className={`block font-medium ${
          theme === "dark" ? "text-gold" : "text-navy"
        }`}
      >
        Intensité:
      </label>
      <div className="grid grid-cols-3 gap-4">
        {intensityOptions.map((option) => (
          <button
            key={option.value}
            data-intensity={option.value}
            onClick={() => handleIntensitySelect(option.value)}
            className={`group flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300
              ${
                intensity === option.value
                  ? "ring-2 ring-offset-2 ring-gold"
                  : "border border-gray-300"
              }
              ${
                theme === "dark"
                  ? intensity === option.value
                    ? `bg-gradient-to-r ${option.gradient} text-gold`
                    : `bg-gradient-to-r ${option.gradient} hover:opacity-90 text-gold`
                  : intensity === option.value
                  ? `bg-gradient-to-r ${option.gradient} text-navy`
                  : `bg-gradient-to-r ${option.gradient} hover:opacity-90 text-navy`
              }`}
          >
            <span
              className={`transition-transform duration-300 group-hover:scale-110 ${
                theme === "dark" ? "text-gold" : "text-navy"
              }`}
            >
              {option.icon}
            </span>
            <span className="mt-1 text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntensitySelector;
