import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setActiveMenu } from '../store/slices/appSlice';
import Plc from '../assets/Image/svg/Plc.svg'
import { colors, typography } from '../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../store';
import { logoutWithAccessToken, clearAuth } from '../store/slices/authSlice';
import { clearAuthSession } from '../services/authService';
// import { useNavigation } from '@react-navigation/native';
import EmployeeLoginModal from '../components/EmployeeLoginModal';

import LogoutModal from './LogoutModal';

const { height, width } = Dimensions.get('window');

const ocDrawerItems = [
  {
    label: 'Check-In',
    icon: require('../assets/Image/Icons/CheckInOn.png'),
    tab: 'CheckIn',
  },
  {
    label: 'My Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'MY_EVENTS',
  },
  {
    label: 'Upcoming Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'UPCOMING_EVENTS',
  },
  {
    label: 'Rewards',
    icon: require('../assets/Image/Icons/RewardOn.png'),
    tab: 'Rewards',
  },
  {
    label: "FAQ's",
    icon: require('../assets/Image/Icons/FaqOn.png'),
    tab: 'Faq',
  },
];

const plcDrawerItems = [
  {
    label: 'Check-In',
    icon: require('../assets/Image/Icons/CheckInOn.png'),
    tab: 'CheckIn',
  },
  {
    label: 'My Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'MY_EVENTS',
  },
  {
    label: 'Upcoming Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
    initialTab: 'UPCOMING_EVENTS',
  },
  {
    label: 'Progress',
    icon: require('../assets/Image/Icons/ProgressBlack.png'),
    tab: 'Progress',
  },
  {
    label: 'Team',
    icon: require('../assets/Image/Icons/TeamBlack.png'),
    tab: 'Team',
  },
  {
    label: 'Policy',
    icon: require('../assets/Image/Icons/Policy.png'),
    tab: 'Policy',
  },
];

