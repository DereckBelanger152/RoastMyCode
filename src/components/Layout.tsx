import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 
      ${theme === "dark" ? "bg-navy text-gold" : "bg-gold-light text-navy"}`}
    >
      <Header />
      <div className="flex-grow flex">
        <main
          className={`flex-1 container mx-auto px-4 py-8 md:py-12 transition-all duration-300 rounded-lg shadow-lg
          ${
            theme === "dark"
              ? "bg-[#001a33]" // Slightly darker navy for dark mode
              : "bg-[#fef6d8]" // Slightly darker gold-light for light mode
          }`}
        >
          {children}
        </main>

        <div className="relative">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`fixed top-24 right-4 p-2 rounded-lg shadow-lg transition-all duration-300 z-30
              ${
                theme === "dark"
                  ? "bg-gold hover:bg-navy text-white"
                  : "bg-navy hover:bg-gold text-white"
              }`}
            aria-label={isSidebarOpen ? "Close history" : "Open history"}
          >
            {isSidebarOpen ? (
              <PanelRightClose size={20} />
            ) : (
              <PanelRightOpen size={20} />
            )}
          </button>

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-80 transition-transform duration-300 ease-in-out z-20
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            ${
              theme === "dark"
                ? "bg-navy border-l border-gold"
                : "bg-gold-light border-l border-navy"
            }`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
