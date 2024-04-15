//This is a test file for trying a new way to handle checkboxes
//The idea is to have a default page of checkboxes that load in, and can be removed without permanently deleting them
//This would allow the user to reload the default ones on an app reset

import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
} from '@ionic/react';
import { calculateCheckedCount, getColorBasedOnCount } from './functions';
import './Nutrition.css';
import NutritionDefault from './nutritionDefault'; // Import the NutritionDefault component

const Nutrition: React.FC = () => {
  const initialState = {
    calorieTarget: false,
    individualMeals: false,
    waterTarget: false,
    fastFood: false,
  };

  const [customCheckboxText, setCustomCheckboxText] = useState<string>('');
  const [nutritionHabits, setNutritionHabits] = useState(initialState);

  useEffect(() => {
    // Load checkbox state from local storage
    const storedState = localStorage.getItem('nutritionPageCheckboxes');
    if (storedState) {
      setNutritionHabits(JSON.parse(storedState));
    }
  }, []);

  const handleAddCustomCheckbox = () => {
    if (customCheckboxText.trim() !== '') {
      setNutritionHabits(prevState => ({
        ...prevState,
        [customCheckboxText]: false
      }));
      setCustomCheckboxText('');
    }
  };

  useEffect(() => {
    // Save checkbox state to local storage whenever it changes
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits));
  }, [nutritionHabits]);

  const checkedCount = calculateCheckedCount(nutritionHabits);
  const totalCheckboxes = Object.keys(nutritionHabits).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Nutrition</IonTitle>
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
            <h2>Keep track of your nutrition here</h2>
          </IonLabel>
        </IonItem>
        <IonList>
          <NutritionDefault
            defaultCheckboxes={nutritionHabits}
            onDeleteCheckbox={(key: string) => setNutritionHabits(prevState => {
              const updatedHabits = { ...prevState };
              delete (updatedHabits as any)[key];
              return updatedHabits;
            })}
            onCheckboxChange={(key: string, value: boolean) => setNutritionHabits(prevState => ({
              ...prevState,
              [key]: value
            }))}
          />

          <IonItem>
            <IonInput
              placeholder="Enter a new goal here"
              value={customCheckboxText}
              onIonChange={e => setCustomCheckboxText(e.detail.value!)}
            />
            <IonButton onClick={handleAddCustomCheckbox}>Add new goal</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Nutrition;
