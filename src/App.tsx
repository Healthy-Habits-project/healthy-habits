import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';

import { GlobalCountsProvider } from './contexts/GlobalCountsContext';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, homeOutline, settingsOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import Mental from './pages/Mental';
import Physical from './pages/Physical';
import Nutrition from './pages/Nutrition';
import Sleep from './pages/Sleep';

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

import useTheme from './components/useTheme';

setupIonicReact();

const App: React.FC = () => (
  useTheme(),
  <ThemeProvider>
    <CheckboxProvider>
      <GlobalCountsProvider>
        <UserContextProvider> {/* Wrap the entire app with UserContextProvider */}
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Route path="/home/mental" component={Mental} exact />
                  <Route path="/home/physical" component={Physical} exact />
                  <Route path="/home/nutrition" component={Nutrition} exact />
                  <Route path="/home/sleep" component={Sleep} exact />
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/calendar">
                    <Calendar />
                  </Route>
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeOutline} />
                  </IonTabButton>
                  <IonTabButton tab="calendar" href="/calendar">
                    <IonIcon icon={calendarOutline} />
                  </IonTabButton>
                  <IonTabButton tab="settings" href="/settings">
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
