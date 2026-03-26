import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AppGradient from '../../components/AppGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from '../TestingScreenStyles';
import { colors, typography } from '../../styles/globalStyles';
const { height, width } = Dimensions.get('window');


const TestingScreen = () => {
  const [activeTab, setActiveTab] = useState('employee');
  const [loading, setLoading] = useState(false);

  return (
    <AppGradient style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Image/NewLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headSpace}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome</Text>
          </View>
          <View style={styles.subtitleContainers}>
            <Text style={styles.subtitle}>
              Login to stay connected with everything Odessa College, all in one place.
            </Text>
          </View>
        </View>

        <View style={styles.tabWrapperContainer}>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'employee' && {
                  borderBottomWidth: 3,
                  borderBottomColor: colors.primaryDark,
                },
              ]}
              onPress={() => setActiveTab('employee')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'employee' && styles.activeTabText,
                ]}
              >
                Student/Employee
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'public' && {
                  borderBottomWidth: 3,
                  borderBottomColor: colors.primaryDark,
                },
              ]}
              onPress={() => setActiveTab('public')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'public' && styles.activeTabText,
                ]}
              >
                Public User
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'employee' ? (
          <View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                Peace of mind for your digital life
              </Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.description}>
                Secure your account with multi-factor authentication.
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                // onPress={handleLogin}
                disabled={loading}
                style={[
                  styles.microsoftButton,
                  loading && styles.disabledButton,
                ]}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/Image/microsoft.png')}
                  style={styles.microsoftIcon}
                />
                <Text style={styles.microsoftText}>
                  {loading ? 'Logging in...' : 'Log in with Microsoft'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.contentCon}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Sign in with your Odessa College email id
              </Text>
            </View>
            <View style={styles.emailContainer}>

              <Text style={styles.label}>Email ID</Text>
            </View>
            <View style={styles.inputSpace}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Email address"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {/* <Text style={styles.domain}>@odessa.edu</Text> */}
              </View>
            </View>
            <View style={styles.nbtnSpace}>
              <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accCreateContainer}>
              <Text style={styles.infoText}>
                Don’t have an account? 
              </Text>
              <TouchableOpacity>
              <Text
                style={[
                  styles.activeTabText
                ]}
              > Create Account
                </Text>
                </TouchableOpacity>
            </View>

          </View>
        )}
      </SafeAreaView>
    </AppGradient>
  );
};

export default TestingScreen;

