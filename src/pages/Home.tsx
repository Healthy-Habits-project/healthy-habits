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
    console.log('DEBUG: setCardColor function called!');
    const card = document.getElementById(cardId);
    if (card) {
      card.style.backgroundColor = color;
    }
    console.log('DEBUG: setCardColor - cardId:', cardId);
    console.log('DEBUG: setCardColor - color:', color);
  };

  // useEffect 3
  useEffect(() => {
    // Retrieve the counts from local storage and update the state
    console.log('DEBUG: useEffect 3 called!');
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
  }, [setPhysicalHealthCheckedCount, setMentalHealthCheckedCount, setNutritionCheckedCount, setSleepCheckedCount]);

  // useEffect 4
  useEffect(() => {
    // Update the card colors based on the retrieved counts
    console.log('DEBUG: useEffect 4 called!');
    const totalPhysicalCheckboxes = 6;
    const totalMentalCheckboxes = 8;
    const totalNutritionCheckboxes = 4;
    const totalSleepCheckboxes = 10;

    const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
    const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
    const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
    const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

    console.log('physicalColor:', physicalColor);
    console.log('mentalColor:', mentalColor);
    console.log('nutritionColor:', nutritionColor);
    console.log('sleepColor:', sleepColor);

    setCardColor("mentalCard", mentalColor);
    setCardColor("physicalCard", physicalColor);
    setCardColor("nutritionCard", nutritionColor);
    setCardColor("sleepCard", sleepColor);

    // Store the counts in local storage
    localStorage.setItem('physicalHealthCheckedCount', physicalHealthCheckedCount.toString());
    localStorage.setItem('mentalHealthCheckedCount', mentalHealthCheckedCount.toString());
    localStorage.setItem('nutritionCheckedCount', nutritionCheckedCount.toString());
    localStorage.setItem('sleepCheckedCount', sleepCheckedCount.toString());
  }, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);

  // useEffect 5
  useEffect(() => {
    // Retrieve the username from localStorage when the component mounts
    console.log('DEBUG: useEffect 5 called!');
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName); // Update the userName in your context
    }
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
