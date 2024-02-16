// themeSwitcher.tsx
import React from 'react';
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { useTheme } from './themeProvider';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme(); // Destructure the context object

  const handleThemeChange = (event: CustomEvent) => {
    const selectedTheme = event.detail.value;
    setTheme(selectedTheme);
  };

  return (
    <IonSelect value={theme} onIonChange={handleThemeChange}>
      <IonSelectOption value="system">System</IonSelectOption>
      <IonSelectOption value="light">Light</IonSelectOption>
      <IonSelectOption value="dark">Dark</IonSelectOption>
    </IonSelect>
  );
};

export default ThemeSwitcher;
