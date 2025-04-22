import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-6 transition-colors duration-300 
      ${
        theme === "dark"
          ? "bg-gray-900 text-gray-400 border-t border-gray-800"
          : "bg-white text-gray-600 border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {new Date().getFullYear()} Dereck Bélanger - Tous Droits
              Réservés.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/DereckBelanger152"
              className="hover:text-purple-600 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/dereck-bélanger-437259338/"
              className="hover:text-purple-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
