import React, { useState } from 'react';
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
import { useEffect } from 'react';
import '../theme/variables.css'

const Tab3: React.FC = () => {
  const [name, setName] = useState('');
  const { userName, setUserName } = useUser();
  const [saveClicked, setSaveClicked] = useState(false);

  useEffect(() => {
    if (saveClicked) {
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
  };

  const handleThemeChange = (selectedTheme: string) => {
    document.body.classList.remove('ion-color-light', 'ion-color-dark');
    document.body.classList.add(selectedTheme);
  };

  const handleResetData = () => {
    console.log('LOG: Handling reset app data');
    localStorage.clear();
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
              placeholder="Default"
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