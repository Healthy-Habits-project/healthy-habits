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
  IonToolbar,
  IonButton,
  IonInput,
} from '@ionic/react';
import { calculateCheckedCount, getColorBasedOnCount, handleCheckboxChange } from './functions';
import './Nutrition.css';
import { useGlobalCounts } from '../contexts/GlobalCountsContext';
import { isNewDay } from '../utils/checkNewDay';

//Default boxes set as booleans checked/unchecked
interface CheckboxState {
  calorieTarget: boolean;
  individualMeals: boolean;
  waterTarget: boolean;
  fastFood: boolean;
}

//Default checkboxes initial state
//Unchecked by default
const Nutrition: React.FC = () => {
  const initialState: CheckboxState = {
    calorieTarget: false,
    individualMeals: false,
    waterTarget: false,
    fastFood: false,
  };

  const [customCheckboxText, setCustomCheckboxText] = useState<string>('');
  const [nutritionHabits, setNutritionHabits] = useState<CheckboxState>(() => {
    const storedState = localStorage.getItem('nutritionPageCheckboxes');
    return storedState ? JSON.parse(storedState) : initialState;
  });

//Checking if new day, and if it is a new day resetting checkboxes
  useEffect(() => {
    console.log('Nutrition.tsx: Checking for a new day...');
    if (isNewDay('Nutrition')) {
      console.log('Nutrition.tsx: New day, resetting nutrition checkboxes');
      setNutritionHabits(initialState);
      localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(initialState));
    } else {
      console.log('Nutrition.tsx: Not a new day, no need to reset checkboxes');
    }
  }, []);

  //Setting global counts here
  const { setNutritionCheckedCount } = useGlobalCounts();

  //Keep things in local storage
  useEffect(() => {
    const newCheckedCount = calculateCheckedCount(nutritionHabits);
    setNutritionCheckedCount(newCheckedCount);
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits)); // Persist the nutritionHabits state in localStorage
  }, [nutritionHabits, setNutritionCheckedCount]);

  const checkedCount = calculateCheckedCount(nutritionHabits);
  const totalCheckboxes = Object.keys(nutritionHabits).length;
  const color = getColorBasedOnCount(checkedCount, totalCheckboxes);

  const handleAddCustomCheckbox = () => {
    if (customCheckboxText.trim() !== '') {
      setNutritionHabits(prevState => ({
        ...prevState,
        [customCheckboxText]: false // Add the new custom checkbox to the state with default checked value of false
      }));
      setCustomCheckboxText(''); // Clear the input field after adding the custom checkbox
      setNutritionCheckedCount(checkedCount + 1); // Increase the checked count when a new custom checkbox is added
    }
  };

  //remove a checkbox
  const handleRemoveCheckbox = (keyToRemove: string) => {
    setNutritionHabits(prevState => {
      const updatedHabits = { ...prevState };
      delete (updatedHabits as any)[keyToRemove];
      return updatedHabits;
    });
  };
  

  //useEffect for adding new checkboxes
  useEffect(() => {
    if (customCheckboxText.trim() !== '') {
      setNutritionHabits(prevState => ({
        ...prevState,
        [customCheckboxText]: false // Add the new custom checkbox to the state with default checked value of false
      }));
      setCustomCheckboxText(''); // Clear the input field after adding the custom checkbox
      setNutritionCheckedCount(checkedCount + 1); // Increase the checked count when a new custom checkbox is added
    }
  }, [customCheckboxText, checkedCount, setNutritionCheckedCount]);

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

{/*           {Object.entries(nutritionHabits).map(([key, value]) => {
            const isDefaultCheckbox = initialState.hasOwnProperty(key);
            if (!isDefaultCheckbox) {
              return (
                <IonItem key={key}>
                  <IonCheckbox
                    slot="start"
                    checked={value}
                    onIonChange={() => handleCheckboxChange(key, nutritionHabits, setNutritionHabits)}
                  />
                  <IonLabel onClick={() => handleCheckboxChange(key, nutritionHabits, setNutritionHabits)}>
                    {key}
                  </IonLabel>
                  <IonButton onClick={() => handleRemoveCheckbox(key)}>X</IonButton>
                </IonItem>
              );
            }
          })}

          <IonItem>
            <IonInput
              placeholder="Enter a new goal here"
              value={customCheckboxText}
              onIonChange={e => setCustomCheckboxText(e.detail.value!)}
            />
            <IonButton onClick={handleAddCustomCheckbox}>Add new goal</IonButton>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Nutrition;
