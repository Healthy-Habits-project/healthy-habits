import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlobalCountsContextType {
  physicalHealthCheckedCount: number;
  setPhysicalHealthCheckedCount: (count: number) => void;
  mentalHealthCheckedCount: number;
  setMentalHealthCheckedCount: (count: number) => void;
  nutritionCheckedCount: number;
  setNutritionCheckedCount: (count: number) => void;
  sleepCheckedCount: number;
  setSleepCheckedCount: (count: number) => void;
  resetCounts: () => void; // Add a reset function to the context
}

// Assuming the initial values are fetched from localStorage or set to 0 if not present
const defaultValues: GlobalCountsContextType = {
  physicalHealthCheckedCount: 0, // Placeholder, replace with actual logic to fetch from localStorage
  setPhysicalHealthCheckedCount: () => {},
  mentalHealthCheckedCount: 0, // Placeholder
  setMentalHealthCheckedCount: () => {},
  nutritionCheckedCount: 0, // Placeholder
  setNutritionCheckedCount: () => {},
  sleepCheckedCount: 0, // Placeholder
  setSleepCheckedCount: () => {},
  resetCounts: () => {} // Placeholder function
};

export const GlobalCountsContext = createContext<GlobalCountsContextType>(defaultValues);

export const useGlobalCounts = () => useContext(GlobalCountsContext);

export const GlobalCountsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [physicalHealthCheckedCount, setPhysicalHealthCheckedCount] = useState(defaultValues.physicalHealthCheckedCount);
  const [mentalHealthCheckedCount, setMentalHealthCheckedCount] = useState(defaultValues.mentalHealthCheckedCount);
  const [nutritionCheckedCount, setNutritionCheckedCount] = useState(defaultValues.nutritionCheckedCount);
  const [sleepCheckedCount, setSleepCheckedCount] = useState(defaultValues.sleepCheckedCount);
  
  // Function to reset counts
  const resetCounts = () => {
    setPhysicalHealthCheckedCount(0);
    setMentalHealthCheckedCount(0);
    setNutritionCheckedCount(0);
    setSleepCheckedCount(0);
    // Update localStorage with the new counts and reset date
    localStorage.setItem('physicalHealthCheckedCount', '0');
    localStorage.setItem('mentalHealthCheckedCount', '0');
    localStorage.setItem('nutritionCheckedCount', '0');
    localStorage.setItem('sleepCheckedCount', '0');
    localStorage.setItem('lastResetDate', new Date().toDateString());
  };

  useEffect(() => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();
    if (!lastResetDate || lastResetDate !== today) {
      resetCounts();
    }
  }, []);

  return (
    <GlobalCountsContext.Provider value={{
      physicalHealthCheckedCount,
      setPhysicalHealthCheckedCount,
      mentalHealthCheckedCount,
      setMentalHealthCheckedCount,
      nutritionCheckedCount,
      setNutritionCheckedCount,
      sleepCheckedCount,
      setSleepCheckedCount,
      resetCounts
    }}>
      {children}
    </GlobalCountsContext.Provider>
  );
};