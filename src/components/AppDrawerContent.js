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

import { colors, typography } from '../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../store';
import { logoutWithAccessToken, clearAuth } from '../store/slices/authSlice';
import { clearAuthSession } from '../services/authService';

import LogoutModal from './LogoutModal';

const { height, width } = Dimensions.get('window');

const drawerItems = [
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

const AppDrawerContent = ({ navigation }) => {

  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
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

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      style={styles.fill}
    >
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

        <View style={styles.menuSection}>
          {drawerItems.map(item => (
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
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    height: height / 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  safeArea: {
    height: height / 1,
    width: width / 1.5,
  },
  profileSection: {
    height: height / 6,
    justifyContent: 'flex-end',
  },

  // Outer wrapper (keeps position consistent whether photo or initials)
  avatarContainer: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },

  // Initials fallback circle
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

  // Photo
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
  emailCon: {},
  emailText: {
    fontSize: typography.size.sm,
    color: colors.white,
    opacity: 0.9,
    fontFamily: typography.regular,
  },
  menuSection: {
    marginTop: height * 0.01,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.018,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
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
  },
  versionText: {
    color: colors.white,
    fontFamily: typography.regular,
    fontSize: typography.size.sm,
    opacity: 0.9,
  },
});

export default AppDrawerContent;