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
import { useCheckboxContext } from '../contexts/CheckboxInterpreter';

interface CheckboxState {
  calorieTarget: boolean;
  individualMeals: boolean;
  waterTarget: boolean;
  fastFood: boolean;
  [key: string]: boolean; // Allow dynamic keys for custom checkboxes
}

const Nutrition: React.FC = () => {
  const { updateCount } = useCheckboxContext();
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

  useEffect(() => {
    if (isNewDay('Nutrition')) {
      resetCheckboxes();
    }
  }, []);

  const resetCheckboxes = () => {
    setNutritionHabits(initialState);
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(initialState));
  };

  const { setNutritionCheckedCount } = useGlobalCounts();

  useEffect(() => {
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(nutritionHabits));
    const newCheckedCount = calculateCheckedCount(nutritionHabits);
    setNutritionCheckedCount(newCheckedCount);
  }, [nutritionHabits]);



  /#####################################################################################################/

  const handleAddCustomCheckbox = () => {
    if (customCheckboxText.trim()) {
      // Explicitly cast the newCheckbox to Partial<CheckboxState> to ensure only valid CheckboxState keys are added.
      const newCheckbox: Partial<CheckboxState> = { [customCheckboxText]: false };
      // Use the spread operator to combine the existing state with the new checkbox.
      // Since newCheckbox is a Partial<CheckboxState>, no type conflict should occur here.
      const updatedState = { ...nutritionHabits, ...newCheckbox };
      updateCheckboxes(updatedState as CheckboxState);
      setCustomCheckboxText('');
    }
  };
  
  const handleRemoveCheckbox = (keyToRemove: string) => {
    const { [keyToRemove]: _, ...remainingCheckboxes } = nutritionHabits;
    // Ensure that the remaining checkboxes are still of type CheckboxState.
    updateCheckboxes(remainingCheckboxes as CheckboxState);
  };
  const updateCheckboxes = (newState: CheckboxState) => {
    // Directly set the new state assuming it matches the CheckboxState structure.
    setNutritionHabits(newState);
    localStorage.setItem('nutritionPageCheckboxes', JSON.stringify(newState));
  };

  const updateCheckboxCount = () => {
    const count = Object.keys(nutritionHabits).length; // Get the current count of checkboxes
    updateCount('nutrition', count);  // Assuming updateCount is your context method to update the count
  };

  // Call this function whenever checkboxes are added, removed, or their checked state changes
useEffect(() => {
  updateCheckboxCount(); // Call this after any change in the checkbox state
}, [nutritionHabits]); // Dependency on the state of nutritionHabits


/#####################################################################################################/

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

          {Object.entries(nutritionHabits).map(([key, value]) => {
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
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Nutrition;
