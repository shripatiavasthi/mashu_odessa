import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Splash from './src/Screens/Splash';
import ChooseRoleScreen from './src/Screens/ChooseRoleScreen/ChooseRoleScreen';
import LoginScreen from './src/Screens/LoginScreen';
import EmployeeLoginScreen from './src/Screens/EmployeeLoginScreen/EmployeeLoginScreen';
import ContactUsScreen from './src/Screens/ContactUsScreen/ContactUsScreen';
import EventDetailsScreen from './src/Screens/EventDetailsScreen/EventDetailsScreen'
import EventSuccessScreens from './src/Screens/EventSuccessScreens/EventSuccessScreens'

import DrawerNavigator from './src/navigation/DrawerNavigator';

import { persistor, store } from './src/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
            
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="ChooseRoleScreen" component={ChooseRoleScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="EmployeeLoginScreen" component={EmployeeLoginScreen} />

            <Stack.Screen name="MainTabs" component={DrawerNavigator} />
            <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
            <Stack.Screen name="EventSuccessScreens" component={EventSuccessScreens} />


          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
