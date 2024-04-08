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
import { isNewDay } from '../utils/checkNewDay';

interface SleepPageState {
  consistentBedtime: boolean;
  restfulSleep: boolean;
  avoidScreensBeforeBed: boolean;
  darkRoom: boolean;
  comfortableMattress: boolean;
  quietEnvironment: boolean;
  consistentWakeUpTime: boolean;
  limitCaffeineIntake: boolean;
  bedtimeRoutine: boolean;
  coolSleepEnvironment: boolean;
  bedEarly: boolean;
}

interface CheckboxState {
  consistentBedtime: false,
  restfulSleep: false,
  avoidScreensBeforeBed: false,
  darkRoom: false,
  comfortableMattress: false,
  quietEnvironment: false,
  consistentWakeUpTime: false,
  limitCaffeineIntake: false,
  bedtimeRoutine: false,
  bedEarly: false,
  coolSleepEnvironment: false
}

const SleepPage: React.FC = () => {
  const initialState: CheckboxState = {
    consistentBedtime: false,
    bedEarly: false,
    restfulSleep: false,
    avoidScreensBeforeBed: false,
    darkRoom: false,
    comfortableMattress: false,
    quietEnvironment: false,
    consistentWakeUpTime: false,
    limitCaffeineIntake: false,
    bedtimeRoutine: false,
    coolSleepEnvironment: false
  };
  const [sleepHabits, setSleepHabits] = useState<SleepPageState>(() => {
    const storedState = localStorage.getItem('sleepPageCheckboxes');
    return storedState? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    console.log('Checking for a new day...');
    if (isNewDay('sleepPage')) {
      console.log('New day, resetting sleep checkboxes');
      setSleepHabits(initialState);
      localStorage.setItem('sleepPageCheckboxes', JSON.stringify(initialState));
    }
  }, []);

  const { setSleepCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(sleepHabits);
    setSleepCheckedCount(newCheckedCount);
    localStorage.setItem('sleepPageCheckboxes', JSON.stringify(sleepHabits)); // Optionally, persist the sleepHabits state in localStorage
  }, [sleepHabits, setSleepCheckedCount]);

  const checkedCount = calculateCheckedCount(sleepHabits);
  const totalCheckboxes = Object.keys(sleepHabits).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton/></IonButtons>
          <IonTitle>Sleep</IonTitle>
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
            <h2>Keep track of your sleep activities here</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.consistentBedtime}
              onIonChange={() => handleCheckboxChange('consistentBedtime', sleepHabits, setSleepHabits)}
              aria-label="Consistent Bedtime"
            />
            <IonLabel onClick={() => handleCheckboxChange('consistentBedtime', sleepHabits, setSleepHabits)}>
              Do you have a consistent bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.bedEarly}
              onIonChange={() => handleCheckboxChange('bedEarly', sleepHabits, setSleepHabits)}
              aria-label="Bed Early"
            />
            <IonLabel onClick={() => handleCheckboxChange('bedEarly', sleepHabits, setSleepHabits)}>
              Did you go to bed early?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.restfulSleep}
              onIonChange={() => handleCheckboxChange('restfulSleep', sleepHabits, setSleepHabits)}
              aria-label="Restful Sleep"
            />
            <IonLabel onClick={() => handleCheckboxChange('restfulSleep', sleepHabits, setSleepHabits)}>
              Did you experience restful sleep?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.avoidScreensBeforeBed}
              onIonChange={() => handleCheckboxChange('avoidScreensBeforeBed', sleepHabits, setSleepHabits)}
              aria-label="Avoid Screens Before Bed"
            />
            <IonLabel onClick={() => handleCheckboxChange('avoidScreensBeforeBed', sleepHabits, setSleepHabits)}>
              Did you avoid screens before bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.darkRoom}
              onIonChange={() => handleCheckboxChange('darkRoom', sleepHabits, setSleepHabits)}
              aria-label="Darkness for Sleep"
            />
            <IonLabel onClick={() => handleCheckboxChange('darkRoom', sleepHabits, setSleepHabits)}>
              Was your room dark for sleep?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.comfortableMattress}
              onIonChange={() => handleCheckboxChange('comfortableMattress', sleepHabits, setSleepHabits)}
              aria-label="Comfortable Mattress"
            />
            <IonLabel onClick={() => handleCheckboxChange('comfortableMattress', sleepHabits, setSleepHabits)}>
              Did you sleep on a comfortable mattress?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.quietEnvironment}
              onIonChange={() => handleCheckboxChange('quietEnvironment', sleepHabits, setSleepHabits)}
              aria-label="Comfortable Mattress"
            />
            <IonLabel onClick={() => handleCheckboxChange('quietEnvironment', sleepHabits, setSleepHabits)}>
              Was your sleep environment quiet?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.consistentWakeUpTime}
              onIonChange={() => handleCheckboxChange('consistentWakeUpTime', sleepHabits, setSleepHabits)}
              aria-label="Consistent Wake Up"
            />
            <IonLabel onClick={() => handleCheckboxChange('consistentWakeUpTime', sleepHabits, setSleepHabits)}>
              Did you wake up on time?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.limitCaffeineIntake}
              onIonChange={() => handleCheckboxChange('limitCaffeineIntake', sleepHabits, setSleepHabits)}
              aria-label="Limit Caffeine"
            />
            <IonLabel onClick={() => handleCheckboxChange('limitCaffeineIntake', sleepHabits, setSleepHabits)}>
              Did you limit caffeine intake?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.bedtimeRoutine}
              onIonChange={() => handleCheckboxChange('bedtimeRoutine', sleepHabits, setSleepHabits)}
              aria-label="Bedtime Routine"
            />
            <IonLabel onClick={() => handleCheckboxChange('bedtimeRoutine', sleepHabits, setSleepHabits)}>
              Did you have a routine before bedtime?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={sleepHabits.coolSleepEnvironment}
              onIonChange={() => handleCheckboxChange('coolSleepEnvironment', sleepHabits, setSleepHabits)}
              aria-label="Cool Sleep Environment"
            />
            <IonLabel onClick={() => handleCheckboxChange('coolSleepEnvironment', sleepHabits, setSleepHabits)}>
              Did you sleep in a cool environment?
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SleepPage;
