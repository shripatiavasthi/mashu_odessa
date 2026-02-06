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


  const getInitials = () => {
    const first = user?.firstName?.charAt(0) || '';
    const last = user?.lastName?.charAt(0) || '';

    if (first || last) {
      return (first + last).toUpperCase();
    }

    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }

    return 'U';
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
      const message = error?.message || 'Logout failed';
      Alert.alert('Logout Failed', message);
    } finally {
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
            <Text style={styles.avatarText}>
              {getInitials()}
            </Text>
          </View>
          <View style={styles.nameCon}>
            <Text style={styles.nameText}>{fullName}</Text>
          </View>
          <View style={styles.emailCon}></View>
          <Text style={styles.emailText}>{email}</Text>

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

              <Text style={styles.menuLabel}>
                {item.label}
              </Text>
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

            <Text style={styles.menuLabel}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>


        <View style={styles.footer}>
          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
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
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: width * 0.08,
  },
  profileSection: {
    height: height / 7,
    // backgroundColor:'blue',
    justifyContent: 'flex-end'
  },

  avatarContainer: {
    width: 65,
    height: 65,
    borderRadius: 34,
    backgroundColor: 'rgba(231, 207, 209)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1f1f1f',
    borderWidth: 0.5
    // marginBottom: 12,
  },

  avatarText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#4f151d',
  },

  nameCon: {
    height: height / 28,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end'
  },
  nameText: {
    fontSize: typography.size.lg,
    color: colors.white,
    fontFamily: typography.regular,
    fontWeight: '700',
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxHeight: height * 0.4,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deleteOption: {
    borderBottomWidth: 0,
  },
  modalText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  modalCancel: {
    marginTop: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default AppDrawerContent;
