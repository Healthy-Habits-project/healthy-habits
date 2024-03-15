// Tab1.tsx
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

import './Tab1.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Tab1: React.FC = () => {
  const { mentalHealthCheckedCount } = useGlobalCounts();
  const { physicalHealthCheckedCount } = useGlobalCounts();
  const { nutritionCheckedCount } = useGlobalCounts();
  const { sleepCheckedCount } = useGlobalCounts();
  const { userName, setUserName } = useUser();
  useEffect(() => {
    // Retrieve the username from localStorage when the component mounts
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName); // Update the userName in your context
    }
  }, [setUserName]);

  // TODO: Replace hard-coded values with values calculated from the GlobalCountsContext, somehow.
  const totalPhysicalCheckboxes = 6;
  const totalMentalCheckboxes = 8;
  const totalNutritionCheckboxes = 4;
  const totalSleepCheckboxes = 10;

  const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
  const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
  const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
  const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

  // TODO: Get the card color to update when the page is accessed, rather than only when the card is clicked.
  // UseEffect is not working as expected, so the card colors are not updating when the Tab1.tsx page is accessed.
  const setCardColor = (cardId: string, color: string) => {
    const card = document.getElementById(cardId);
    if (card) {
      card.style.backgroundColor = color;
    }
  };

  useEffect(() => {
    // Update the colors when the page is accessed, at least that's the idea.
    const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes);
    const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes);
    const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes);
    const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes);

    setCardColor("mentalCard", mentalColor);
    setCardColor("physicalCard", physicalColor);
    setCardColor("nutritionCard", nutritionColor);
    setCardColor("sleepCard", sleepColor);
  }, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);

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
              <IonRouterLink routerLink="/mentalhealthpage">
                <IonCard id="mentalCard" style={{ backgroundColor: mentalColor }}>
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#ebc2ff" }}>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/physicalhealthpage">
                <IonCard id="physicalCard" style={{ backgroundColor: physicalColor }}>
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader style={{ backgroundColor: "#a873e8" }}>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/nutritionpage">
                <IonCard id="nutritionCard" style={{ backgroundColor: nutritionColor }}>
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#56d1dc" }}>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/sleeppage">
                <IonCard id="sleepCard" style={{ backgroundColor: sleepColor }}>
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

export default Tab1;
