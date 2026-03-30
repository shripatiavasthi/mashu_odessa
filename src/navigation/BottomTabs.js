import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EventCheckInScreen from '../Screens/EventCheckInScreen/EventCheckInScreen';
import EventsScreen from '../Screens/EventsScreen/EventsScreen';
import TermRewardsScreen from '../Screens/TermRewardsScreen/TermRewardsScreen';
import FaqScreen from '../Screens/FaqScreen/FaqScreen';
import CheckInSuccessScreen from '../Screens/CheckInSuccessScreen/CheckInSuccessScreen';
import SuccessRewardBonus from '../Screens/TermRewardsScreen/SuccessRewardBonus';
import ProgressScreen from '../Screens/PlcScreens/ProgressScreen/ProgressScreen';
import TeamScreen from '../Screens/PlcScreens/TeamScreen/TeamScreen';

import { colors, typography } from '../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMenu } from '../store/slices/appSlice';

import EmployeeLoginModal from '../components/EmployeeLoginModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CheckInStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventCheckInScreen" component={EventCheckInScreen} />
      <Stack.Screen name="CheckInSuccessScreen" component={CheckInSuccessScreen} />
      <Stack.Screen name="SuccessRewardBonus" component={SuccessRewardBonus} />
    </Stack.Navigator>
  );
}

