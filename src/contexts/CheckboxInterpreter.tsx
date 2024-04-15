// CheckboxContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckboxContextType {
  totalCheckboxes: number;
  addCheckbox: () => void;
  removeCheckbox: () => void;
}



const CheckboxContextInterpreter = createContext<CheckboxContextType>({
  totalCheckboxes: 0,
  addCheckbox: () => {},
  removeCheckbox: () => {}
});

export const CheckboxInterpreter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalCheckboxes, setTotalCheckboxes] = useState(0);
  const addCheckbox = () => setTotalCheckboxes(prev => prev + 1);
  const removeCheckbox = () => setTotalCheckboxes(prev => prev - 1);

  return (
    <CheckboxContextInterpreter.Provider value={{ totalCheckboxes, addCheckbox, removeCheckbox }}>
      {children}
    </CheckboxContextInterpreter.Provider>
  );
};

export const useCheckboxes = () => useContext(CheckboxContextInterpreter);
