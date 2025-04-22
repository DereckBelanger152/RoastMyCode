import React from "react";
import CodeInput from "../components/CodeInput";
import IntensitySelector from "../components/IntensitySelector";
import LanguageSelector from "../components/LanguageSelector";
import ProfileDropdown from "../components/ProfileDropdown";
import RoastResult from "../components/RoastResult";
import { useRoast } from "../contexts/RoastContext";
import { useTheme } from "../contexts/ThemeContext";

const HomePage: React.FC = () => {
  const { currentRoast, isLoading, submitRoast, clearCurrentRoast } =
    useRoast();
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <section className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center justify-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold ml-3 text-hunter">
            Roast My Code
          </h2>
        </div>
        <p
          className={`text-lg md:text-xl ${
            theme === "dark" ? "text-cambridge" : "text-jet"
          }`}
        >
          Tu pense que ton code est parfait ? Laisse RoastMyCode le juger et on
          verra!
        </p>
      </section>

      {!currentRoast ? (
        <div
          className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 
          transform hover:shadow-xl
          ${theme === "dark" ? "bg-jet" : "bg-cambridge"}`}
        >
          <div className="p-6 md:p-8">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="flex-1">
                  <LanguageSelector />
                </div>
                <div className="flex-1">
                  <ProfileDropdown mode="dropdown" />
                </div>
              </div>
              <IntensitySelector />
              <CodeInput />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={submitRoast}
                disabled={isLoading}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                  transform hover:scale-105 hover:rotate-1
                  bg-gradient-to-r from-flame to-chestnut
                  text-white hover:from-chestnut hover:to-hunter
                  disabled:from-jet disabled:to-hunter
                  focus:outline-none focus:ring-2 focus:ring-flame focus:ring-opacity-50
                  ${isLoading ? "animate-pulse" : ""}`}
              >
                {isLoading ? "Roasting..." : "Roast My Code 🔥"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <RoastResult result={currentRoast} onBack={clearCurrentRoast} />
      )}
    </div>
  );
};

export default HomePage;
