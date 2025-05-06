import React from "react";
import { useRoast } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const CodeInput: React.FC = () => {
  const { currentCode, setCurrentCode } = useRoast();
  const { theme } = useTheme();

  return (
    <div className="space-y-2">
      <textarea
        id="code-input"
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        placeholder="// Collez votre 'code' ici"
        className={`w-full h-60 p-4 rounded-lg font-mono text-sm resize-none transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-gold
          ${
            theme === "dark"
              ? "bg-navy text-gold border border-gold"
              : "bg-gold-light text-navy border border-navy"
          }`}
      />
    </div>
  );
};

export default CodeInput;
