import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchRoast } from "../utils/openai";

export type IntensityLevel = "mild" | "medium" | "savage";
export type AIProfile =
  | "meanTeacher"
  | "angrySenior"
  | "sarcasticMentor"
  | "disappointedArchitect";

interface RoastResult {
  id: string;
  code: string;
  language: string;
  intensity: IntensityLevel;
  profile: AIProfile;
  response: string;
  timestamp: number;
}

interface RoastContextType {
  isLoading: boolean;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  intensity: IntensityLevel;
  setIntensity: (level: IntensityLevel) => void;
  profile: AIProfile;
  setProfile: (profile: AIProfile) => void;
  currentRoast: RoastResult | null;
  roastHistory: RoastResult[];
  submitRoast: () => Promise<void>;
  clearCurrentRoast: () => void;
}

const RoastContext = createContext<RoastContextType | undefined>(undefined);

export const RoastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [intensity, setIntensity] = useState<IntensityLevel>("medium");
  const [profile, setProfile] = useState<AIProfile>("sarcasticMentor");
  const [currentRoast, setCurrentRoast] = useState<RoastResult | null>(null);
  const [roastHistory, setRoastHistory] = useState<RoastResult[]>(() => {
    const saved = localStorage.getItem("roastHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("roastHistory", JSON.stringify(roastHistory));
  }, [roastHistory]);

  const submitRoast = async () => {
    if (!currentCode.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetchRoast({
        code: currentCode,
        language,
        intensity,
        profile,
      });

      const newRoast: RoastResult = {
        id: Date.now().toString(),
        code: currentCode,
        language,
        intensity,
        profile,
        response,
        timestamp: Date.now(),
      };

      setCurrentRoast(newRoast);
      setRoastHistory((prev) => [newRoast, ...prev]);
    } catch (error) {
      console.error("Error roasting code:", error);
      setCurrentRoast({
        id: Date.now().toString(),
        code: currentCode,
        language,
        intensity,
        profile,
        response:
          "Oups! Impossible de générer le roast. Je pense que tu as planté mon app avec ton code.....",
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentRoast = () => {
    setCurrentRoast(null);
    setCurrentCode("");
  };

  return (
    <RoastContext.Provider
      value={{
        isLoading,
        currentCode,
        setCurrentCode,
        language,
        setLanguage,
        intensity,
        setIntensity,
        profile,
        setProfile,
        currentRoast,
        roastHistory,
        submitRoast,
        clearCurrentRoast,
      }}
    >
      {children}
    </RoastContext.Provider>
  );
};

export const useRoast = (): RoastContextType => {
  const context = useContext(RoastContext);
  if (context === undefined) {
    throw new Error("useRoast must be used within a RoastProvider");
  }
  return context;
};
