import React from 'react';
import { GraduationCap, Angry, MessageSquare, HardHat } from 'lucide-react';
import { useRoast, AIProfile } from '../contexts/RoastContext';
import { useTheme } from '../contexts/ThemeContext';

const profileOptions: { value: AIProfile; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: 'meanTeacher',
    label: 'Mean Teacher',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'Grades your code like it\'s a failing assignment'
  },
  {
    value: 'angrySenior',
    label: 'Angry Senior Dev',
    icon: <Angry className="w-5 h-5" />,
    description: 'Reviews your PR like it\'s Monday morning'
  },
  {
    value: 'sarcasticMentor',
    label: 'Sarcastic Mentor',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Roasts with wit and questionable wisdom'
  },
  {
    value: 'disappointedArchitect',
    label: 'Disappointed Architect',
    icon: <HardHat className="w-5 h-5" />,
    description: 'Judges your architectural decisions'
  }
];

const ProfileSelector: React.FC = () => {
  const { profile, setProfile } = useRoast();
  const { theme } = useTheme();

  const handleProfileSelect = (value: AIProfile) => {
    setProfile(value);
    const button = document.querySelector(`button[data-profile="${value}"]`);
    button?.classList.add('animate-wiggle');
    setTimeout(() => button?.classList.remove('animate-wiggle'), 500);
  };

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
              ${profile === option.value 
                ? `ring-2 ring-offset-2 ring-purple-500 transform scale-105` 
                : ''
              }
              ${theme === 'dark'
                ? profile === option.value 
                  ? 'bg-gray-700' 
                  : 'bg-gray-800 hover:bg-gray-700'
                : profile === option.value 
                  ? 'bg-gray-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            <div className="p-4 relative z-10">
              <div className="flex items-center mb-2">
                <span className={`text-purple-500 mr-3 transition-transform duration-300 group-hover:rotate-12`}>
                  {option.icon}
                </span>
                <div className="font-bold">{option.label}</div>
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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