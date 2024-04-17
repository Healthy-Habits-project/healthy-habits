import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckboxContextType {
  counts: { [key: string]: number };
  updateCount: (page: string, count: number) => void;
}

const CheckboxContext = createContext<CheckboxContextType>({
  counts: {},
  updateCount: () => {}
});

interface CheckboxProviderProps {
  children: ReactNode;  // This ensures that 'children' is recognized as a prop
}

export const CheckboxInterpreterProvider: React.FC<CheckboxProviderProps> = ({ children }) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const updateCount = (page: string, count: number) => {
    setCounts(prev => ({ ...prev, [page]: count }));
  };

  return (
    <CheckboxContext.Provider value={{ counts, updateCount }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => useContext(CheckboxContext);
