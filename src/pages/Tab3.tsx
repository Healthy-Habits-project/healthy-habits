// Tab3.tsx
import React, { useState } from 'react';
import { IonButton, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { ThemeProvider, useTheme } from './themeProvider';

type Theme = 'light' | 'dark' | 'system';

const Tab3: React.FC = () => {
  const [name, setName] = useState('');
  const { theme, setTheme } = useTheme(); // Destructure the context object

  const handleSave = () => {
    console.log('LOG: Saving app data, set name to:', name);
    // Save settings here
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  const resetAppData = () => {
    // Implement reset logic here, such as clearing local storage or resetting global state
    console.log('LOG: Handling reset app data');
  };

  const exportAppData = () => {
    // Implement export logic here, such as exporting data to a file
    console.log('LOG: Handling export app data');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Enter Name" value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSelect value={theme} placeholder="Select One" onIonChange={(e: CustomEvent) => handleThemeChange(e.detail.value as Theme)}>
              <IonSelectOption value="light">Light</IonSelectOption>
              <IonSelectOption value="dark">Dark</IonSelectOption>
              <IonSelectOption value="system">System</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton onClick={handleSave}>Save</IonButton>
              <IonButton onClick={exportAppData}>Export Data</IonButton>
              <IonButton onClick={resetAppData}>Reset Data</IonButton>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
