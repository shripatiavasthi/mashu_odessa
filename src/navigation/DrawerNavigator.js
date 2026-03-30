import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import AppDrawerContent from '../components/AppDrawerContent';
import {colors} from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerPosition: 'right', // <--- Move it here
        overlayColor: 'rgba(0,0,0,0.2)',
        drawerStyle: {
          backgroundColor: colors.primary,
          width: '78%',
        },
        swipeEdgeWidth: 50
      }}
      drawerContent={props => <AppDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
