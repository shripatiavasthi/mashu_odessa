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
import { setAuthData } from '../../store/slices/authSlice';

const config = {
    clientId: env.azure.clientId,
    redirectUrl:
        Platform.OS === 'ios'
            ? env.azure.redirectUrl.ios
            : env.azure.redirectUrl.android,
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
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


            const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${result.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (graphResponse.ok) {
                const userData = await graphResponse.json();

                const userPayload = {
                    displayName: userData.displayName || 'Employee',
                    email: userData.mail || userData.userPrincipalName || '',
                    jobTitle: userData.jobTitle || '',
                    officeLocation: userData.officeLocation || '',
                    mobilePhone: userData.mobilePhone || '',
                };
                console.log("User Details: ", userData)

                dispatch(
                    setAuthData({
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken,
                        user: userPayload,
                    }),
                );

                navigation.navigate('MainTabs', {
                    user: userPayload,
                    accessToken: result.accessToken,
                });
            } else {
                const errorText = await graphResponse.text();
                console.error('Graph API Error:', graphResponse.status, errorText);
                Alert.alert('Error', 'Failed to fetch user profile.');
            }
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
        width: width * 0.06,
        height: width * 0.06,
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
        marginTop: height * 0.04,
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
        fontFamily: 'Open-Sans',
    },
    buttonContainer: {
        height: height / 8,
        width: width / 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    microsoftButton: {
        height: height / 15,
        width: width / 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006BB6',
        borderRadius: 12,
        paddingVertical: height * 0.02,
    },
    disabledButton: {
        backgroundColor: '#8ab4f8',
    },
    microsoftText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        // paddingHorizontal: 20,
    },
    microsoftIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
});
