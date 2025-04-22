import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 
      ${
        theme === "dark"
          ? "bg-jet text-cambridge border-b border-hunter"
          : "bg-cambridge text-jet border-b border-chestnut"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            <span className="text-flame">Roast</span>
            <span className="text-hunter">My</span>
            <span className="text-flame">Code</span>
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            theme === "dark"
              ? "bg-hunter hover:bg-flame"
              : "bg-chestnut hover:bg-flame"
          }`}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
