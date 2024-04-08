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

const Home: React.FC = () => {
  const { mentalHealthCheckedCount, setMentalHealthCheckedCount, physicalHealthCheckedCount, setPhysicalHealthCheckedCount, nutritionCheckedCount, setNutritionCheckedCount, sleepCheckedCount, setSleepCheckedCount } = useGlobalCounts();
  const { userName, setUserName } = useUser();

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

  // useEffect 1
  useEffect(() => {
    // Retrieve the counts from local storage and update the state
    console.log('DEBUG: useEffect 1 - START');
    const storedPhysicalCount = localStorage.getItem('physicalHealthCheckedCount');
    console.log("DEBUG: useEffect 1 - storedPhysicalCount:", storedPhysicalCount);
    if (storedPhysicalCount) {
      console.log("DEBUG: useEffect 1 - setPhysicalHealthCheckedCount:", Number(storedPhysicalCount));
      setPhysicalHealthCheckedCount(Number(storedPhysicalCount));
    }

    const storedMentalCount = localStorage.getItem('mentalHealthCheckedCount');
    console.log("DEBUG: useEffect 1 - storedMentalCount:", storedMentalCount);
    if (storedMentalCount) {
      console.log("DEBUG: useEffect 1 - setMentalHealthCheckedCount:", Number(storedMentalCount));
      setMentalHealthCheckedCount(Number(storedMentalCount));
    }

    const storedNutritionCount = localStorage.getItem('nutritionCheckedCount');
    console.log("DEBUG: useEffect 1 - storedNutritionCount:", storedNutritionCount);
    if (storedNutritionCount) {
      console.log("DEBUG: useEffect 1 - setNutritionCheckedCount:", Number(storedNutritionCount));
      setNutritionCheckedCount(Number(storedNutritionCount));
    }

    const storedSleepCount = localStorage.getItem('sleepCheckedCount');
    console.log("DEBUG: useEffect 1 - storedSleepCount:", storedSleepCount);
    if (storedSleepCount) {
      console.log("DEBUG: useEffect 1 - setSleepCheckedCount:", Number(storedSleepCount));
      setSleepCheckedCount(Number(storedSleepCount));
    }
    console.log('DEBUG: useEffect 1 - END');
  }, [setPhysicalHealthCheckedCount, setMentalHealthCheckedCount, setNutritionCheckedCount, setSleepCheckedCount]);

  // useEffect 2
  useEffect(() => {
    // Update the card colors based on the retrieved counts
    console.log('DEBUG: useEffect 2 - START');
    const totalPhysicalCheckboxes = 6;
    const totalMentalCheckboxes = 8;
    const totalNutritionCheckboxes = 4;
    const totalSleepCheckboxes = 10;

    const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
    const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
    const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
    const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

    console.log('DEBUG: useEffect 2 - physicalColor:', physicalColor);
    console.log('DEBUG: useEffect 2 - mentalColor:', mentalColor);
    console.log('DEBUG: useEffect 2 - nutritionColor:', nutritionColor);
    console.log('DEBUG: useEffect 2 - sleepColor:', sleepColor);

    setCardColor("mentalCard", mentalColor);
    setCardColor("physicalCard", physicalColor);
    setCardColor("nutritionCard", nutritionColor);
    setCardColor("sleepCard", sleepColor);

    // Store the counts in local storage
    localStorage.setItem('physicalHealthCheckedCount', physicalHealthCheckedCount.toString());
    localStorage.setItem('mentalHealthCheckedCount', mentalHealthCheckedCount.toString());
    localStorage.setItem('nutritionCheckedCount', nutritionCheckedCount.toString());
    localStorage.setItem('sleepCheckedCount', sleepCheckedCount.toString());

    console.log('DEBUG: useEffect 2 - END');
  }, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);

  // useEffect 3
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
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#ebc2ff" }}>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/physical">
                <IonCard id="physicalCard">
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader style={{ backgroundColor: "#a873e8" }}>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/nutrition">
                <IonCard id="nutritionCard">
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#56d1dc" }}>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/home/sleep">
                <IonCard id="sleepCard">
                  <img alt="SleepHabits" src="/SleepCard.png" />
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
