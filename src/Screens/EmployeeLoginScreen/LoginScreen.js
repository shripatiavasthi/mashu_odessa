import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Alert,
    Platform,
} from 'react-native';
import AppGradient from '../../components/AppGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authorize } from 'react-native-app-auth';
import { useDispatch } from 'react-redux';
import { env } from '../../env';
import { loginWithIdToken, setAuthData } from '../../store/slices/authSlice';
import { colors, typography } from '../../styles/globalStyles';
import { saveAuthSession } from '../../services/authService';

const { height, width } = Dimensions.get('window');

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

const fetchMicrosoftPhoto = async accessToken => {
    try {
        const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
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

const LoginScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('employee');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('RNAppAuth config:', {
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

            const loginResponse = await dispatch(
                loginWithIdToken({ idToken: result.idToken }),
            ).unwrap();

            const userData = loginResponse?.data || {};

            const userWithPhoto = {
                ...userData,
                photoUrl: photoUrl || userData.photoUrl || userData.profilePicture || null,
            };

            dispatch(
                setAuthData({
                    accessToken: userData.accessToken,
                    msAccessToken: result.accessToken,
                    msRefreshToken: result.refreshToken,
                    msTokenExpiry: result.accessTokenExpirationDate,
                    user: userWithPhoto,
                }),
            );

            await saveAuthSession({
                msAccessToken: result.accessToken,
                msRefreshToken: result.refreshToken,
                msTokenExpiry: result.accessTokenExpirationDate,
                backendAccessToken: userData.accessToken,
                user: userWithPhoto,
            });

            navigation.navigate('ChooseRoleScreen', {
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
                                activeTab === 'employee' && styles.activeTabBorder,
                            ]}
                            onPress={() => setActiveTab('employee')}>
                            <Text style={[styles.tabText, activeTab === 'employee' && styles.activeTabText]}>
                                Student/Employee
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'public' && styles.activeTabBorder,
                            ]}
                            onPress={() => setActiveTab('public')}>
                            <Text style={[styles.tabText, activeTab === 'public' && styles.activeTabText]}>
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
                            </View>
                        </View>
                        <View style={styles.nbtnSpace}>
                            <TouchableOpacity style={styles.nextButton}>
                                <Text style={styles.nextText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.accCreateContainer}>
                            <Text style={styles.infoText}>Don't have an account?</Text>
                            <TouchableOpacity>
                                <Text style={styles.activeTabText}> Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </SafeAreaView>
        </AppGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
    },
    safeArea: {
        height: height,
        width: width,
    },
    logoContainer: {
        height: height / 3.5,
        width: width,
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
        width: width,
    },
    headerContainer: {
        height: height / 20,
        width: width,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '700',
        color: colors.textDark,
        fontFamily: typography.bold,
    },
    subtitleContainers: {
        height: height / 14,
        width: width / 1.4,
        alignItems: 'center',
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.textDark,
        fontFamily: typography.semiBold,
        fontWeight: '600',
    },
    tabWrapperContainer: {
        height: height / 16,
        width: width,
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
        height: height / 16.5,
        width: width / 2.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabBorder: {
        borderBottomWidth: 3,
        borderBottomColor: colors.primaryDark,
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
    subtitleContainer: {
        height: height / 16,
        alignItems: 'center',
        width: width / 1.5,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        color: '#4A4A4A',
        lineHeight: height * 0.026,
        fontFamily: typography.regular,
    },
    buttonContainer: {
        height: height / 8.5,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    microsoftButton: {
        height: height / 17,
        width: width / 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryDark,
        borderRadius: 12,
    },
    disabledButton: {
        backgroundColor: colors.primaryDark,
        opacity: 0.7,
    },
    microsoftText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        paddingHorizontal: 10,
    },
    microsoftIcon: {
        width: 20,
        height: 20,
    },
    contentCon: {
        height: height / 3,
        width: width,
    },
    infoContainer: {
        height: height / 18,
        width: width / 1.15,
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    infoText: {
        fontFamily: typography.regular,
        fontWeight: '400',
        fontSize: 14,
        color: colors.textDark,
    },
    emailContainer: {
        height: height / 20,
        width: width / 1.15,
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    label: {
        fontFamily: typography.semiBold,
        fontWeight: '600',
        fontSize: 14,
        color: colors.textDark,
    },
    inputSpace: {
        height: height / 18,
        width: width,
        justifyContent: 'flex-end',
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        height: height / 20,
        width: width / 1.15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    input: {
        height: height / 16,
        width: width / 1.2,
        fontFamily: typography.semiBold,
        fontSize: 16,
    },
    nbtnSpace: {
        height: height / 11,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: colors.primaryDark,
        height: height / 20,
        width: width / 1.15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
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
        letterSpacing: 1,
    },
    accCreateContainer: {
        height: height / 16,
        width: width / 1.18,
        alignItems: 'flex-end',
        alignSelf: 'center',
        flexDirection: 'row',
    },
});

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   Platform,
// } from 'react-native';
// import AppGradient from '../../components/AppGradient';
// import { authorize } from 'react-native-app-auth';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';
// import { env } from '../../env';
// import { loginWithIdToken, setAuthData } from '../../store/slices/authSlice';
// import { colors } from '../../styles/globalStyles';
// import { saveAuthSession } from '../../services/authService';

// const config = {
//   clientId: env.azure.clientId,
//   redirectUrl:
//     Platform.OS === 'ios'
//       ? env.azure.redirectUrl.ios
//       : env.azure.redirectUrl.android,
//   scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
//   additionalParameters: {},
//   additionalHeaders: {},
//   iosCustomBrowser: 'safari',
//   prefersEphemeralSession: false,
//   usePKCE: true,
//   useNonce: true,
//   serviceConfiguration: {
//     authorizationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/authorize`,
//     tokenEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/token`,
//   },
// };

// const { height, width } = Dimensions.get('screen');

// const fetchMicrosoftPhoto = async (accessToken) => {
//   try {
//     const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 404) return null;
//     if (!response.ok) throw new Error(`Graph API failed: ${response.status}`);

//     const blob = await response.blob();

//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.warn('Failed to fetch Microsoft profile photo:', error);
//     return null;
//   }
// };

// const EmployeeLoginScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log('RNAppAuth config (screen mount):', {
//       clientId: config.clientId,
//       redirectUrl: config.redirectUrl,
//       scopes: config.scopes,
//       authorizationEndpoint: config.serviceConfiguration?.authorizationEndpoint,
//       tokenEndpoint: config.serviceConfiguration?.tokenEndpoint,
//     });
//   }, []);

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const result = await authorize(config);

//       console.log('===== AUTH RESULT =====');
//       console.log('Access Token:', result.accessToken);
//       console.log('ID Token:', result.idToken);
//       console.log('Refresh Token:', result.refreshToken);
//       console.log('Token Expiry:', result.accessTokenExpirationDate);

//       const photoUrl = await fetchMicrosoftPhoto(result.accessToken);
//       console.log('Microsoft Photo fetched:', photoUrl ? 'YES' : 'NO');

//       // Send MS ID token to your backend → get back your backend JWT
//       const loginResponse = await dispatch(
//         loginWithIdToken({ idToken: result.idToken }),
//       ).unwrap();

//       const userData = loginResponse?.data || {};

//       const userWithPhoto = {
//         ...userData,
//         photoUrl: photoUrl || userData.photoUrl || userData.profilePicture || null,
//       };

      
//       dispatch(
//         setAuthData({
//           accessToken: userData.accessToken,       
//           msAccessToken: result.accessToken,       
//           msRefreshToken: result.refreshToken,     
//           msTokenExpiry: result.accessTokenExpirationDate, 
//           user: userWithPhoto,
//         }),
//       );

      
//       await saveAuthSession({
//         msAccessToken: result.accessToken,
//         msRefreshToken: result.refreshToken,
//         msTokenExpiry: result.accessTokenExpirationDate,
//         backendAccessToken: userData.accessToken,
//         user: userWithPhoto,
//       });

      
//       navigation.navigate('MainTabs', {
//         user: {
//           id: userWithPhoto.id,
//           email: userWithPhoto.email,
//           firstName: userWithPhoto.firstName,
//           lastName: userWithPhoto.lastName,
//           userType: userWithPhoto.userType,
//           role: userWithPhoto.role,
//           isActive: userWithPhoto.isActive,
//           photoUrl: userWithPhoto.photoUrl,
//         },
//         accessToken: userData.accessToken,
//       });
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Login Failed', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppGradient style={styles.container}>
//       <SafeAreaView>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               resizeMode="contain"
//               source={require('../../assets/Image/back.png')}
//               style={styles.backIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Employee</Text>
//         </View>

//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../../assets/Image/NewLogo.png')}
//             resizeMode="contain"
//             style={styles.logo}
//           />
//         </View>
//         <View style={styles.titleContainer}>
//           <Text style={styles.loginTitle}>Log In</Text>
//         </View>
//         <View style={styles.subtitleContainer}>
//           <Text style={styles.subtitle}>
//             Peace of mind for your digital life
//           </Text>
//         </View>
//         <View style={styles.subtitleContainer}>
//           <Text style={styles.description}>
//             Secure your account with multi-factor authentication.
//           </Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handleLogin}
//             disabled={loading}
//             style={[
//               styles.microsoftButton,
//               loading && styles.disabledButton,
//             ]}>
//             <Image
//               resizeMode="contain"
//               source={require('../../assets/Image/microsoft.png')}
//               style={styles.microsoftIcon}
//             />
//             <Text style={styles.microsoftText}>
//               {loading ? 'Logging in...' : 'Log in with Microsoft'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </AppGradient>
//   );
// };

// export default EmployeeLoginScreen;

// const styles = StyleSheet.create({
//     container: {
//         height: height / 1,
//         width: width / 1,
//     },
//     header: {
//         height: height / 15,
//         width: width / 1.1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         alignSelf: 'center',
//     },
//     backIcon: {
//         width: width * 0.05,
//         height: height * 0.04,
//         tintColor: colors.primaryDark,
//     },
//     headerTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: colors.primaryDark,
//         // marginLeft: width * 0.03,
//         paddingHorizontal: 10
//     },
//     logoContainer:{
//          height: height / 4,
//         width: width / 1,
//         // backgroundColor: 'blue',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     logo: {
//         width: width * 0.70,
//         height: height * 0.18,
//         alignSelf: 'center',
//     },
//     titleContainer: {
//         alignItems: 'center'
//     },
//     loginTitle: {
//         textAlign: 'center',
//         fontSize: 18,
//         fontWeight: '800',
//         color: '#1E63B5',
//         fontFamily: 'OpenSans-Bold',


//     },
//     subtitleContainer: {
//         height: height / 16,
//         alignItems: 'center',
//         width: width / 1.5,
//         alignSelf: 'center',
//         justifyContent: 'flex-end',
        
//     },
//     subtitle: {
//         textAlign: 'center',
//         fontSize: 14,
//         color: '#414651',
//         fontWeight: '600',
        
//     },
//     description: {
//         textAlign: 'center',
//         fontSize: 14,
//         color: '#4A4A4A',
//         marginTop: height * 0.01,
//         lineHeight: height * 0.026,
//         fontFamily: 'OpenSans-Regular',
//     },
//     buttonContainer: {
//         height: height / 8.5,
//         width: width / 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         // backgroundColor: 'cyan'
//     },
//     microsoftButton: {
//         height: height / 16,
//         width: width / 1.25,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: colors.primaryDark,
//         borderRadius: 12,
//         // paddingVertical: height * 0.02,
//     },
//     disabledButton: {
//         backgroundColor: colors.primaryDark,
//     },
//     microsoftText: {
//         fontSize: 14,
//         fontWeight: '700',
//         color: '#FFFFFF',
//         paddingHorizontal: 10
//         // textAlign: 'center'
//     },
//     microsoftIcon: {
//         width: 20,
//         height: 20,
//         // marginRight: 10,
//     },
// });
