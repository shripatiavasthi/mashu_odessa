import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Splash from './src/Screens/Splash';
import ChooseRoleScreen from './src/Screens/ChooseRoleScreen/ChooseRoleScreen';
import LoginScreen from './src/Screens/LoginScreen';
import EmployeeLoginScreen from './src/Screens/EmployeeLoginScreen/EmployeeLoginScreen';
import ContactUsScreen from './src/Screens/ContactUsScreen/ContactUsScreen';
import EventDetailsScreen from './src/Screens/EventDetailsScreen/EventDetailsScreen'
import EventSuccessScreens from './src/Screens/EventSuccessScreens/EventSuccessScreens'
import SuccessRewardBonus from './src/Screens/TermRewardsScreen/SuccessRewardBonus'
import TermRewardDetailsScreen from './src/Screens/TermRewardDetailsScreen/TermRewardDetailsScreen'
import DrawerNavigator from './src/navigation/DrawerNavigator';

import { persistor, selectAuth, selectEvents, selectFaq, selectRewards, selectTerms, store } from './src/store';
import { fetchTermCodes, fetchGoalPoints } from './src/store/slices/termSlice';
import { fetchUpcomingEvents, fetchEventsByTerm } from './src/store/slices/eventsSlice';
import { fetchFaqs } from './src/store/slices/faqSlice';
import { fetchRewards } from './src/store/slices/rewardsSlice';

const Stack = createStackNavigator(); 

function DataBootstrapper() {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(selectAuth);
  const {
    items: termItems,
    status: termStatus,
    goalPoints,
    goalPointsStatus,
  } = useSelector(selectTerms);
  const {
    items: eventItems,
    upcomingItems,
    status: eventsStatus,
    upcomingStatus,
  } = useSelector(selectEvents);
  const { items: faqItems, status: faqStatus } = useSelector(selectFaq);
  const { terms: rewardsTerms, status: rewardsStatus } =
    useSelector(selectRewards);

  useEffect(() => {
    if (!accessToken) return;

    if (termStatus !== 'loading' && termItems.length === 0) {
      dispatch(fetchTermCodes({ accessToken }));
    }

    if (faqStatus !== 'loading' && faqItems.length === 0) {
      dispatch(fetchFaqs({ accessToken }));
    }

    if (user?.id && upcomingStatus !== 'loading' && upcomingItems.length === 0) {
      dispatch(fetchUpcomingEvents({ accessToken, userId: user.id }));
    }

    if (user?.id && rewardsStatus !== 'loading' && rewardsTerms.length === 0) {
      dispatch(fetchRewards({ accessToken, userId: user.id }));
    }
  }, [
    accessToken,
    dispatch,
    faqItems.length,
    faqStatus,
    rewardsStatus,
    rewardsTerms.length,
    termItems.length,
    termStatus,
    upcomingItems.length,
    upcomingStatus,
    user?.id,
  ]);

  useEffect(() => {
    if (!accessToken || !user?.id || !Array.isArray(termItems) || termItems.length === 0) {
      return;
    }

    const preferred = termItems.find(term => term?.currentTerm) || termItems[0];
    if (!preferred?.id) return;

    if (eventsStatus !== 'loading' && eventItems.length === 0) {
      dispatch(fetchEventsByTerm({ accessToken, userId: user.id, termId: preferred.id }));
    }

    if (goalPointsStatus !== 'loading' && goalPoints.length === 0) {
      dispatch(fetchGoalPoints({ accessToken, termCodeId: preferred.id }));
    }
  }, [
    accessToken,
    dispatch,
    eventItems.length,
    eventsStatus,
    goalPoints.length,
    goalPointsStatus,
    termItems,
    user?.id,
  ]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataBootstrapper />
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
            <Stack.Screen name="SuccessRewardBonus" component={SuccessRewardBonus} />
            <Stack.Screen name="TermRewardDetailsScreen" component={TermRewardDetailsScreen} />
            


          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
