// src/Screens/EmployeeLoginScreen/EmployeeLoginScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import AppGradient from '../../components/AppGradient';
import { authorize } from 'react-native-app-auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { env } from '../../env';
import { loginWithIdToken, setAuthData } from '../../store/slices/authSlice';
import { colors } from '../../styles/globalStyles';
import { saveAuthSession } from '../../services/authService';

const config = {
  clientId: env.azure.clientId,
  redirectUrl:
    Platform.OS === 'ios'
      ? env.azure.redirectUrl.ios
      : env.azure.redirectUrl.android,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  additionalParameters: {},
  additionalHeaders: {},
  iosCustomBrowser: 'safari',
  prefersEphemeralSession: false,
  usePKCE: true,
  useNonce: true,
  serviceConfiguration: {
    authorizationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/token`,
  },
};

const { height, width } = Dimensions.get('screen');

const fetchMicrosoftPhoto = async (accessToken) => {
  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Graph API failed: ${response.status}`);

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Failed to fetch Microsoft profile photo:', error);
    return null;
  }
};

const EmployeeLoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('RNAppAuth config (screen mount):', {
      clientId: config.clientId,
      redirectUrl: config.redirectUrl,
      scopes: config.scopes,
      authorizationEndpoint: config.serviceConfiguration?.authorizationEndpoint,
      tokenEndpoint: config.serviceConfiguration?.tokenEndpoint,
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await authorize(config);

      console.log('===== AUTH RESULT =====');
      console.log('Access Token:', result.accessToken);
      console.log('ID Token:', result.idToken);
      console.log('Refresh Token:', result.refreshToken);
      console.log('Token Expiry:', result.accessTokenExpirationDate);

      const photoUrl = await fetchMicrosoftPhoto(result.accessToken);
      console.log('Microsoft Photo fetched:', photoUrl ? 'YES' : 'NO');

      // Send MS ID token to your backend → get back your backend JWT
      const loginResponse = await dispatch(
        loginWithIdToken({ idToken: result.idToken }),
      ).unwrap();

      const userData = loginResponse?.data || {};

      const userWithPhoto = {
        ...userData,
        photoUrl: photoUrl || userData.photoUrl || userData.profilePicture || null,
      };

      // ── 1. Update Redux in-memory state ──────────────────────────────────
      dispatch(
        setAuthData({
          accessToken: userData.accessToken,       // your backend token
          msAccessToken: result.accessToken,        // MS token (for Graph API calls)
          msRefreshToken: result.refreshToken,      // MS refresh token (for silent refresh)
          msTokenExpiry: result.accessTokenExpirationDate, // expiry date string
          user: userWithPhoto,
        }),
      );

      // ── 2. Persist session to AsyncStorage ───────────────────────────────
      await saveAuthSession({
        msAccessToken: result.accessToken,
        msRefreshToken: result.refreshToken,
        msTokenExpiry: result.accessTokenExpirationDate,
        backendAccessToken: userData.accessToken,
        user: userWithPhoto,
      });

      // ── 3. Navigate ───────────────────────────────────────────────────────
      navigation.navigate('MainTabs', {
        user: {
          id: userWithPhoto.id,
          email: userWithPhoto.email,
          firstName: userWithPhoto.firstName,
          lastName: userWithPhoto.lastName,
          userType: userWithPhoto.userType,
          role: userWithPhoto.role,
          isActive: userWithPhoto.isActive,
          photoUrl: userWithPhoto.photoUrl,
        },
        accessToken: userData.accessToken,
      });
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppGradient style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={require('../../assets/Image/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Employee</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Image/NewLogo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.loginTitle}>Log In</Text>
        </View>
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
            onPress={handleLogin}
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
      </SafeAreaView>
    </AppGradient>
  );
};

export default EmployeeLoginScreen;

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     Dimensions,
//     Alert,
//     Platform,
// } from 'react-native';
// import AppGradient from '../../components/AppGradient';
// import { authorize } from 'react-native-app-auth';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';
// import { env } from '../../env';
// import { loginWithIdToken, setAuthData } from '../../store/slices/authSlice';
// import { colors } from '../../styles/globalStyles';

// const config = {
//     clientId: env.azure.clientId,
//     redirectUrl:
//         Platform.OS === 'ios'
//             ? env.azure.redirectUrl.ios
//             : env.azure.redirectUrl.android,
//     scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
//     additionalParameters: {},
//     additionalHeaders: {},
//     iosCustomBrowser: 'safari',
//     prefersEphemeralSession: false,
//     usePKCE: true,
//     useNonce: true,
//     serviceConfiguration: {
//         authorizationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/authorize`,
//         tokenEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/token`,
//     },
// };

// const { height, width } = Dimensions.get('screen');

// const fetchMicrosoftPhoto = async (accessToken) => {
//     try {
//         const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         if (response.status === 404) return null; 
//         if (!response.ok) throw new Error(`Graph API failed: ${response.status}`);

//         const blob = await response.blob();

//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result); 
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         });
//     } catch (error) {
//         console.warn('Failed to fetch Microsoft profile photo:', error);
//         return null;
//     }
// };

