import React from "react";
import { useRoast } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const CodeInput: React.FC = () => {
  const { currentCode, setCurrentCode } = useRoast();
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <label htmlFor="code-input" className="block font-medium">
        Collez votre "code" ici:
      </label>
      <textarea
        id="code-input"
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        placeholder="// Paste your code here to get it roasted..."
        className={`w-full h-60 p-4 rounded-lg font-mono text-sm resize-none transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-purple-500
          ${
            theme === "dark"
              ? "bg-gray-900 text-gray-200 border border-gray-700"
              : "bg-gray-50 text-gray-800 border border-gray-300"
          }`}
      />
    </div>
  );
};

export default CodeInput;
