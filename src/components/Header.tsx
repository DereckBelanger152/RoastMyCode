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
          ? "bg-navy text-gold border-b border-gold"
          : "bg-gold-light text-navy border-b border-navy"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            <span className="text-gold">Roast</span>
            <span className="text-gold">My</span>
            <span className="text-gold">Code</span>
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            theme === "dark"
              ? "bg-gold hover:bg-[#2e1065]"
              : "bg-navy hover:bg-gold-light"
          }`}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-[#001a33]" />
          ) : (
            <Moon size={20} className="text-gold" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
