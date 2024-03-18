import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';

import { GlobalCountsProvider } from './contexts/GlobalCountsContext';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, homeOutline, settingsOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import MentalHealthPage from './pages/MentalHealthPage';
import PhysicalHealthPage from './pages/PhysicalHealthPage';
import NutritionPage from './pages/NutritionPage';
import SleepPage from './pages/SleepPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

import { ThemeProvider } from './components/ThemeContext';
import { CheckboxProvider } from './contexts/CheckboxContext';
import { UserContextProvider } from './contexts/UserContext';
setupIonicReact();

const App: React.FC = () => (
  <ThemeProvider>
    <CheckboxProvider>
      <GlobalCountsProvider>
        <UserContextProvider> {/* Wrap the entire app with UserContextProvider */}
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Route path="/mentalhealthpage" component={MentalHealthPage} exact />
                  <Route path="/physicalhealthpage" component={PhysicalHealthPage} exact />
                  <Route path="/nutritionpage" component={NutritionPage} exact />
                  <Route path="/sleeppage" component={SleepPage} exact />
                  <Route exact path="/tab1">
                    <Tab1 />
                  </Route>
                  <Route exact path="/tab2">
                    <Tab2 />
                  </Route>
                  <Route path="/tab3">
                    <Tab3 />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/tab1" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon icon={homeOutline} />
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={calendarOutline} />
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon icon={settingsOutline} />
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </IonApp>
        </UserContextProvider>
      </GlobalCountsProvider>
    </CheckboxProvider>
  </ThemeProvider>
);

export default App;
