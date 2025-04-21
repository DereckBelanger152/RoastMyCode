import React from 'react';
import { useRoast } from '../contexts/RoastContext';
import { useTheme } from '../contexts/ThemeContext';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'ruby', label: 'Ruby' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useRoast();
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <label htmlFor="language-select" className="block font-medium">
        Language:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`w-full p-3 rounded-lg transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-purple-500
          ${theme === 'dark' 
            ? 'bg-gray-800 text-white border border-gray-700' 
            : 'bg-white text-gray-800 border border-gray-300'
          }`}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;