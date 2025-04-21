import React from 'react';
import { GraduationCap, Angry, MessageSquare, HardHat } from 'lucide-react';
import { useRoast, AIProfile } from '../contexts/RoastContext';
import { useTheme } from '../contexts/ThemeContext';

const profiles = [
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

const ProfileDropdown: React.FC = () => {
  const { profile, setProfile } = useRoast();
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <label htmlFor="profile-select" className="block font-medium">
        Choose Your Roaster:
      </label>
      <div className="relative">
        <select
          id="profile-select"
          value={profile}
          onChange={(e) => setProfile(e.target.value as AIProfile)}
          className={`w-full p-3 pl-10 rounded-lg transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
            ${theme === 'dark' 
              ? 'bg-gray-800 text-white border border-gray-700' 
              : 'bg-white text-gray-800 border border-gray-300'
            }`}
        >
          {profiles.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label} - {p.description}
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-500">
          {profiles.find(p => p.value === profile)?.icon}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;