const AppDrawerContent = ({ navigation }) => {
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
  const activeMenu = useSelector(state => state.app.activeMenu);

  const { user, accessToken } = useSelector(selectAuth);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.displayName ||
    'Employee';

  const email = user?.email || '';

  const getProfileDisplay = () => {
    const photoUrl = user?.photoUrl || user?.profilePicture || user?.avatar || user?.picture;

    if (photoUrl) {
      return (
        <Image
          source={{ uri: photoUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
      );
    }

    const first = (user?.firstName || '').charAt(0).toUpperCase();
    const last = (user?.lastName || '').charAt(0).toUpperCase();
    const initials = first + last || 'U';

    return (
      <View style={styles.avatarInitials}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    );
  };



  const handleNavigate = (tab, initialTab) => {
    navigation.closeDrawer();

    if (tab === 'Policy') {
      navigation.navigate('PolicyScreen');
      return;
    }

    if (tab === 'Progress') {
      navigation.navigate('Home', {
        screen: 'Progress',
      });
      return;
    }

    if (tab === 'Team') {
      navigation.navigate('Home', {
        screen: 'Team',
      });
      return;
    }

    const resolvedInitialTab =
      tab === 'Events' && !initialTab ? 'MY_EVENTS' : initialTab;

    navigation.navigate('Home', {
      screen: tab,
      params: { initialTab: resolvedInitialTab },
    });
  };


  const handleLogout = () => {
    setShowLogout(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogout(false);
    try {
      if (accessToken) {
        await dispatch(logoutWithAccessToken({ accessToken })).unwrap();
      }
    } catch (error) {
      console.warn('[Logout] Backend logout failed:', error?.message);
    } finally {
      await clearAuthSession();
      dispatch(clearAuth());
      // navigation.getParent?.()?.navigate('LoginScreen');
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  };

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const currentDrawerItems = activeMenu === 'oc' ? ocDrawerItems : plcDrawerItems;
  const currentMenuTitle = activeMenu === 'oc' ? 'OC All-In' : 'Professional Learning Center';

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      style={styles.fill}
    >
      <EmployeeLoginModal
        visible={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onAllIn={() => {
          setShowEmployeeModal(false);
          // setActiveMenu('OC');
          dispatch(setActiveMenu('oc'));
          navigation.closeDrawer();
        }}
        onPLC={() => {
          setShowEmployeeModal(false);
          dispatch(setActiveMenu('plc'));
          navigation.closeDrawer();
        }}
        onThirty={() => {
          setShowEmployeeModal(false);
          // navigation.navigate('ContactUsScreen')
          navigation.closeDrawer();
          Alert.alert('WorkInProgess!', 'Working now on #o for 30 login flow, check back soon!')
        }}
      />

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {getProfileDisplay()}
          </View>
          <View style={styles.nameCon}>
            <Text style={styles.nameText}>{fullName}</Text>
          </View>
          <View style={styles.emailCon}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>


        <View style={styles.switchHeaderContainer}>
          <View style={styles.switchIconContainer}>
          {/* <Plc height= '30' width= '30'  /> */}
            <Image
              source={require('../assets/Image/Icons/PlcIcon.png')}
              style={styles.switchIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.switchHeaderLeft}>
            <Text style={styles.switchHeaderText} numberOfLines={1}>
              {currentMenuTitle}
            </Text>
          </View>
          {/* <TouchableOpacity
            // onPress={() => setActiveMenu(activeMenu === 'OC' ? 'PLC' : 'OC')}
            onPress={() => setShowEmployeeModal(true)}
            style={styles.switchIconContainer}>

            <Image
              source={require('../assets/Image/Switch.png')}
              style={styles.switchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.divider} />

        <View style={styles.menuSection}>
          {currentDrawerItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.tab, item.initialTab)}
            >
              <Image
                source={item.icon}
                style={styles.menuIcon}
                resizeMode="contain"
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Image
              source={require('../assets/Image/Logout.png')}
              style={styles.menuIcon}
              resizeMode="contain"
            />
            <Text style={styles.menuLabel}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version - 1.0.0</Text>
        </View>

        <LogoutModal
          visible={showLogout}
          onCancel={() => setShowLogout(false)}
          onConfirm={handleConfirmLogout}
        />

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  profileSection: {
    paddingTop: height * 0.04,
    paddingBottom: height * 0.03,
    justifyContent: 'flex-start',
    width: width / 1.5,
    alignSelf: 'center',
  },
  avatarContainer: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  avatarInitials: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1f1f1f',
    borderWidth: 1,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  nameCon: {
    height: height / 28,
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: typography.size.lg,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '700',
  },
  emailCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emailText: {
    fontSize: typography.size.sm,
    color: colors.white,
    opacity: 0.9,
    fontFamily: typography.regular,
  },


  switchHeaderContainer: {
    // width: width/4,
    height: height / 18,
    // backgroundColor: 'pink',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderBottomWidth: 0.5,
    // borderColor: colors.lightBlue
  },
  switchHeaderLeft: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: width / 1.9,
    height: height / 18,
    // backgroundColor: 'cyan'
  },
  switchHeaderText: {
    fontSize: typography.size.sm,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '700',

    lineHeight: 16
  },
  switchIconContainer: {
     width: width/7,
    height: height / 18,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
    
  },
  divider: {
    width: width / 1.5,
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
  },


  menuSection: {
    marginTop: height * 0.01,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.018,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    width: width / 1.5,
    alignSelf: 'center',
  },
  menuIcon: {
    width: 21,
    height: 21,
    tintColor: colors.white,
    marginRight: 16,
  },
  menuLabel: {
    fontSize: typography.size.md,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: height * 0.04,
    width: width / 1.5,
    alignSelf: 'center',
  },
  versionText: {
    color: colors.white,
    fontFamily: typography.regular,
    fontSize: typography.size.sm,
    opacity: 0.9,
  },
});

export default AppDrawerContent;
