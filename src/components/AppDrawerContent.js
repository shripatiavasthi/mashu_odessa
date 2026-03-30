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

import { colors, typography } from '../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../store';
import { logoutWithAccessToken, clearAuth } from '../store/slices/authSlice';
import { clearAuthSession } from '../services/authService';
import ProgramSelectionModal from '../common/components/ProgramSelectionModal';
import {
  EMPLOYEE_PROGRAMS,
  PROGRAM_KEYS,
} from '../common/constants/programs';

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
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Progress',
  },
  {
    label: 'Team',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Team',
  },
  {
    label: 'Policy',
    icon: require('../assets/Image/Icons/EventOn.png'),
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

  // const handleNavigate = (tab, initialTab) => {
  //   const resolvedInitialTab =
  //     tab === 'Events' && !initialTab ? 'MY_EVENTS' : initialTab;

  //   navigation.navigate('Home', {
  //     screen: tab,
  //     params: { initialTab: resolvedInitialTab },
  //   });
  // };

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
      navigation.getParent?.()?.navigate('ChooseRoleScreen');
    }
  };

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const currentDrawerItems = activeMenu === 'OC' ? ocDrawerItems : plcDrawerItems;
  const currentMenuTitle = activeMenu === 'OC' ? 'OC All-In' : 'Professional Learning Center';

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      style={styles.fill}
    >
      <ProgramSelectionModal
        visible={showEmployeeModal}
        programs={EMPLOYEE_PROGRAMS}
        onClose={() => setShowEmployeeModal(false)}
        onSelect={programKey => {
          setShowEmployeeModal(false);
          if (programKey === PROGRAM_KEYS.OC_ALL_IN) {
            dispatch(setActiveMenu('OC'));
            navigation.closeDrawer();
            return;
          }

          if (programKey === PROGRAM_KEYS.PROFESSIONAL_LEARNING_CENTER) {
            dispatch(setActiveMenu('PLC'));
            navigation.closeDrawer();
            return;
          }

          navigation.closeDrawer();
          Alert.alert(
            'WorkInProgess!',
            'Working now on fitness challenge login flow, check back soon!',
          );
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
          <View style={styles.switchHeaderLeft}>
            <Text style={styles.switchHeaderText} numberOfLines={1}>
              {currentMenuTitle}
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => setActiveMenu(activeMenu === 'OC' ? 'PLC' : 'OC')}
            onPress={() => setShowEmployeeModal(true)}
            style={styles.switchIconContainer}>

            <Image
              source={require('../assets/Image/Switch.png')}
              style={styles.switchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
    paddingBottom: height * 0.015,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 1.5,
    alignSelf: 'center',
    paddingVertical: 10,
    // marginTop: 10,
  },
  switchHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchHeaderText: {
    fontSize: typography.size.sm,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '700',
    paddingRight: 10,
  },
  switchIconContainer: {
    // padding: 5,
  },
  switchIcon: {
    width: 25,
    height: 25,
    tintColor: colors.white,
  },
  divider: {
    width: width / 1.5,
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
  },
  // -------------------------------

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
