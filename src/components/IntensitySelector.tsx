import React from 'react';
import { Thermometer, Flame, Zap, Bomb } from 'lucide-react';
import { useRoast, IntensityLevel } from '../contexts/RoastContext';
import { useTheme } from '../contexts/ThemeContext';

const intensityOptions: { value: IntensityLevel; label: string; icon: React.ReactNode; color: string }[] = [
  { 
    value: 'mild', 
    label: 'Mild', 
    icon: <Thermometer className="w-5 h-5" />, 
    color: 'text-blue-500' 
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    icon: <Flame className="w-5 h-5" />, 
    color: 'text-yellow-500' 
  },
  { 
    value: 'spicy', 
    label: 'Spicy', 
    icon: <Zap className="w-5 h-5" />, 
    color: 'text-orange-500' 
  },
  { 
    value: 'brutal', 
    label: 'Brutal', 
    icon: <Bomb className="w-5 h-5" />, 
    color: 'text-red-500' 
  }
];

const IntensitySelector: React.FC = () => {
  const { intensity, setIntensity } = useRoast();
  const { theme } = useTheme();

  const handleIntensitySelect = (value: IntensityLevel) => {
    setIntensity(value);
    const button = document.querySelector(`button[data-intensity="${value}"]`);
    button?.classList.add('animate-bounce-scale');
    setTimeout(() => button?.classList.remove('animate-bounce-scale'), 600);
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium">Roast intensity:</label>
      <div className="grid grid-cols-4 gap-2">
        {intensityOptions.map((option) => (
          <button
            key={option.value}
            data-intensity={option.value}
            onClick={() => handleIntensitySelect(option.value)}
            className={`group flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300
              hover-scale relative overflow-hidden
              ${intensity === option.value 
                ? `ring-2 ring-offset-2 ring-${option.color.split('-')[1]}-500` 
                : ''
              }
              ${theme === 'dark'
                ? intensity === option.value 
                  ? 'bg-gray-700' 
                  : 'bg-gray-800 hover:bg-gray-700'
                : intensity === option.value 
                  ? 'bg-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            <span className={`${option.color} transition-transform duration-300 group-hover:scale-110`}>
              {option.icon}
            </span>
            <span className="mt-1 text-sm font-medium">{option.label}</span>
            {intensity === option.value && (
              <div className={`absolute inset-0 ${option.color.replace('text', 'bg')} opacity-5`}></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntensitySelector;