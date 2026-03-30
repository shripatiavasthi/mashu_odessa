import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SplashScreen from './src/common/screens/auth/SplashScreen';
import ChooseRoleScreen from './src/common/screens/auth/ChooseRoleScreen';
import EmployeeLoginScreen from './src/employee/screens/auth/EmployeeLoginScreen';
import ContactUsScreen from './src/common/screens/shared/ContactUsScreen';
import EventDetailsScreen from './src/Screens/EventDetailsScreen/EventDetailsScreen';
import EventSuccessScreens from './src/Screens/EventSuccessScreens/EventSuccessScreens';
import SuccessRewardBonus from './src/Screens/TermRewardsScreen/SuccessRewardBonus';
import TermRewardDetailsScreen from './src/Screens/TermRewardDetailsScreen/TermRewardDetailsScreen';
import DrawerNavigator from './src/common/navigation/DrawerNavigator';
import PlcDetailScreen from './src/employee/programs/professionalLearningCenter/screens/ProgressScreen/PlcDetailScreen';
import TeamDetailScreen from './src/employee/programs/professionalLearningCenter/screens/ProgressTeamScreen/TeamDetailScreen';
import ChangeTeamScreen from './src/employee/programs/professionalLearningCenter/screens/ChangeTeamScreen/ChangeTeamScreen';
import TeamChangeSuccessScreen from './src/employee/programs/professionalLearningCenter/screens/TeamChangeSuccessScreen/TeamChangeSuccessScreen';
import TeamLoginSignScreen from './src/employee/programs/professionalLearningCenter/screens/TeamLoginSignScreen/TeamLoginSignScreen';
import PolicyScreen from './src/employee/programs/professionalLearningCenter/screens/PolicyScreen/PolicyScreen';
import TeamSignup from './src/employee/programs/professionalLearningCenter/screens/TeamSignup/TeamSignup';
import TeamNewScreen from './src/employee/programs/professionalLearningCenter/screens/TeamNewScreen/TeamNewScreen';

import { persistor, store } from './src/store';
import { fetchGoalPoints, fetchTermCodes } from './src/store/slices/termSlice';
import { fetchEventsByTerm, fetchUpcomingEvents } from './src/store/slices/eventsSlice';
import { selectAuth, selectTerms } from './src/store';
import { setAuthData, clearAuth } from './src/store/slices/authSlice';
import {
  loadAuthSession,
  clearAuthSession,
  isMsTokenExpired,
  refreshMsToken,
  saveAuthSession,
} from './src/services/authService';
import { loginWithIdToken } from './src/store/slices/authSlice';



const Stack = createStackNavigator();

function Root() {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(selectAuth);
  const { items: termItems, status: termStatus } = useSelector(selectTerms);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await loadAuthSession();
        if (!session) {
          console.log('[App] No saved session found');
          setAuthChecked(true);
          return;
        }

        const { msRefreshToken, msTokenExpiry, msAccessToken, backendAccessToken, user: savedUser } = session;

        if (!isMsTokenExpired(msTokenExpiry)) {
          console.log('[App] Token valid, restoring session');
          dispatch(
            setAuthData({
              accessToken: backendAccessToken,
              msAccessToken,
              msRefreshToken,
              msTokenExpiry,
              user: savedUser,
            }),
          );
        } else {
          
          console.log('[App] MS token expired, attempting silent refresh...');
          try {
            const refreshed = await refreshMsToken(msRefreshToken);
            const loginResponse = await dispatch(
              loginWithIdToken({ idToken: refreshed.idToken }),
            ).unwrap();

            const userData = loginResponse?.data || {};
            const userWithPhoto = {
              ...userData,
              photoUrl: savedUser?.photoUrl || null,
            };

            dispatch(
              setAuthData({
                accessToken: userData.accessToken,
                msAccessToken: refreshed.msAccessToken,
                msRefreshToken: refreshed.msRefreshToken,
                msTokenExpiry: refreshed.msTokenExpiry,
                user: userWithPhoto,
              }),
            );

            // Persist updated tokens
            await saveAuthSession({
              msAccessToken: refreshed.msAccessToken,
              msRefreshToken: refreshed.msRefreshToken,
              msTokenExpiry: refreshed.msTokenExpiry,
              backendAccessToken: userData.accessToken,
              user: userWithPhoto,
            });

            console.log('[App] Silent refresh succeeded');
          } catch (refreshError) {
            console.warn('[App] Silent refresh failed, forcing re-login:', refreshError);
            await clearAuthSession();
            dispatch(clearAuth());
            
          }
        }
      } catch (e) {
        console.warn('[App] Session restore error:', e);
        await clearAuthSession();
        dispatch(clearAuth());
      } finally {
        setAuthChecked(true);
      }
    };

    restoreSession();
  }, [dispatch]);

  
  useEffect(() => {
    if (accessToken && termStatus === 'idle') {
      dispatch(fetchTermCodes({ accessToken }));
    }
  }, [accessToken, dispatch, termStatus]);

  useEffect(() => {
    if (accessToken && user?.id) {
      dispatch(fetchUpcomingEvents({ accessToken, userId: user.id }));
    }
  }, [accessToken, dispatch, user?.id]);

  useEffect(() => {
    if (!termItems?.length || !accessToken || !user?.id) return;

    const currentTerm = termItems.find(t => t.currentTerm === true);
    const fallbackTerm = termItems[0];
    const targetTerm = currentTerm || fallbackTerm;

    if (targetTerm?.id) {
      dispatch(fetchEventsByTerm({ accessToken, userId: user.id, termId: targetTerm.id }));
      dispatch(fetchGoalPoints({ accessToken, termCodeId: targetTerm.id }));
    }
  }, [termItems, accessToken, user?.id, dispatch]);

  if (!authChecked) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={accessToken && user ? 'MainTabs' : 'Splash'}
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
        <Stack.Screen name="EmployeeLoginScreen" component={EmployeeLoginScreen} />
        <Stack.Screen name="MainTabs" component={DrawerNavigator} />
        <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
        <Stack.Screen name="PlcDetailScreen" component={PlcDetailScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="EventSuccessScreens" component={EventSuccessScreens} />
        <Stack.Screen name="SuccessRewardBonus" component={SuccessRewardBonus} />
        <Stack.Screen name="TermRewardDetailsScreen" component={TermRewardDetailsScreen} />
        <Stack.Screen name="TeamDetailScreen" component={TeamDetailScreen} />
        <Stack.Screen name="ChangeTeamScreen" component={ChangeTeamScreen} />
        <Stack.Screen name="TeamChangeSuccessScreen" component={TeamChangeSuccessScreen} />
        <Stack.Screen name="TeamLoginSignScreen" component={TeamLoginSignScreen} />
        <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
        <Stack.Screen name="TeamSignup" component={TeamSignup} />
        <Stack.Screen name="TeamNewScreen" component={TeamNewScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}

export default App;
