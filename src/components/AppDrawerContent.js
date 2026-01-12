import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, typography} from '../styles/globalStyles';

const {height, width} = Dimensions.get('window');

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
  },
  {
    label: 'Upcoming Events',
    icon: require('../assets/Image/Icons/EventOn.png'),
    tab: 'Events',
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

const AppDrawerContent = ({navigation}) => {
  const handleNavigate = tab => {
    navigation.navigate('Home', {screen: tab});
  };

  const handleLogout = () => {
    navigation.getParent?.()?.navigate('ChooseRoleScreen');
  };

  return (
    <LinearGradient colors={[colors.primary, colors.primaryLight]} style={styles.fill}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/Image/Profile.png')}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>Michaela Johnson</Text>
          <Text style={styles.emailText}>michaela@odessa.edu</Text>
        </View>

        <View style={styles.menuSection}>
          {drawerItems.map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.tab)}
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Image
              source={require('../assets/Image/back.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppDrawerContent;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: width * 0.08,
  },
  profileSection: {
    paddingTop: height * 0.05,
    paddingBottom: height * 0.04,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 12,
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
    marginTop: 4,
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
    width: 22,
    height: 22,
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