const styles = StyleSheet.create({
  container: {
    height: height / 1,
    width: width / 1,
  },

  safeArea: {
    height: height / 1,
    width: width / 1,

  },

  logoContainer: {
    height: height / 3.5,
    width: width / 1,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 2.08,
    height: height / 9.55,
    resizeMode: 'contain',
  },
  headSpace: {
    height: height / 7.5,
    width: width / 1,
    // backgroundColor: 'yellow',
  },
  headerContainer: {
    height: height / 20,
    width: width / 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: 'colors.black',
    fontFamily: typography.bold,
  },
  subtitleContainers: {
    height: height / 14,
    width: width / 1.4,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    alignSelf: 'center',
  },

  subtitle: {
    fontSize: 14,
    lineHeight: '100%',
    textAlign: 'center',
    color: colors.textDark,
    fontFamily: typography.semiBold,
    fontWeight: '600',
  },

  tabWrapperContainer: {
    height: height / 16,
    width: width / 1,
    // alignSelf: 'center',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    width: width / 1.15,
    borderBottomColor: colors.boderLight,
    justifyContent: 'space-between',
  },
  tab: {
    // flex: 1,
    height: height / 16.5,
    width: width / 2.3,
    // paddingVertical: height / 58,
    alignItems: 'center',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',

  },
  tabText: {
    color: colors.textDark,
    fontWeight: '400',
    fontFamily: typography.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  activeTabText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontFamily: typography.bold,
    fontSize: 14,
    lineHeight: 20,
  },

  contentCon: {
    height: height / 3,
    width: width / 1,
    // alignSelf: 'center',
    // backgroundColor: 'cyan',
    // justifyContent: 'center',
    // alignItems: 'center',
  },



  infoContainer: {
    height: height / 18,
    width: width / 1.15,
    // backgroundColor: 'pink',
    justifyContent: 'flex-end',
    alignSelf: 'center'

  },
  infoText: {
    fontFamily: typography.regular,
    fontWeight: '400',
    fontSize: 14,
    color: colors.textDark,
    lineHeight: '100%'
  },
  emailContainer: {
    height: height / 20,
    width: width / 1.15,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    alignSelf: 'center'

  },
  label: {
    fontFamily: typography.semiBold,
    fontWeight: '600',
    fontSize: 14,
    color: colors.textDark,
    lineHeight: '100%'
  },
  inputSpace: {
    height: height / 18,
    width: width / 1,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end'
  },
  inputBox: {
    // height: height/10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: height / 20,
    width: width / 1.15,
    // paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  input: {
    height: height / 16,
    width: width / 1.2,
    fontFamily: typography.semiBold,
    fontSize: 16,
    lineHeight: 14,
    // backgroundColor: 'blue'
    // alignSelf: 'center'
    // fontWeight: '400'
  },
  domain: {
    fontSize: height / 49.2,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: 'Open Sans',
  },

  nbtnSpace: {
    height: height / 11,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  nextButton: {
    backgroundColor: colors.primaryDark,
    height: height / 20,
    width: width / 1.15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: height / 67.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nextText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: typography.semiBold,
    lineHeight: 24,
    letterSpacing: 1
  },
accCreateContainer: {
    height: height / 16,
    width: width / 1.18,
    // backgroundColor: 'pink',
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
    flexDirection: 'row'

  },
  subtitleContainer: {
    height: height / 16,
    alignItems: 'center',
    width: width / 1.5,
    alignSelf: 'center',
    justifyContent: 'flex-end',

  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#414651',
    fontWeight: '600',

  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: height * 0.01,
    lineHeight: height * 0.026,
    fontFamily: 'OpenSans-Regular',
  },
  buttonContainer: {
    height: height / 8.5,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  microsoftButton: {
    height: height / 17,
    width: width / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    // paddingVertical: height * 0.02,
  },
  disabledButton: {
    backgroundColor: colors.primaryDark,
  },
  microsoftText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    paddingHorizontal: 10
    // textAlign: 'center'
  },
  microsoftIcon: {
    width: 20,
    height: 20,
    // marginRight: 10,
  },


});


// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
//   StatusBar,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

// const ContactUsScreen = () => {
//   const navigation = useNavigation();

//   const callNumber = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   const sendEmail = (email) => {
//     Linking.openURL(`mailto:${email}`);
//   };

//   const ListItem = ({ title, phone, email }) => (
//     <TouchableOpacity
//       style={styles.listItem}
//       onPress={() => {
//         if (phone) callNumber(phone);
//         if (email) sendEmail(email);
//       }}
//       activeOpacity={0.7}
//     >
//       <Text style={styles.itemText}>{title}</Text>
//       <View style={styles.iconContainer}>
//         {phone && (
//           <Image
//             source={require('../../assets/Image/Phone.png')}
//             style={styles.phoneIcon}
//             resizeMode="contain"
//           />
//         )}
//         {email && (
//           <Image
//             source={require('../../assets/Image/Mail.png')}
//             style={styles.emailIcon}
//             resizeMode="contain"
//           />
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#007ACC" />

//       <View style={styles.header}>
//         <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
//           <Image
//           resizeMode="contain"
//             source={require('../../assets/Image/Menu.png')}
//             style={styles.menuIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Contact Us</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       <ScrollView
//         style={styles.scrollContainer}
//         contentContainerStyle={styles.contentContainer}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.sectionTitle}>Campus</Text>
//         <ListItem title="Main Line" phone="432-335-6400" />
//         <ListItem title="Campus Police" phone="432-335-6666" />
//         <ListItem title="Human Resources" phone="432-335-6850" />
//         <ListItem title="Maintenance" phone="432-335-6220" />
//         <ListItem title="After-Hours Maintenance" phone="432-335-6666" />
//         <ListItem title="Sports Center" phone="432-335-6300" />

//         <Text style={styles.sectionTitle}>Student Services</Text>
//         <ListItem title="Bookstore" phone="432-335-6640" />
//         <ListItem title="Wrangler Express" phone="432-335-6200" />
//         <ListItem title="Wrangler Express" email="wranglerexpress@odessa.edu" />
//         <ListItem title="Housing" phone="432-335-6500" />
//         <ListItem title="Learning Resources Center" phone="432-335-6510" />
//         <ListItem title="Testing Center" phone="432-335-6620" />
//         <ListItem title="Continuing Education" phone="432-335-6580" />
//         <ListItem title="Cafeteria" phone="432-335-6300" />

//         <Text style={styles.sectionTitle}>Helpdesk Support</Text>
//         <ListItem title="IT Helpdesk" phone="432-335-6800" />
//         <ListItem title="Residence Hall Helpdesk" phone="432-335-6500" />

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ContactUsScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F5F9FF',
//   },
//   header: {
//     height: 60,
//     backgroundColor: '#006BB6',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     // paddingHorizontal: 15,
//   },
//   menuButton: {
//     width: width / 8,
//     height: height * 0.06,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'blue',
//   },
//   menuIcon: {
//     width: 28,
//     height: 28,
//     tintColor: '#FFFFFF',
//     // paddingHorizontal: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     flex: 1,
//     // textAlign: 'center',
//     marginRight: -40,
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#007ACC',
//     marginTop: 25,
//     marginBottom: 15,
//   },
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 18,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#414651',
//     flex: 1,
//     fontWeight: '600',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   phoneIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#007ACC',
//     marginLeft: 15,
//   },
//   emailIcon: {
//     width: 26,
//     height: 26,
//     tintColor: '#007ACC',
//   },
// });