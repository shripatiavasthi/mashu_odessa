import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const AppHeader = ({ showMenu = true, onMenuPress }) => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      style={styles.header}
    >
      {/* Menu Icon */}
      {showMenu ? (
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={handleMenuPress}
        >
          <Image
            source={require('../assets/Image/Menu.png')}
            resizeMode="contain"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.menuPlaceholder} />
      )}

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Image/Menulogo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </LinearGradient>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  header: {
    height: height / 12,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuContainer: {
    height: height / 12,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuPlaceholder: {
    height: height / 12,
    width: width / 6,
  },

  menuIcon: {
    height: height / 28,
    width: height / 28,
    tintColor: colors.white,
  },

  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'center',
  },

  logo: {
    height: height / 18,
    width: width / 3,
  },
});
