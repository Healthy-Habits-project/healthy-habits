import React, { useState, useEffect } from 'react';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab3.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook
import '../theme/variables.css';

const Tab3: React.FC = () => {
  const [name, setName] = useState('');
  const { userName, setUserName } = useUser();
  const [saveClicked, setSaveClicked] = useState(false);
  const [theme, setTheme] = useState(''); // New state variable for theme

  // Load the username from localStorage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedTheme = localStorage.getItem('theme'); // Load the theme
    if (storedUserName) {
      setName(storedUserName); // Set the loaded name to the state
      setUserName(storedUserName); // Update the context (if needed)
    }

    if (storedTheme) {
      setTheme(storedTheme); // Set the loaded theme to the state
      handleThemeChange(storedTheme); // Apply the loaded theme
    }
  }, [setUserName]);

  useEffect(() => {
    if (saveClicked) {
      // Save the username to localStorage
      localStorage.setItem('userName', name);

      // Introduce a delay of 100 milliseconds (adjust as needed)
      const delayDuration = 100;
      const timeoutId = setTimeout(() => {
        setUserName(name);
        setSaveClicked(false);
      }, delayDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [saveClicked, name, setUserName]);

  const handleSave = () => {
    console.log('LOG: Saving app data, set name to:', name);
    setSaveClicked(true);
    localStorage.setItem('theme', theme); // Save the theme to localStorage
  };

  const handleThemeChange = (selectedTheme: string) => {
    document.body.classList.remove('ion-color-light', 'ion-color-dark');
    document.body.classList.add(selectedTheme);
    setTheme(selectedTheme); // Update the theme state variable
  };

  const handleResetData = () => {
    console.log('LOG: Handling reset app data');
    localStorage.clear(); // This will also remove the userName, consider using localStorage.removeItem('userName') if you want to keep other stored data
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              placeholder="Enter Name"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Theme</IonLabel>
            <IonSelect
              value={theme}
              onIonChange={(e: CustomEvent) => handleThemeChange(e.detail.value as string)}
              interface="popover"
            >
              <IonSelectOption value="ion-color-light">Light</IonSelectOption>
              <IonSelectOption value="ion-color-dark">Dark</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonGrid>
            <IonRow>
              <IonButton onClick={handleSave}>Save</IonButton>
              <IonButton id="present-alert">Reset</IonButton>
              <IonAlert
                trigger="present-alert"
                header="Reset Data"
                message="Are you sure you want to reset the app data? This removes all saved data and settings. This action cannot be undone!"
                buttons={[
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    },
                  },
                  {
                    text: 'Confirm',
                    handler: () => {
                      handleResetData();
                    },
                  },
                ]}
              ></IonAlert>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