const BottomTabs = () => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const activeMenu = useSelector(state => state.app.activeMenu);
  const dispatch = useDispatch();

  const openDrawer = () => {
    navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textDark,
          tabBarStyle: {
            height: 60 + insets.bottom,
            paddingTop: 8,
            paddingBottom: insets.bottom + 4,
            backgroundColor: '#FFFFFF',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            fontFamily: typography.bold,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconSource;

            if (route.name === 'CheckIn') {
              iconSource = focused
                ? require('../assets/Image/Icons/CheckInOn.png')
                : require('../assets/Image/Icons/CheckInOff.png');
            } else if (route.name === 'Events') {
              iconSource = focused
                ? require('../assets/Image/Icons/EventOn.png')
                : require('../assets/Image/Icons/EventOff.png');
            } else if (route.name === 'Rewards') {
              iconSource = focused
                ? require('../assets/Image/Icons/RewardOn.png')
                : require('../assets/Image/Icons/RewardOff.png');
            } else if (route.name === 'Faq') {
              iconSource = focused
                ? require('../assets/Image/Icons/FaqOn.png')
                : require('../assets/Image/Icons/FaqOff.png');
            } else if (route.name === 'Progress') {
              iconSource = focused
                ? require('../assets/Image/Icons/ProgressBlue.png') 
                : require('../assets/Image/Icons/ProgressBlack.png');
            } else if (route.name === 'Team') {
              iconSource = focused
                ? require('../assets/Image/Icons/TeamBlue.png')
                : require('../assets/Image/Icons/TeamBlack.png');
            } else if (route.name === 'More') {
              return <Ionicons name="ellipsis-horizontal" size={28} color={color} />;
            }

            return (
              <Image
                source={iconSource}
                resizeMode="contain"
                style={styles.icon}
              />
            );
          },
        })}
      >
        {/* Common Tabs */}
        <Tab.Screen
          name="CheckIn"
          component={CheckInStack}
          options={{ tabBarLabel: 'Check-in' }}
        />

        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{ tabBarLabel: 'Events' }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('Events', { initialTab: 'MY_EVENTS' });
            },
          })}
        />

        {/* Conditional Tabs based on activeMenu (PLC or OC) */}
        {activeMenu === 'OC' ? (
          <>
            <Tab.Screen
              name="Rewards"
              component={TermRewardsScreen}
              options={{ tabBarLabel: 'Rewards' }}
            />
            <Tab.Screen
              name="Faq"
              component={FaqScreen}
              options={{ tabBarLabel: "FAQ's" }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Progress"
              component={ProgressScreen}
              options={{ tabBarLabel: 'Progress' }}
            />
            <Tab.Screen
              name="Team"
              component={TeamScreen}
              options={{ tabBarLabel: 'Team' }}
            />
          </>
        )}

        <Tab.Screen
          name="More"
          component={() => null}
          options={{
            tabBarLabel: 'More',
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={openDrawer}
                style={props.style}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Employee Login Modal - Kept for both branches */}
      <EmployeeLoginModal
        visible={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onAllIn={() => {
          setShowEmployeeModal(false);
          dispatch(setActiveMenu('oc'));
        }}
        onPLC={() => {
          setShowEmployeeModal(false);
          dispatch(setActiveMenu('plc'));
        }}
        onThirty={() => {
          setShowEmployeeModal(false);
          Alert.alert('WorkInProgress!', 'Working now on 30 login flow, check back soon!');
        }}
      />
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
});


// import React, { useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Dimensions,
//   View,
//   Alert,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import EventCheckInScreen from '../Screens/EventCheckInScreen/EventCheckInScreen';
// import EventsScreen from '../Screens/EventsScreen/EventsScreen';
// import TermRewardsScreen from '../Screens/TermRewardsScreen/TermRewardsScreen';
// import FaqScreen from '../Screens/FaqScreen/FaqScreen';
// import CheckInSuccessScreen from '../Screens/CheckInSuccessScreen/CheckInSuccessScreen';
// import SuccessRewardBonus from '../Screens/TermRewardsScreen/SuccessRewardBonus';
// import { colors, typography } from '../styles/globalStyles';
// import { useSelector, useDispatch } from 'react-redux';
// import { setActiveMenu } from '../store/slices/appSlice';

// import EmployeeLoginModal from '../components/EmployeeLoginModal';
// import ProgressScreen from '../Screens/PlcScreens/ProgressScreen/ProgressScreen';
// import TeamScreen from '../Screens/PlcScreens/TeamScreen/TeamScreen';
// // import TeamLoginSignScreen from '../Screens/PlcScreens/TeamLoginSignScreen/TeamLoginSignScreen'


// // const TeamScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;
// const HomeScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

// const { width } = Dimensions.get('window');
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function CheckInStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="EventCheckInScreen" component={EventCheckInScreen} />
//       <Stack.Screen name="CheckInSuccessScreen" component={CheckInSuccessScreen} />
//       <Stack.Screen name="SuccessRewardBonus" component={SuccessRewardBonus} />
//       {/* <Stack.Screen name="TeamLoginSignScreen" component={TeamLoginSignScreen} /> */}
//     </Stack.Navigator>
//   );
// }

// const BottomTabs = () => {
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();

//   const activeMenu = useSelector(state => state.app.activeMenu);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarShowLabel: true,
//           tabBarActiveTintColor: colors.primary,
//           tabBarInactiveTintColor: colors.textDark,
//           tabBarStyle: {
//             height: 60 + insets.bottom,
//             paddingTop: 8,
//             paddingBottom: insets.bottom + 4,
//             backgroundColor: '#FFFFFF',
//             position: 'absolute',
//             elevation: 8,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: -3 },
//             shadowOpacity: 0.1,
//             shadowRadius: 6,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: '600',
//             fontFamily: typography.bold,
//           },
//           tabBarIcon: ({ focused }) => {
//             let icon;
//             let isCenter = false;

//             if (route.name === 'CheckIn') {
//               icon = focused
//                 ? require('../assets/Image/Icons/CheckInOn.png')
//                 : require('../assets/Image/Icons/CheckInOff.png');
//             } else if (route.name === 'Events') {
//               icon = focused
//                 ? require('../assets/Image/Icons/EventOn.png')
//                 : require('../assets/Image/Icons/EventOff.png');
//             } else if (route.name === 'Rewards') {
//               icon = focused
//                 ? require('../assets/Image/Icons/RewardOn.png')
//                 : require('../assets/Image/Icons/RewardOff.png');
//             } else if (route.name === 'Faq') {
//               icon = focused
//                 ? require('../assets/Image/Icons/FaqOn.png')
//                 : require('../assets/Image/Icons/FaqOff.png');
//             } else if (route.name === 'Progress') {
//               icon = focused
//                 ? require('../assets/Image/Icons/EventOn.png')
//                 : require('../assets/Image/Icons/EventOff.png');
//             } else if (route.name === 'TeamScreen') {
//               icon = focused
//                 ? require('../assets/Image/Icons/EventOn.png')
//                 : require('../assets/Image/Icons/EventOff.png');
//             } else if (route.name === 'HomeTab') {
//               isCenter = true;
//               icon = require('../assets/Image/Icons/Home.png');
//             }

//             if (isCenter) {
//               return (
//                 <View style={styles.centerButton}>
//                   <Image
//                     source={icon}
//                     resizeMode="contain"
//                     style={[styles.icon, { tintColor: '#FFFFFF' }]}
//                   />
//                 </View>
//               );
//             }

//             return (
//               <Image
//                 source={icon}
//                 resizeMode="contain"
//                 style={styles.icon}
//               />
//             );
//           },
//         })}>

//         <Tab.Screen
//           name="CheckIn"
//           component={CheckInStack}
//           options={{ tabBarLabel: 'Check-in' }}
//         />
//         <Tab.Screen
//           name="Events"
//           component={EventsScreen}
//           listeners={({ navigation }) => ({
//             tabPress: () => {
//               navigation.navigate('Events', { initialTab: 'MY_EVENTS' });
//             },
//           })}
//         />

//         <Tab.Screen
//           name="HomeTab"
//           component={HomeScreen}
//           options={{ tabBarLabel: () => null }}
//           listeners={{
//             tabPress: e => {
//               e.preventDefault();
//               setShowEmployeeModal(true);
//             },
//           }}
//         />
 
//         {activeMenu === 'OC' ? (
//           <>
//             <Tab.Screen name="Rewards" component={TermRewardsScreen} />
//             <Tab.Screen
//               name="Faq"
//               component={FaqScreen}
//               options={{ tabBarLabel: "FAQ's" }}
//             />
//           </>
//         ) : (
//           <>
//             <Tab.Screen
//               name="Progress"
//               component={ProgressScreen}
//               options={{ tabBarLabel: 'Progress' }}
//             />
//             <Tab.Screen
//               name="TeamScreen"
//               component={TeamScreen}
//               options={{ tabBarLabel: 'TeamScreen' }}
//             />
            
//           </>
//         )}
//       </Tab.Navigator>

//       <EmployeeLoginModal
//         visible={showEmployeeModal}
//         onClose={() => setShowEmployeeModal(false)}
//         onAllIn={() => {
//           setShowEmployeeModal(false);
//           dispatch(setActiveMenu('OC'));
//         }}
//         onPLC={() => {
//           setShowEmployeeModal(false);
//           dispatch(setActiveMenu('PLC'));
//         }}
//         onThirty={() => {
//           setShowEmployeeModal(false);
//           Alert.alert('WorkInProgess!', 'Working now on #o for 30 login flow, check back soon!');
//         }}
//       />
//     </>
//   );
// };

// export default BottomTabs;

// const styles = StyleSheet.create({
//   icon: {
//     height: 28,
//     width: 28,
//     resizeMode: 'contain',
//   },
//   centerButton: {
//     top: -20,
//     width: 75,
//     height: 75,
//     borderRadius: 50,
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
// });

