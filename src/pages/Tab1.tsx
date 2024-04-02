import React, { useEffect, useState } from 'react';
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
  const { mentalHealthCheckedCount, setMentalHealthCheckedCount, physicalHealthCheckedCount, setPhysicalHealthCheckedCount, nutritionCheckedCount, setNutritionCheckedCount, sleepCheckedCount, setSleepCheckedCount } = useGlobalCounts();
  const { userName, setUserName } = useUser();
  const totalPhysicalCheckboxes = 6; // Example value, adjust based on your app's requirements
  const totalMentalCheckboxes = 8; // Example value
  const totalNutritionCheckboxes = 4; // Example value
  const totalSleepCheckboxes = 10; // Example value

  useEffect(() => {
    // Assuming this useEffect is within a component that renders the cards
    const updateCardColors = () => {
      const physicalColor = getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes); // assuming totalPhysicalCheckboxes is defined
      const mentalColor = getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes); // assuming totalMentalCheckboxes is defined
      const nutritionColor = getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes); // assuming totalNutritionCheckboxes is defined
      const sleepColor = getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes); // assuming totalSleepCheckboxes is defined
  
      setCardColor("physicalCard", physicalColor);
      setCardColor("mentalCard", mentalColor);
      setCardColor("nutritionCard", nutritionColor);
      setCardColor("sleepCard", sleepColor);
    };
  
    updateCardColors();
  }, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);
  
  useEffect(() => {
    // Update the card colors based on the retrieved counts
    setCardColor("mentalCard", getColorBasedOnCount(mentalHealthCheckedCount, totalMentalCheckboxes));
    setCardColor("physicalCard", getColorBasedOnCount(physicalHealthCheckedCount, totalPhysicalCheckboxes));
    setCardColor("nutritionCard", getColorBasedOnCount(nutritionCheckedCount, totalNutritionCheckboxes));
    setCardColor("sleepCard", getColorBasedOnCount(sleepCheckedCount, totalSleepCheckboxes));
  }, [physicalHealthCheckedCount, mentalHealthCheckedCount, nutritionCheckedCount, sleepCheckedCount]);


  // Function to set card color based on count
  const setCardColor = (cardId: string, color: string) => {
    const card = document.getElementById(cardId);
    if (card) {
      card.style.backgroundColor = color;
    }
    console.log('setCardColor called');
    console.log('cardId:', cardId);
    console.log('color:', color);
  };

  useEffect(() => {
    // Retrieve the counts from local storage and update the state
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

  useEffect(() => {
    // Update the card colors based on the retrieved counts
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

  useEffect(() => {
    // Retrieve the username from localStorage when the component mounts
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
              <IonRouterLink routerLink="/mentalhealthpage">
                <IonCard id="mentalCard">
                  <img alt="MentalHealth" src="/MentalHealthCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#ebc2ff" }}>
                    <IonCardTitle>Mental Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/physicalhealthpage">
                <IonCard id="physicalCard">
                  <img alt="PhysicalHealth" src="/PhysicalHealthCard.png" height="" />
                  <IonCardHeader style={{ backgroundColor: "#a873e8" }}>
                    <IonCardTitle>Physical Health</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/nutritionpage">
                <IonCard id="nutritionCard">
                  <img alt="Nutrition" src="/NutritionCard.png" />
                  <IonCardHeader style={{ backgroundColor: "#56d1dc" }}>
                    <IonCardTitle>Nutrition</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonRouterLink>
            </IonCol>

            <IonCol size="6" size-sm="4">
              <IonRouterLink routerLink="/sleeppage">
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

export default Tab1;
