// nutritionDefault.tsx
//This goes with the file currently named nutritionTestDoNotTouch
//It holds the default checkboxes to be deleted/restored

import React from 'react';
import { IonCheckbox, IonItem, IonLabel, IonButton } from '@ionic/react';

interface NutritionDefaultProps {
  defaultCheckboxes: Record<string, boolean>;
  onDeleteCheckbox: (key: string) => void;
  onCheckboxChange: (key: string, value: boolean) => void;
}

const NutritionDefault: React.FC<NutritionDefaultProps> = ({
  defaultCheckboxes,
  onDeleteCheckbox,
  onCheckboxChange,
}) => {
  return (
    <>
      {Object.entries(defaultCheckboxes).map(([key, value]) => (
        <IonItem key={key}>
          <IonCheckbox
            slot="start"
            checked={value}
            onIonChange={(e) => onCheckboxChange(key, e.detail.checked!)}
          />
          <IonLabel>{key}</IonLabel>
          <IonButton onClick={() => onDeleteCheckbox(key)}>X</IonButton>
        </IonItem>
      ))}
    </>
  );
};

export default NutritionDefault;
