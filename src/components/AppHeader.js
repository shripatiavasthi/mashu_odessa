import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const AppHeader = ({ showMenu = true, onMenuPress }) => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer?.();
    }
  };

  return (
    <LinearGradient
      colors={['#2E6FB6', '#4DA3DA']}
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
    tintColor: '#FFFFFF',
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
