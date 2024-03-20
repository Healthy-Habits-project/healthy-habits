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

import './SleepPage.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import DateTimeDisplay from '../components/GetDateTime';
import { isNewDay } from '../utils/checkNewDay';

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

const mentalHealthPage: React.FC = () => {
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

  useEffect(() => {
    console.log('Checking for a new day...');
    if (isNewDay('mentalHealthPage')) {
      console.log('New day, resetting checkboxes');
      setMentalHealthHabits(initialState);
      localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(initialState));
    }
    console.log('Not a new day, no need to reset checkboxes');
  }, []);

  const { setMentalHealthCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(mentalHealth);
    setMentalHealthCheckedCount(newCheckedCount);
    localStorage.setItem('mentalHealthPageCheckboxes', JSON.stringify(mentalHealth)); // Optionally, persist the mentalHealth state in localStorage
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
        <DateTimeDisplay/>
      </IonContent>
    </IonPage>
  );
};

export default mentalHealthPage;
