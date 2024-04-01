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
import './NutritionPage.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { isNewDay } from '../utils/checkNewDay';

interface NutritionPageState {
  calorieTarget: boolean;
  individualMeals: boolean;
  waterTarget: boolean;
  fastFood: boolean;
}
interface CheckboxState {
  calorieTarget: false,
  individualMeals: false,
  waterTarget: false,
  fastFood: false,
}
const NutritionPage: React.FC = () => {
  const initialState: CheckboxState = {
    calorieTarget: false,
    individualMeals: false,
    waterTarget: false,
    fastFood: false,
  };
  const [nutritionHabits, setNutritionHabits] = useState<CheckboxState>(() => {
    const storedState = localStorage.getItem('nutritionPageCheckboxes');
    return storedState ? JSON.parse(storedState) : initialState;
  });
  useEffect(() => {
    console.log('Checking for a new day...');
    if (isNewDay('nutritionPage')) {
      console.log('New day, resetting nutrition checkboxes');
      setNutritionHabits(initialState);
      localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(initialState));
    } 
  }, []);

  const { setNutritionCheckedCount } = useGlobalCounts();

  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(nutritionHabits);
    setNutritionCheckedCount(newCheckedCount);
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits)); // Persist the nutritionHabits state in localStorage
  }, [nutritionHabits, setNutritionCheckedCount]);

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
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.calorieTarget}
              onIonChange={() => handleCheckboxChange('calorieTarget', nutritionHabits, setNutritionHabits)}
              aria-label="Calorie Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('calorieTarget', nutritionHabits, setNutritionHabits)}>
              Did you meet your calorie target today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.individualMeals}
              onIonChange={() => handleCheckboxChange('individualMeals', nutritionHabits, setNutritionHabits)}
              aria-label="Individual Meals"
            />
            <IonLabel onClick={() => handleCheckboxChange('individualMeals', nutritionHabits, setNutritionHabits)}>
              Did you eat individual meals today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.waterTarget}
              onIonChange={() => handleCheckboxChange('waterTarget', nutritionHabits, setNutritionHabits)}
              aria-label="Water Target"
            />
            <IonLabel onClick={() => handleCheckboxChange('waterTarget', nutritionHabits, setNutritionHabits)}>
              Did you drink enough water today?
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={nutritionHabits.fastFood}
              onIonChange={() => handleCheckboxChange('fastFood', nutritionHabits, setNutritionHabits)}
              aria-label="Fast Food Consumption"
            />
            <IonLabel onClick={() => handleCheckboxChange('fastFood', nutritionHabits, setNutritionHabits)}>
              Did you avoid fast food today?
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NutritionPage;
