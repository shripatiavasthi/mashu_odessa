
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Splash from './src/Screens/Splash';
import ChooseRoleScreen from './src/Screens/ChooseRoleScreen/ChooseRoleScreen';
import LoginScreen from './src/Screens/LoginScreen';
import EmployeeLoginScreen from './src/Screens/EmployeeLoginScreen/EmployeeLoginScreen';
import EventCheckInScreen from './src/Screens/EventCheckInScreen/EventCheckInScreen';
import CheckInSuccessScreen from './src/Screens/CheckInSuccessScreen/CheckInSuccessScreen';
import ContactUsScreen from './src/Screens/ContactUsScreen/ContactUsScreen';
import {persistor, store} from './src/store';

// import messaging from '@react-native-firebase/messaging';


const Stack = createStackNavigator();

function App() {

//     async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

//   const getFcmToken = async () => {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       Alert.alert('Your Firebase Token is:', fcmToken);
//       console.log('Your Firebase Token is:', fcmToken);
//     } else {
//       console.log('Failed', 'No token received');
//     }
//   };

// React.useEffect(() => {
//   const initFCM = async () => {
//     await messaging().requestPermission();
//     const token = await messaging().getToken();
//     console.log('FCM TOKEN:', token);
//   };

//   initFCM();
//   getFcmToken()
//   requestUserPermission()
// }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="EmployeeLoginScreen"
              component={EmployeeLoginScreen}
            />
            <Stack.Screen
              name="EventCheckInScreen"
              component={EventCheckInScreen}
            />
            <Stack.Screen
              name="CheckInSuccessScreen"
              component={CheckInSuccessScreen}
            />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;


