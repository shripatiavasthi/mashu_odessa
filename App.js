import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import Splash from './src/Screens/Splash';
import ChooseRoleScreen from './src/Screens/ChooseRoleScreen/ChooseRoleScreen';
import LoginScreen from './src/Screens/EmployeeLoginScreen/LoginScreen';
import ContactUsScreen from './src/Screens/ContactUsScreen/ContactUsScreen';
import EventDetailsScreen from './src/Screens/EventDetailsScreen/EventDetailsScreen';
import EventSuccessScreens from './src/Screens/EventSuccessScreens/EventSuccessScreens';
import SuccessRewardBonus from './src/Screens/TermRewardsScreen/SuccessRewardBonus';
import TermRewardDetailsScreen from './src/Screens/TermRewardDetailsScreen/TermRewardDetailsScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import PlcDetailScreen from './src/Screens/PlcScreens/ProgressScreen/PlcDetailScreen'
import TeamDetailScreen from './src/Screens/PlcScreens/ProgressTeamScreen/TeamDetailScreen'
import ChangeTeamScreen from './src/Screens/PlcScreens/ChangeTeamScreen/ChangeTeamScreen'
import TeamChangeSuccessScreen from './src/Screens/PlcScreens/TeamChangeSuccessScreen/TeamChangeSuccessScreen'
// import TeamLoginSignScreen from './src/Screens/PlcScreens/TeamLoginSignScreen/TeamLoginSignScreen'
import PolicyScreen from './src/Screens/PlcScreens/PolicyScreen/PolicyScreen'
import TeamSignup from './src/Screens/PlcScreens/TeamSignup/TeamSignup'
import TeamNewScreen from './src/Screens/PlcScreens/TeamNewScreen/TeamNewScreen'
import TeamCreatedSuccessScreen from './src/Screens/PlcScreens/TeamNewScreen/TeamCreatedSuccessScreen';

import { persistor, store } from './src/store';
import { selectAuth } from './src/store';
import { setAuthData, clearAuth } from './src/store/slices/authSlice';
import {
  loadAuthSession,
  clearAuthSession,
  isMsTokenExpired,
  refreshMsToken,
  saveAuthSession,
} from './src/services/authService';
import { loginWithIdToken } from './src/store/slices/authSlice';
import NetInfo from '@react-native-community/netinfo';
import AppGradient from './src/components/AppGradient';
import { StyleSheet, View, Text } from 'react-native';


const Stack = createStackNavigator();

function Root() {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(selectAuth);
  const [authChecked, setAuthChecked] = useState(false);

  const [isConnected, setIsConnected] = useState(true);
  const [wasDisconnected, setWasDisconnected] = useState(false);


useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    const connected = state.isConnected;
    setIsConnected(connected);

    if (connected && wasDisconnected) {
      setWasDisconnected(false);
      restoreSession(); 
    }

    if (!connected) {
      setWasDisconnected(true);
    }
  });
  return () => unsubscribe();
}, [wasDisconnected]);



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

  if (!authChecked) return null;

  if (!isConnected) return <NoInternetScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={accessToken && user ? 'MainTabs' : 'Splash'}
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
        {/* <Stack.Screen name="TeamLoginSignScreen" component={TeamLoginSignScreen} /> */}
        <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
        <Stack.Screen name="TeamSignup" component={TeamSignup} />
        <Stack.Screen name="TeamNewScreen" component={TeamNewScreen} />
        <Stack.Screen name="TeamCreatedSuccessScreen" component={TeamCreatedSuccessScreen} />
        
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
 
function NoInternetScreen() {
  return (
    <AppGradient style={styles.AppGradientCon}>
    <View style={styles.container}>
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your network and try again.
      </Text>
    </View>
    </AppGradient>
  );
}

export default App;


const styles = StyleSheet.create({
  AppGradientCon:{
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5fa8',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
});