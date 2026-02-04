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
import { loginWithIdToken } from '../../store/slices/authSlice';
import { colors } from '../../styles/globalStyles';

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

// const config = {
//     clientId: CLIENT_ID,
//     redirectUrl: 'com.odessa.mobile.app://oauth',
//     scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
//     additionalParameters: { prompt: 'select_account' },
//     serviceConfiguration: {
//         authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
//         tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
//         revocationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout`,
//     },
// };

const { height, width } = Dimensions.get('screen');

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
            console.log('Refresh Token:', result.refreshToken);
            console.log('ID Token:', result.idToken);
            console.log('Token Type:', result.tokenType);
            console.log('Expires In:', result.accessTokenExpirationDate);


            const loginResponse = await dispatch(
                loginWithIdToken({ idToken: result.idToken }),
            ).unwrap();

            const userData = loginResponse?.data || {};
            console.log('Backend User Details:', userData);

            navigation.navigate('MainTabs', {
                user: {
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    userType: userData.userType,
                    role: userData.role,
                    isActive: userData.isActive,
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

                <Image
                    source={require('../../assets/Image/Logo.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
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
        tintColor: '#1E63B5',
    },
    headerTitle: {
        fontSize: height * 0.025,
        fontWeight: '600',
        color: '#1E63B5',
        marginLeft: width * 0.03,
    },
    logo: {
        width: width * 0.75,
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
        height: height / 17,
        width: width / 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006BB6',
        borderRadius: 12,
        // paddingVertical: height * 0.02,
    },
    disabledButton: {
        backgroundColor: colors.primaryLight,
    },
    microsoftText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        // textAlign: 'center'
    },
    microsoftIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});
