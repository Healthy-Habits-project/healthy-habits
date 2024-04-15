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
import './Physical.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { isNewDay } from '../utils/checkNewDay';

//Default boxes set as booleans checked/unchecked
interface PhysicalPageState {
  resistance: boolean;
  cardio: boolean;
  balance: boolean;
  rom: boolean;
  steps: boolean;
  sunlight: boolean;
  standing: boolean;
}

//Default checkboxes initial state
//Unchecked by default
interface CheckboxState {
  resistance: false,
  cardio: false,
  balance: false,
  rom: false,
  steps: false,
  sunlight: false,
  standing: false
}
const Physical: React.FC = () => {
  const initialState: CheckboxState = {
    resistance: false,
    cardio: false,
    balance: false,
    rom: false,
    steps: false,
    sunlight: false,
    standing: false
  };
  const [physicalHabits, setPhysicalHabits] = useState<PhysicalPageState>(() => {
    const storedState = localStorage.getItem('physicalPageCheckboxes');
    return storedState ? JSON.parse(storedState) : initialState;
  });

  //Checking if new day, and if it is a new day resetting checkboxes
  useEffect(() => {
    console.log('Physical.tsx: Checking for a new day...');
    if (isNewDay('Physical')) {
      console.log('Physical.tsx: New day, resetting checkboxes');
      setPhysicalHabits(initialState);
      localStorage.setItem('physicalPageCheckboxes', JSON.stringify(initialState));
    } else {
      console.log('Physical.tsx: Not a new day, no need to reset checkboxes');
    }
  }, []);

  //Setting global counts here
  const { setPhysicalHealthCheckedCount } = useGlobalCounts();

  //Keep things in local storage
  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(physicalHabits);
    setPhysicalHealthCheckedCount(newCheckedCount);
    localStorage.setItem('physicalPageCheckboxes', JSON.stringify(physicalHabits)); // Persist the physicalHabits state in localStorage
  }, [physicalHabits, setPhysicalHealthCheckedCount]);

  const checkedCount = calculateCheckedCount(physicalHabits);
  const totalCheckboxes = Object.keys(physicalHabits).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot='start'><IonBackButton /></IonButtons>
          <IonTitle>Physical</IonTitle>
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
            <h2>Keep track of your physical activities here</h2>
          </IonLabel>
        </IonItem>
        <IonList>

        <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.standing}
              onIonChange={() => handleCheckboxChange('standing', physicalHabits, setPhysicalHabits)}
              aria-label="Standing Habits"
            />
            <IonLabel onClick={() => handleCheckboxChange('standing', physicalHabits, setPhysicalHabits)}>
              Did you try to get up and stand up for awhile today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.resistance}
              onIonChange={() => handleCheckboxChange('resistance', physicalHabits, setPhysicalHabits)}
              aria-label="Resistance Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('resistance', physicalHabits, setPhysicalHabits)}>
              Did you meet your resistance training goal today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.cardio}
              onIonChange={() => handleCheckboxChange('cardio', physicalHabits, setPhysicalHabits)}
              aria-label="Cardiovascular Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('cardio', physicalHabits, setPhysicalHabits)}>
              Did you meet your cardiovascular training goal today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.balance}
              onIonChange={() => handleCheckboxChange('balance', physicalHabits, setPhysicalHabits)}
              aria-label="Balance Training"
            />
            <IonLabel onClick={() => handleCheckboxChange('balance', physicalHabits, setPhysicalHabits)}>
              Did you meet your balance training goal today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.rom}
              onIonChange={() => handleCheckboxChange('rom', physicalHabits, setPhysicalHabits)}
              aria-label="Range of Motion"
            />
            <IonLabel onClick={() => handleCheckboxChange('rom', physicalHabits, setPhysicalHabits)}>
              Did you stretch at all today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.steps}
              onIonChange={() => handleCheckboxChange('steps', physicalHabits, setPhysicalHabits)}
              aria-label="Steps"
            />
            <IonLabel onClick={() => handleCheckboxChange('steps', physicalHabits, setPhysicalHabits)}>
              Did you walk at least 10,000 steps today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={physicalHabits.sunlight}
              onIonChange={() => handleCheckboxChange('sunlight', physicalHabits, setPhysicalHabits)}
              aria-label="Sunlight"
            />
            <IonLabel onClick={() => handleCheckboxChange('sunlight', physicalHabits, setPhysicalHabits)}>
              Did you get at least 30 minutes of sunlight today?
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Physical;
