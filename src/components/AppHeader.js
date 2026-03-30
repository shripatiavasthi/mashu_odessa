import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/globalStyles';

import EmployeeLoginModal from '../components/EmployeeLoginModal';
import { setActiveMenu } from '../store/slices/appSlice';
import { useSelector, useDispatch } from 'react-redux';

const { height, width } = Dimensions.get('window');

const AppHeader = () => {
  const navigation = useNavigation();
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const dispatch = useDispatch();
  const activeMenu = useSelector(state => state.app.activeMenu);

  //  const currentDrawerItems = activeMenu === 'OC' ? ocDrawerItems : plcDrawerItems;
  // const currentMenuTitle = activeMenu === 'OC' ? 'OC All-In' : 'Professional Learning Center';


  const handleHomePress = () => {
    navigation.navigate('ChooseRoleScreen')
    // setShowEmployeeModal(true);

  };


  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={handleHomePress}
        >
          <Image
            source={require('../assets/Image/Icons/Home.png')}
            resizeMode="contain"
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        {/* Odessa College Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Image/NewLogo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        <View style={styles.rightPlaceholder} />
      </LinearGradient>

      <EmployeeLoginModal
        visible={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onAllIn={() => {
          setShowEmployeeModal(false);
          dispatch(setActiveMenu('OC'));
        }}
        onPLC={() => {
          setShowEmployeeModal(false);
          dispatch(setActiveMenu('PLC'));
        }}
        onThirty={() => {
          setShowEmployeeModal(false);
          Alert.alert('WorkInProgress!', 'Working now on 30 login flow, check back soon!');
        }}
      />


    </>
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
    height: height / 18,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'center',
    // backgroundColor: 'cyan'
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: colors.white
  },
});

// import React from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/native';
// import {colors} from '../styles/globalStyles';

// const { height, width } = Dimensions.get('window');

// const AppHeader = ({ showMenu = true, onMenuPress }) => {
//   const navigation = useNavigation();

//   const handleMenuPress = () => {
//     if (onMenuPress) {
//       onMenuPress();
//     } else {
//       navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
//     }
//   };

//   return (
//     <LinearGradient
//       colors={[colors.primary, colors.primaryLight]}
//       style={styles.header}
//     >
//       {showMenu ? (
//         <TouchableOpacity
//           style={styles.menuContainer}
//           onPress={handleMenuPress}
//         >
//           <Image
//             source={require('../assets/Image/Menu.png')}
//             resizeMode="contain"
//             style={styles.menuIcon}
//           />
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.menuPlaceholder} />
//       )}

//       {/* Logo */}
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assets/Image/NewLogo.png')}
//           resizeMode='contain'
//           style={styles.logo}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// export default AppHeader;
// const styles = StyleSheet.create({
//   header: {
//     height: height / 12,
//     width: width,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuContainer: {
//     height: height / 18,
//     width: width / 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoContainer: {
//     height: height / 12,
//     width: width / 1.3,
//     justifyContent: 'center',
//   },
//   menuIcon: {
//     width: 30,
//     height: 30,
//     tintColor: colors.white,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//     tintColor: colors.white
//   },
// });
