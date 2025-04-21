import React, { createContext, useContext, useState, useEffect } from 'react';

export type IntensityLevel = 'mild' | 'medium' | 'spicy' | 'brutal';
export type AIProfile = 'meanTeacher' | 'angrySenior' | 'sarcasticMentor' | 'disappointedArchitect';

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

export const RoastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [intensity, setIntensity] = useState<IntensityLevel>('medium');
  const [profile, setProfile] = useState<AIProfile>('sarcasticMentor');
  const [currentRoast, setCurrentRoast] = useState<RoastResult | null>(null);
  const [roastHistory, setRoastHistory] = useState<RoastResult[]>(() => {
    const saved = localStorage.getItem('roastHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('roastHistory', JSON.stringify(roastHistory));
  }, [roastHistory]);

  const mockRoastResponses = {
    meanTeacher: {
      mild: "Did you even read the textbook? This code is like a D+ homework submission.",
      medium: "I've seen better code from students who just learned what a variable is.",
      spicy: "This is exactly why I started drinking coffee during grading sessions.",
      brutal: "I'm putting this code on the wall of shame as an example of what NOT to do."
    },
    angrySenior: {
      mild: "Who let the intern push to main? This needs a complete rewrite.",
      medium: "I've seen legacy COBOL code more maintainable than this mess.",
      spicy: "Did you write this code during a production outage? Because it's causing me physical pain.",
      brutal: "I'm calling an emergency team meeting to discuss this code atrocity."
    },
    sarcasticMentor: {
      mild: "Oh, how... creative. Have you considered a career in abstract art instead?",
      medium: "Your code is taking the scenic route to efficiency. Maybe consider a shortcut?",
      spicy: "This code is so nested, birds could build condos in it. Ever heard of refactoring?",
      brutal: "Did you write this code or did you just slam your head on the keyboard?"
    },
    disappointedArchitect: {
      mild: "This violates at least three SOLID principles... I thought we discussed this.",
      medium: "Your code's architecture resembles a house of cards in a wind tunnel.",
      spicy: "I need to update our coding guidelines specifically because of this code.",
      brutal: "I'm scheduling a 4-hour architecture review meeting because of this code."
    }
  };

  const submitRoast = async () => {
    if (!currentCode.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to OpenAI
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRoast: RoastResult = {
        id: Date.now().toString(),
        code: currentCode,
        language,
        intensity,
        profile,
        response: mockRoastResponses[profile][intensity],
        timestamp: Date.now()
      };
      
      setCurrentRoast(newRoast);
      setRoastHistory(prev => [newRoast, ...prev]);
    } catch (error) {
      console.error("Error roasting code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentRoast = () => {
    setCurrentRoast(null);
    setCurrentCode('');
  };

  return (
    <RoastContext.Provider value={{
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
      clearCurrentRoast
    }}>
      {children}
    </RoastContext.Provider>
  );
};

export const useRoast = (): RoastContextType => {
  const context = useContext(RoastContext);
  if (context === undefined) {
    throw new Error('useRoast must be used within a RoastProvider');
  }
  return context;
};