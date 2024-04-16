import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { calculateCheckedCount, getColorBasedOnCount, handleCheckboxChange } from './functions';

import './Mental.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { isNewDay } from '../utils/checkNewDay';

//Default boxes set as booleans checked/unchecked
interface mentalHealthPageState {
  mindfulness: boolean;
  family: boolean;
  manageStress: boolean;
  limitScreen: boolean;
  hobby: boolean;
  feelings: boolean;
  balance: boolean;
  kindness: boolean;
}

//Default checkboxes initial state
//Unchecked by default
interface CheckboxState {
  mindfulness: false,
  family: false,
  manageStress: false,
  limitScreen: false,
  hobby: false,
  feelings: false,
  balance: false,
  kindness: false,
}

const Mental: React.FC = () => {
  const initialState: CheckboxState = {
    mindfulness: false,
    family: false,
    manageStress: false,
    limitScreen: false,
    hobby: false,
    feelings: false,
    balance: false,
    kindness: false,
  };
  const [ mentalHealth, setMentalHealthHabits] = useState<CheckboxState>(() => {
    const storedState = localStorage.getItem('mentalHealthPageCheckboxes');
    return storedState ? JSON.parse(storedState) : initialState;
  });

  //Checking if new day, and if it is a new day resetting checkboxes
  useEffect(() => {
    console.log('Mental.tsx: Checking for a new day...');
    if (isNewDay('Mental')) {
      console.log('Mental.tsx: New day, resetting checkboxes');
      setMentalHealthHabits(initialState);
      localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(initialState));
    } else {
      console.log('Mental.tsx: Not a new day, no need to reset checkboxes');
    }
  }, []);

  //Setting global counts here
  const { setMentalHealthCheckedCount } = useGlobalCounts();

  //Keep things in local storage
  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(mentalHealth);
    setMentalHealthCheckedCount(newCheckedCount);
    localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(mentalHealth)); // Persist the mentalHealth state in localStorage
  }, [mentalHealth, setMentalHealthCheckedCount]);

  const checkedCount = calculateCheckedCount(mentalHealth);
  const totalCheckboxes = Object.keys(mentalHealth).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton/></IonButtons>
          <IonTitle>Mental</IonTitle>
          <IonProgressBar
            className={`progress-bar-custom color-${color}`}
            style={{
              '--dynamic-progress-color': color,
              height: '0.5rem'
            }}
            value={checkedCount / totalCheckboxes}
          ></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className="ion-padding">
      <IonItem>
          <IonLabel>
            <h2>Keep track of your mental health here</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.mindfulness}
              onIonChange={() => handleCheckboxChange('mindfulness', mentalHealth, setMentalHealthHabits)}
              aria-label="mindfulness"
            />
            <IonLabel onClick={() => handleCheckboxChange('mindfulness', mentalHealth, setMentalHealthHabits)}>
              Did you practice mindfulness or meditation for at least 5 minutes today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.family}
              onIonChange={() => handleCheckboxChange('family', mentalHealth, setMentalHealthHabits)}
              aria-label="family"
            />
            <IonLabel onClick={() => handleCheckboxChange('family', mentalHealth, setMentalHealthHabits)}>
              Did you connect with a friend or family member for emotional support today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.manageStress}
              onIonChange={() => handleCheckboxChange('manageStress', mentalHealth, setMentalHealthHabits)}
              aria-label="Managing stress"
            />
            <IonLabel onClick={() => handleCheckboxChange('manageStress', mentalHealth, setMentalHealthHabits)}>
              Have you taken breaks to manage stress at work or during your daily routine?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.limitScreen}
              onIonChange={() => handleCheckboxChange('limitScreen', mentalHealth, setMentalHealthHabits)}
              aria-label="Limiting screens"
            />
            <IonLabel onClick={() => handleCheckboxChange('limitScreen', mentalHealth, setMentalHealthHabits)}>
              Have you limited your screen time on electronic devices to promote a healthy mental state?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.hobby}
              onIonChange={() => handleCheckboxChange('hobby', mentalHealth, setMentalHealthHabits)}
              aria-label="Having a hobby"
            />
            <IonLabel onClick={() => handleCheckboxChange('hobby', mentalHealth, setMentalHealthHabits)}>
              Did you set aside time for a hobby or activity you enjoy for relaxation today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.feelings}
              onIonChange={() => handleCheckboxChange('feelings', mentalHealth, setMentalHealthHabits)}
              aria-label="Communicating feelings"
            />
            <IonLabel onClick={() => handleCheckboxChange('feelings', mentalHealth, setMentalHealthHabits)}>
              Have you addressed and communicated your feelings with someone if you were experiencing distress?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.balance}
              onIonChange={() => handleCheckboxChange('balance', mentalHealth, setMentalHealthHabits)}
              aria-label="Having a balance"
            />
            <IonLabel onClick={() => handleCheckboxChange('balance', mentalHealth, setMentalHealthHabits)}>
              Have you set boundaries to ensure a healthy balance between work or responsibilities and personal time for relaxation?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={mentalHealth.kindness}
              onIonChange={() => handleCheckboxChange('kindness', mentalHealth, setMentalHealthHabits)}
              aria-label="Being kind"
            />
            <IonLabel onClick={() => handleCheckboxChange('kindness', mentalHealth, setMentalHealthHabits)}>
              Have you practiced at least one act of kindness towards yourself or others today?
            </IonLabel>
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Mental;