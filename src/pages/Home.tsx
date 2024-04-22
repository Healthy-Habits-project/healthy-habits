import React, { useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { getColorBasedOnCount } from './functions';

import './Home.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { useUser } from '../contexts/UserContext';
import { useCheckboxContext } from '../contexts/CheckboxInterpreter';

const Home: React.FC = () => {
  const { mentalHealthCheckedCount, setMentalHealthCheckedCount, physicalHealthCheckedCount, setPhysicalHealthCheckedCount, nutritionCheckedCount, setNutritionCheckedCount, sleepCheckedCount, setSleepCheckedCount } = useGlobalCounts();
  const { userName, setUserName } = useUser();
  const { counts } = useCheckboxContext();

  // Function to set card color based on count
  const setCardColor = (cardId: string, color: string) => {
    console.log('DEBUG: setCardColor() - START');
    const card = document.getElementById(cardId);
    if (card) {
      card.style.backgroundColor = color;
    }
    console.log('DEBUG: setCardColor() - cardId:', cardId);
    console.log('DEBUG: setCardColor() - color:', color);
    console.log('DEBUG: setCardColor() - END');
  };

  // useEffect for retrieving the counts from local storage when the component mounts
useEffect(() => {
  const storedPhysicalCount = localStorage.getItem('physicalHealthCheckedCount');
  if (storedPhysicalCount) {
    setPhysicalHealthCheckedCount(Number(storedPhysicalCount));
  }

  const storedMentalCount = localStorage.getItem('mentalHealthCheckedCount');
  if (storedMentalCount) {
    setMentalHealthCheckedCount(Number(storedMentalCount));
  }

  const storedNutritionCount = localStorage.getItem('nutritionCheckedCount');
  if (storedNutritionCount) {
    setNutritionCheckedCount(Number(storedNutritionCount));
  }

  const storedSleepCount = localStorage.getItem('sleepCheckedCount');
  if (storedSleepCount) {
    setSleepCheckedCount(Number(storedSleepCount));
  }
}, []); // Empty dependency array means this useEffect will only run once when the component mounts

// useEffect for updating the card colors and storing the counts in local storage whenever the counts change
useEffect(() => {
  const totalPhysicalCheckboxes = 7;
  const totalMentalCheckboxes = 8;
  const totalNutritionCheckboxes = 4;
  const totalSleepCheckboxes = 11;

  const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
  const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
  const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
  const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

  setCardColor("mentalCard", mentalColor);
  setCardColor("physicalCard", physicalColor);
  setCardColor("nutritionCard", nutritionColor);
  setCardColor("sleepCard", sleepColor);

  localStorage.setItem('physicalHealthCheckedCount', physicalHealthCheckedCount.toString());
  localStorage.setItem('mentalHealthCheckedCount', mentalHealthCheckedCount.toString());
  localStorage.setItem('nutritionCheckedCount', nutritionCheckedCount.toString());
  localStorage.setItem('sleepCheckedCount', sleepCheckedCount.toString());
}, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);

  // useEffect for retrieving the username from localStorage when the component mounts
  useEffect(() => {
    // Retrieve the username from localStorage when the component mounts
    console.log('DEBUG: useEffect 3 - START');
    const storedUserName = localStorage.getItem('userName');
    console.log("DEBUG: useEffect 3 - storedUserName:", storedUserName);
    if (storedUserName) {
      setUserName(storedUserName); // Update the userName in your context
    }
    console.log('DEBUG: useEffect 3 - END');
  }, [setUserName]);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle className="ion-text-center">{`Hello ${userName}`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonHeader class="mediumHeader">Healthy Habit Tracker</IonHeader>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/mental">
                <IonCard id="mentalCard">
                  <img alt="MentalHealth" src="./mental.png" />
                  <IonCardHeader style={{ backgroundColor: "#ebc2ff" }}>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/physical">
                <IonCard id="physicalCard">
                  <img alt="PhysicalHealth" src="./physical.png" />
                  <IonCardHeader style={{ backgroundColor: "#a873e8" }}>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/nutrition">
                <IonCard id="nutritionCard">
                  <img alt="Nutrition" src="./nutrition.png" />
                  <IonCardHeader style={{ backgroundColor: "#56d1dc" }}>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/sleep">
                <IonCard id="sleepCard">
                  <img alt="SleepHabits" src="./sleep.png" />
                  <IonCardHeader style={{ backgroundColor: "#5d7bd5" }}>
                    <IonCardTitle>Sleep</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
