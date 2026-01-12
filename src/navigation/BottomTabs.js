import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import {colors, typography} from '../styles/globalStyles';

import EventCheckInScreen from '../Screens/EventCheckInScreen/EventCheckInScreen';
import EventsScreen from '../Screens/EventsScreen/EventsScreen';
import TermRewardsScreen from '../Screens/TermRewardsScreen/TermRewardsScreen';
import FaqScreen from '../Screens/FaqScreen/FaqScreen';
import CheckInSuccessScreen from '../Screens/CheckInSuccessScreen/CheckInSuccessScreen';

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CheckInStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EventCheckInScreen"
        component={EventCheckInScreen}
      />
      <Stack.Screen
        name="CheckInSuccessScreen"
        component={CheckInSuccessScreen}
      />
       <Stack.Screen
        name="EventsScreen"
        component={EventsScreen}
      />
    </Stack.Navigator>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'CheckIn') {
            icon = focused
              ? require('../assets/Image/Icons/CheckInOn.png')
              : require('../assets/Image/Icons/CheckInOff.png');
          } else if (route.name === 'Events') {
            icon = focused
              ? require('../assets/Image/Icons/EventOn.png')
              : require('../assets/Image/Icons/EventOff.png');
          } else if (route.name === 'Rewards') {
            icon = focused
              ? require('../assets/Image/Icons/RewardOn.png')
              : require('../assets/Image/Icons/RewardOff.png');
          } else if (route.name === 'Faq') {
            icon = focused
              ? require('../assets/Image/Icons/FaqOn.png')
              : require('../assets/Image/Icons/FaqOff.png');
          }

          return (
            <Image
              source={icon}
              resizeMode="contain"
              style={styles.icon}
            />
          );
        },
      })}
    >
      
      <Tab.Screen
        name="CheckIn"
        component={CheckInStack}
        options={{ tabBarLabel: 'Check-in' }}
      />

      <Tab.Screen
        name="Events"
        component={EventsScreen}
      />

      <Tab.Screen
        name="Rewards"
        component={TermRewardsScreen}
      />

      <Tab.Screen
        name="Faq"
        component={FaqScreen}
        options={{ tabBarLabel: "FAQ's" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    height: height / 11,
    paddingTop: height / 80,
    paddingBottom: height / 60,
    // borderTopLeftRadius: width / 18,
    // borderTopRightRadius: width / 18,
    backgroundColor: colors.white,
    position: 'absolute',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain'
  },
  label: {
    fontSize: width / 32,
    fontWeight: '600',
    marginTop: height / 200,
    fontFamily: typography.regular,
  },
});
