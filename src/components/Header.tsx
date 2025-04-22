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
          ? "bg-gray-900 text-white border-b border-gray-800"
          : "bg-white text-gray-900 border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-600">Roast</span>
            <span className="text-gray-500">My</span>
            <span className="text-purple-600">Code</span>
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
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