// const EmployeeLoginScreen = ({ navigation }) => {
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         console.log('RNAppAuth config (screen mount):', {
//             clientId: config.clientId,
//             redirectUrl: config.redirectUrl,
//             scopes: config.scopes,
//             authorizationEndpoint: config.serviceConfiguration?.authorizationEndpoint,
//             tokenEndpoint: config.serviceConfiguration?.tokenEndpoint,
//         });
//     }, []);

//     const handleLogin = async () => {
//         setLoading(true);
//         try {
//             const result = await authorize(config);

//             console.log('===== AUTH RESULT =====');
//             console.log('Access Token:', result.accessToken);
//             console.log('ID Token:', result.idToken);
//             console.log("Refresh Token", result.refreshToken)

//             const photoUrl = await fetchMicrosoftPhoto(result.accessToken);
//             console.log('Microsoft Photo fetched:', photoUrl ? 'YES' : 'NO');

//             const loginResponse = await dispatch(
//                 loginWithIdToken({ idToken: result.idToken })
//             ).unwrap();

//             const userData = loginResponse?.data || {};

            
//             const userWithPhoto = {
//                 ...userData,
//                 photoUrl: photoUrl || userData.photoUrl || userData.profilePicture || null,
//             };

//             dispatch(
//                 setAuthData({
//                     accessToken: userData.accessToken,
//                     user: userWithPhoto,
                    
//                 })
//             );

//             navigation.navigate('MainTabs', {
//                 user: {
//                     id: userWithPhoto.id,
//                     email: userWithPhoto.email,
//                     firstName: userWithPhoto.firstName,
//                     lastName: userWithPhoto.lastName,
//                     userType: userWithPhoto.userType,
//                     role: userWithPhoto.role,
//                     isActive: userWithPhoto.isActive,
//                     photoUrl: userWithPhoto.photoUrl,
                    
//                 },
//                 accessToken: userData.accessToken,
//             });
//         } catch (error) {
//             console.error('Login Error:', error);
//             Alert.alert('Login Failed', error.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <AppGradient style={styles.container}>
//             <SafeAreaView>
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Image
//                             resizeMode="contain"
//                             source={require('../../assets/Image/back.png')}
//                             style={styles.backIcon}
//                         />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Employee</Text>
//                 </View>

//                 <View style={styles.logoContainer}>
//                     <Image
//                         source={require('../../assets/Image/NewLogo.png')}
//                         resizeMode="contain"
//                         style={styles.logo}
//                     />
//                 </View>
//                 <View style={styles.titleContainer}>
//                     <Text style={styles.loginTitle}>Log In</Text>
//                 </View>
//                 <View style={styles.subtitleContainer}>
//                     <Text style={styles.subtitle}>
//                         Peace of mind for your digital life
//                     </Text>
//                 </View>
//                 <View style={styles.subtitleContainer}>
//                     <Text style={styles.description}>
//                         Secure your account with multi-factor authentication.
//                     </Text>
//                 </View>

//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         onPress={handleLogin}
//                         disabled={loading}
//                         style={[
//                             styles.microsoftButton,
//                             loading && styles.disabledButton,
//                         ]}>
//                         <Image
//                             resizeMode="contain"
//                             source={require('../../assets/Image/microsoft.png')}
//                             style={styles.microsoftIcon}
//                         />
//                         <Text style={styles.microsoftText}>
//                             {loading ? 'Logging in...' : 'Log in with Microsoft'}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         </AppGradient>
//     );
// };

// export default EmployeeLoginScreen;

const styles = StyleSheet.create({
    container: {
        height: height / 1,
        width: width / 1,
    },
    header: {
        height: height / 15,
        width: width / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    backIcon: {
        width: width * 0.05,
        height: height * 0.04,
        tintColor: colors.primaryDark,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primaryDark,
        // marginLeft: width * 0.03,
        paddingHorizontal: 10
    },
    logoContainer:{
         height: height / 4,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width * 0.70,
        height: height * 0.18,
        alignSelf: 'center',
    },
    titleContainer: {
        alignItems: 'center'
    },
    loginTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
        color: '#1E63B5',
        fontFamily: 'OpenSans-Bold',


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
        height: height / 16,
        width: width / 1.25,
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
