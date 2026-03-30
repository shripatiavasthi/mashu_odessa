import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../../store/slices/appSlice';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Entypo';

import OcAllInIcon from '../../assets/Image/svg/OcAllIn.svg';
import Plc from '../../assets/Image/svg/Plc.svg';
import Thirty from '../../assets/Image/svg/Thirty.svg';

const { height, width } = Dimensions.get('screen');

const ChooseRoleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAllIn = () => {
    dispatch(setActiveMenu('OC'));
    navigation.navigate('MainTabs')
  };

  const handlePLC = () => {
    dispatch(setActiveMenu('PLC'));
    navigation.navigate('MainTabs')
  };

  const handleThirty = () => {
    Alert.alert(
      'WorkInProgress!',
      'Working now on 30 login flow, check back soon!'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            
            <Image
              source={require('../../assets/Image/NewLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            
            {/* <Text style={styles.collegeTitle}>ODESSA COLLEGE</Text> */}
          </View>


          <Text style={styles.title}>Select a feature to proceed</Text>


          <TouchableOpacity style={styles.card} onPress={handleAllIn}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <OcAllInIcon width={42} height={42} color={colors.primaryDark} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>OC All-In</Text>
                <Text style={styles.subText}>
                  Please log in to access the employee reward program
                </Text>
              </View>

              <Icon name="chevron-with-circle-right" size={24} color="#666666" />
            </View>
          </TouchableOpacity>

          {/* Professional Learning Center (PLC) Card */}
          <TouchableOpacity style={styles.card} onPress={handlePLC}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Plc width={42} height={42} color={colors.primaryDark} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Professional Learning Center</Text>
                <Text style={styles.subText}>
                  Please log in to access the PLC credits
                </Text>
              </View>

              <Icon name="chevron-with-circle-right" size={24} color="#666666" />
            </View>
          </TouchableOpacity>

          {/* 30 For 30 Fitness Challenge Card */}
          <TouchableOpacity style={styles.card} onPress={handleThirty}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Thirty width={42} height={42} color={colors.primaryDark} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>30 For 30 Fitness Challenge</Text>
                <Text style={styles.subText}>
                  Please log in to access the fitness challenge
                </Text>
              </View>

              <Icon name="chevron-with-circle-right" size={24} color="#666666" />
            </View>
          </TouchableOpacity>
        </View>
      </AppGradient>
    </SafeAreaView>
  );
};

export default ChooseRoleScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    // flex: 1,
    width: width / 1.1,
    alignSelf: 'center'
    // paddingHorizontal: 20,
    // paddingTop: 50,
  },
  logoContainer: {
    height: height / 3.5,
    width: width / 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  collegeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.bold,
    // marginTop: 12,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    textAlign: 'center',
    marginBottom: 35,
  },
  card: {
    backgroundColor: '#F7FBFF',
    borderWidth: 1,
    borderColor: colors.boderLight,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    marginBottom: 6,
  },
  subText: {
    fontSize: 13.5,
    color: '#414651',
    lineHeight: 19,
    fontWeight: '500',
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import AppGradient from '../../components/AppGradient';

// import EmployeeLoginModal from '../../components/EmployeeLoginModal'

// import Icon from 'react-native-vector-icons/Entypo';
// import { colors } from '../../styles/globalStyles';


// const { height, width } = Dimensions.get('screen');

// const ChooseRoleScreen = ({ navigation }) => {

//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);

//   return (
//     <AppGradient style={styles.container}>

//       <EmployeeLoginModal
//         visible={showEmployeeModal}
//         onClose={() => setShowEmployeeModal(false)}
//         onAllIn={() => {
//           setShowEmployeeModal(false);
//           navigation.navigate('EmployeeLoginScreen')
//         }}
//         onPLC={() => {
//           setShowEmployeeModal(false);
//           navigation.navigate('ContactUsScreen')
//           // Alert.alert('WorkInProgess!', 'Working now on PLC login flow, check back soon!')
//         }}
//         onThirty={() => {
//           setShowEmployeeModal(false);
//           // navigation.navigate('ContactUsScreen')
//           Alert.alert('WorkInProgess!', 'Working now on #o for 30 login flow, check back soon!')
//         }}
//       />

//       <View style={styles.imageContainer}>
//         <Image
//           source={require('../../assets/Image/NewLogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={styles.roleContainer}>
//         <Text style={styles.title}>Choose Your Role</Text>
//       </View>

//       <View style={styles.boxContainer}>
//         <TouchableOpacity
//           style={styles.card}
//         // onPress={() => navigation.navigate('StudentLogin')}
//         >
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('../../assets/Image/graduated.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.textBox}>
//             <View style={styles.cardBox}>
//               <Text style={styles.cardTitle}>Student</Text>
//             </View>
//             <View style={styles.cardDescBox}>
//               <Text style={styles.cardDesc}>
//                 Choose this if you actively attend OC as a student
//               </Text>
//             </View>
//           </View>
//           <Icon name="chevron-with-circle-right" size={18} color="#666666" />

//         </TouchableOpacity>
//       </View>


//       <View style={styles.boxContainer}>
//         <TouchableOpacity
//           style={styles.card}

//           onPress={() => setShowEmployeeModal(true)}
//         >
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('../../assets/Image/Group.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//             {/* <Group width={120} height={40} /> */}
//           </View>
//           <View style={styles.textBox}>
//             <View style={styles.cardBox}>
//               <Text style={styles.cardTitle}>Employee</Text>
//             </View>
//             <View style={styles.cardDescBox}>
//               <Text style={styles.cardDesc}>
//                 Choose this if you work for the college
//               </Text>
//             </View>
//           </View>
//           <Icon name="chevron-with-circle-right" size={18} color="#666666" />

//         </TouchableOpacity>
//       </View>


//       <View style={styles.boxContainer}>
//         <TouchableOpacity
//           style={styles.card}
//         // onPress={() => navigation.navigate('CommunityFlow')}
//         >
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('../../assets/Image/network.png')}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.textBox}>
//             <View style={styles.cardBox}>
//               <Text style={styles.cardTitle}>Community</Text>
//             </View>
//             <View style={styles.cardDescBox}>
//               <Text style={styles.cardDesc}>
//                 Choose this if you're not a current student or employee.
//               </Text>
//             </View>
//           </View>
//           <Icon name="chevron-with-circle-right" size={18} color="#666666" />

//         </TouchableOpacity>
//       </View>




//     </AppGradient>
//   );
// };

// export default ChooseRoleScreen;

// const styles = StyleSheet.create({
//   container: {
//     height: height / 1,
//     width: width / 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   imageContainer: {
//     height: height / 3.5,
//     width: width / 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     // backgroundColor: 'yellow',
//   },
//   logo: {
//     width: width * 0.70,
//     height: height * 0.13,
//     alignSelf: 'center',
//   },
//   roleContainer: {
//     height: height / 10,
//     width: width / 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     // backgroundColor: 'green',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#006BB6',
//     lineHeight: 24,
//   },
//   boxContainer: {
//     height: height / 7.5,
//     width: width / 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     // backgroundColor: 'pink',
//   },
//   card: {
//     flexDirection: 'row',
//     // backgroundColor: 'blue',
//     borderRadius: 8,
//     height: height / 9,
//     width: width / 1.1,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.primaryLight,
//   },
//   iconContainer: {
//     width: width * 0.2,
//     height: height / 10,

//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'orange'
//   },
//   icon: {
//     width: width * 0.16,
//     height: height / 20,

//   },
//   textBox: {
//     height: height / 10,
//     width: width / 1.6,
//     // backgroundColor: 'lightblue',
//     // justifyContent: 'center'
//   },

//   cardBox: {
//     height: height / 25,
//     width: width / 1.9,
//     // backgroundColor: 'magenta',
//     justifyContent: 'flex-end',
//     marginBottom: 5
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#414651',
//     fontFamily: 'Open Sans',

//   },
//   cardDescBox: {
//     height: height / 20,
//     width: width / 1.9,
//     // backgroundColor: 'lime',
//     // justifyContent: 'center',

//   },
//   cardDesc: {
//     fontSize: 12,
//     color: '#414651',
//     fontWeight: '600',
//     // marginTop: height * 0.004,
//     lineHeight: 20,
//     fontFamily: 'Open Sans',
//   },
// });


