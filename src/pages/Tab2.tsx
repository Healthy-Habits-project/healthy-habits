import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonModal, IonImg } from '@ionic/react';
import CustomCalendar from '../components/CustomCalendar'; // Make sure this path is correct
import { format } from 'date-fns';
import badgeImage from '/badges/badge1.png'; // Ensure this path points to your badge image
import { useGlobalCounts } from '../contexts/GlobalCountsContext';


import './Tab2.css';

const Tab2: React.FC = () => {
  const savedRatings = JSON.parse(localStorage.getItem('dayRatings') || '{}');
  const [dayRatings, setDayRatings] = useState<{ [key: string]: number }>(savedRatings);
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const { mentalHealthCheckedCount } = useGlobalCounts();
  const { physicalHealthCheckedCount } = useGlobalCounts();
  const { nutritionCheckedCount } = useGlobalCounts();
  const { sleepCheckedCount } = useGlobalCounts();
  const [showRatings, setShowRatings] = useState<boolean>(false);
  const [ratingMode, setRatingMode] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(0); // Track selected rating


  const calculateColor = (
    physicalHealthCheckedCount: number,
    mentalHealthCheckedCount: number,
    nutritionCheckedCount: number,
    sleepCheckedCount: number
  ): string => {
    const score = 0.25 * (physicalHealthCheckedCount / 5) + 0.25 * (mentalHealthCheckedCount / 8) + 0.25 * (nutritionCheckedCount / 4) + 0.25 * (sleepCheckedCount / 10);
    if (score <= 0.25) return 'red';
    else if (score <= 0.5) return 'orange';
    else if (score <= 0.75) return 'yellow';
    else return 'green';
  };

  const backgroundColor = calculateColor(
    physicalHealthCheckedCount,
    mentalHealthCheckedCount,
    nutritionCheckedCount,
    sleepCheckedCount
  );

  const handleRateDay = () => {
    // Save the rating for the selected date
    const updatedRatings = { ...dayRatings, [selectedDate]: selectedRating };
    setDayRatings(updatedRatings);
    localStorage.setItem('dayRatings', JSON.stringify(updatedRatings));

    // Increment badge count if needed
    const highRatedDaysCount = Object.values(updatedRatings).filter(rating => rating >= 7).length;
    if (highRatedDaysCount % 5 === 0 && highRatedDaysCount > 0) {
      setBadgeCount(prevCount => prevCount + 1);
    }

    // Close the modal and exit rating mode
    setShowRatings(false);
    setRatingMode(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center" style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#007bff' }}>Rate Your Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {!ratingMode && (
            <IonButton
              expand="block"
              size="large"
              color="primary"
              style={{ fontSize: '1.2em', fontWeight: 'bold', marginRight: '10px' }}
              onClick={() => setRatingMode(true)}
            >
              Rate
            </IonButton>
          )}
          {ratingMode && (
            <IonButton
              expand="block"
              size="large"
              color="medium"
              style={{ fontSize: '1.2em', fontWeight: 'bold' }}
              onClick={() => setRatingMode(false)}
            >
              Cancel
            </IonButton>
          )}
        </div>
        <CustomCalendar
          dayRatings={dayRatings}
          onDaySelect={(date: string) => {
            setSelectedDate(date);
            setShowRatings(ratingMode); // Show ratings modal only when in rating mode
          }}
          calculatedColor={backgroundColor}
          progressData={{
            mentalHealthCheckedCount,
            physicalHealthCheckedCount,
            nutritionCheckedCount,
            sleepCheckedCount,
          }}
          style={{ height: '80%' }} // Adjust the height of the calendar to fit the content area
        />

        <IonModal isOpen={showRatings} onDidDismiss={() => setShowRatings(false)} className="custom-modal">
          <IonGrid style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IonRow>
              {Array.from({ length: 10 }, (_, i) => 1 + i).map(number => (
                <IonCol size="4" sizeSm="3" sizeMd="2" key={number}>
                  <IonButton
                    expand="block"
                    style={{
                      margin: '8px',
                      padding: '16px', // Increase padding to make buttons larger
                      fontSize: '1.5em', // Increase font size for better clarity
                      backgroundColor: selectedRating === number ? `hsl(${0 + (number - 1) * 12}, 100%, 60%)` : `hsl(${0 + (number - 1) * 12}, 100%, 50%)`, // Highlight selected button
                      color: selectedRating === number ? 'white' : 'black', // Adjust text color for better visibility
                      animation: selectedRating === number ? 'pop 0.5s ease' : 'none', // Add pop animation to highlight selected button
                      '--hover-opacity': 0.9,
                    }}
                    className={selectedRating === number ? 'selected-rating' : 'unselected-rating'}
                    onClick={() => setSelectedRating(number)}
                  >
                    {number}
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          <IonButton
            onClick={handleRateDay}
            style={{
              margin: '16px',
              padding: '12px 24px',
              fontSize: '1.2em',
              fontWeight: 'bold',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.2s',
              backgroundImage: 'linear-gradient(to right, #007bff, #00bfff)',
            }}
          >
            Submit Rating
          </IonButton>
        </IonModal>
      </IonContent>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '20px', color: 'white', borderTop: '1px solid #ccc', zIndex: 1000 }}>
        {badgeCount > 0 && (
          <>
            <IonImg src={badgeImage} style={{ width: '50px', height: '50px' }} />
            <div style={{ marginTop: '10px' }}>You've earned {badgeCount} {badgeCount === 1 ? 'badge' : 'badges'} for positivity!</div>
          </>
        )}
      </div>
    </IonPage>
  );
};

export default Tab2;