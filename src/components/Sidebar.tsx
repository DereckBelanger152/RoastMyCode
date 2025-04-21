import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useRoast } from '../contexts/RoastContext';
import { History, X } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const profileLabels = {
  meanTeacher: 'Mean Teacher',
  angrySenior: 'Angry Senior Dev',
  sarcasticMentor: 'Sarcastic Mentor',
  disappointedArchitect: 'Disappointed Architect'
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const { roastHistory, setCurrentCode, setLanguage, setIntensity, setProfile } = useRoast();

  const handleReuseCode = (index: number) => {
    const roast = roastHistory[index];
    setCurrentCode(roast.code);
    setLanguage(roast.language);
    setIntensity(roast.intensity);
    setProfile(roast.profile);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

  const intensityColors = {
    mild: 'text-blue-500',
    medium: 'text-yellow-500',
    spicy: 'text-orange-500',
    brutal: 'text-red-500'
  };

  return (
    <div className={`h-full flex flex-col shadow-xl transition-colors duration-300
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 flex items-center justify-between border-b
        ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-purple-500" />
          <h2 className="text-lg font-bold">Roast History</h2>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors
            ${theme === 'dark' 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-gray-100'}`}
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {roastHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No roasts yet. Start by submitting some code!
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {roastHistory.map((roast, index) => (
              <div
                key={roast.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                  hover:transform hover:scale-[1.02]
                  ${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => handleReuseCode(index)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${intensityColors[roast.intensity]}`}>
                      {roast.intensity.charAt(0).toUpperCase() + roast.intensity.slice(1)}
                    </span>
                    <span className="text-sm text-purple-500">
                      {profileLabels[roast.profile]}
                    </span>
                  </div>
                  
                  <div className="line-clamp-2 text-sm font-mono">
                    {roast.code.trim().slice(0, 100)}
                    {roast.code.length > 100 && '...'}
                  </div>
                  
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(roast.timestamp).toLocaleString()}
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