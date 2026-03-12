// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Splash from './src/Screens/Splash';
import ChooseRoleScreen from './src/Screens/ChooseRoleScreen/ChooseRoleScreen';
import EmployeeLoginScreen from './src/Screens/EmployeeLoginScreen/EmployeeLoginScreen';
import ContactUsScreen from './src/Screens/ContactUsScreen/ContactUsScreen';
import EventDetailsScreen from './src/Screens/EventDetailsScreen/EventDetailsScreen';
import EventSuccessScreens from './src/Screens/EventSuccessScreens/EventSuccessScreens';
import SuccessRewardBonus from './src/Screens/TermRewardsScreen/SuccessRewardBonus';
import TermRewardDetailsScreen from './src/Screens/TermRewardDetailsScreen/TermRewardDetailsScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';

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
          // ── Token expired → try silent refresh ────────────────────────
          console.log('[App] MS token expired, attempting silent refresh...');
          try {
            const refreshed = await refreshMsToken(msRefreshToken);

            // Re-authenticate with your backend using the new MS ID token
            const loginResponse = await dispatch(
              loginWithIdToken({ idToken: refreshed.idToken }),
            ).unwrap();

            const userData = loginResponse?.data || {};
            const userWithPhoto = {
              ...userData,
              photoUrl: savedUser?.photoUrl || null,
            };

            // Update Redux
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
            // ── Refresh failed → clear everything → force re-login ──────
            console.warn('[App] Silent refresh failed, forcing re-login:', refreshError);
            await clearAuthSession();
            dispatch(clearAuth());
            // Navigation will naturally land on Splash/Login since accessToken is null
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

  // ── Fetch terms once authenticated ────────────────────────────────────
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

  // ── Wait until auth check is done before rendering navigation ─────────
  // This prevents a flash of the login screen on users who are already logged in
  if (!authChecked) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        // If we have a valid token after restore → go straight to MainTabs
        // Otherwise → Splash (which leads to login)
        initialRouteName={accessToken && user ? 'MainTabs' : 'Splash'}
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
        <Stack.Screen name="EmployeeLoginScreen" component={EmployeeLoginScreen} />
        <Stack.Screen name="MainTabs" component={DrawerNavigator} />
        <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="EventSuccessScreens" component={EventSuccessScreens} />
        <Stack.Screen name="SuccessRewardBonus" component={SuccessRewardBonus} />
        <Stack.Screen name="TermRewardDetailsScreen" component={TermRewardDetailsScreen} />

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