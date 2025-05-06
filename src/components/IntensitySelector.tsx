import React from "react";
import { Thermometer, Flame, Zap } from "lucide-react";
import { useRoast, IntensityLevel } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const intensityOptions: {
  value: IntensityLevel;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "mild",
    label: "Constructif",
    icon: <Thermometer className="w-5 h-5" />,
    color: "text-gold",
  },
  {
    value: "medium",
    label: "Taquin",
    icon: <Flame className="w-5 h-5" />,
    color: "text-navy",
  },
  {
    value: "savage",
    label: "Sans pitié",
    icon: <Zap className="w-5 h-5" />,
    color: "text-[#e85c3a]",
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
      <label className="block font-medium text-navy">Intensité:</label>
      <div className="grid grid-cols-3 gap-4">
        {intensityOptions.map((option) => (
          <button
            key={option.value}
            data-intensity={option.value}
            onClick={() => handleIntensitySelect(option.value)}
            className={`group flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300
              ${
                intensity === option.value
                  ? `ring-2 ring-offset-2 ring-${option.color.split("-")[1]}`
                  : ""
              }
              ${
                theme === "dark"
                  ? intensity === option.value
                    ? "bg-navy"
                    : "bg-gold hover:bg-navy"
                  : intensity === option.value
                  ? "bg-gold-light"
                  : "bg-navy hover:bg-gold-light"
              }`}
          >
            <span
              className={`${option.color} transition-transform duration-300 group-hover:scale-110`}
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
