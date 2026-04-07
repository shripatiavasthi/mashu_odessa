import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    BackHandler,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { apiClient } from '../../../api/client';
import AppGradient from '../../../components/AppGradient';
import { styles } from './TeamLoginSignStyle';
import AppHeader from '../../../components/AppHeader';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { colors } from '../../../styles/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TeamLoginSignScreen({ navigation }) {
    const { accessToken } = useSelector(selectAuth);
    const [allowTeamCreation, setAllowTeamCreation] = useState(false);
    const [settingsStatus, setSettingsStatus] = useState('idle');
    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            const handleBackPress = () => true;
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', event => {
                event.preventDefault();
            });

            const loadTeamSettings = async () => {
                if (!accessToken) {
                    if (isActive) {
                        setAllowTeamCreation(false);
                        setSettingsStatus('idle');
                    }
                    return;
                }

                try {
                    if (isActive) {
                        setSettingsStatus('loading');
                    }

                    const response = await apiClient.get(
                        `${env.apiBaseUrl}${endpoints.plcTeamSettings}`,
                        { token: accessToken },
                    );

                    if (!isActive) {
                        return;
                    }

                    setAllowTeamCreation(Boolean(response?.data?.allowTeamCreation));
                    setSettingsStatus('succeeded');
                } catch (error) {
                    if (!isActive) {
                        return;
                    }

                    setAllowTeamCreation(false);
                    setSettingsStatus('failed');
                }
            };

            loadTeamSettings();

            return () => {
                isActive = false;
                backHandler.remove();
                unsubscribeBeforeRemove();
            };
        }, [accessToken, navigation]),
    );

    const navigateToTab = tabName => {
        navigation.navigate('MainTabs', {
            screen: 'Home',
            params: {
                screen: tabName,
                ...(tabName === 'Events'
                    ? { params: { initialTab: 'MY_EVENTS' } }
                    : {}),
            },
        });
    };

    const openMore = () => {
        navigation.navigate('MainTabs', {
            screen: 'Home',
        });

        requestAnimationFrame(() => {
            navigation.dispatch(DrawerActions.openDrawer());
        });
    };

    return (
        <AppGradient style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader />
                <View style={styles.container}>
                    <View style={styles.contentBox}>
                        <View style={styles.contentCon}>
                            <Text style={styles.descriptionText}>
                                You are not currently part of any team.{"\n"}
                                Please join an existing team
                                {allowTeamCreation && (
                                <Text> or create a new team</Text>
                                )}.
                                </Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            {settingsStatus === 'loading' && (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size="small" color={colors.primary} />
                                </View>
                            )}
                            {allowTeamCreation && (
                                <View style={styles.buttonSpace}>
                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={() => navigation.navigate('TeamNewScreen')}
                                    >
                                        <Text style={styles.buttonText}>Create a New Team</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View>
                                <View style={styles.secbtnnSpace}>
                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={() => navigation.navigate('TeamSignup')}>
                                        <Text style={styles.buttonText}>Sign Up for Team</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 4 }]}>
                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigateToTab('CheckIn')}>
                        <Image
                            source={require('../../../assets/Image/Icons/CheckInOff.png')}
                            resizeMode="contain"
                            style={styles.bottomNavIcon}
                        />
                        <Text style={styles.bottomNavText}>Check-in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigateToTab('Events')}>
                        <Image
                            source={require('../../../assets/Image/Icons/EventOff.png')}
                            resizeMode="contain"
                            style={styles.bottomNavIcon}
                        />
                        <Text style={styles.bottomNavText}>Events</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigateToTab('Progress')}>
                        <Image
                            source={require('../../../assets/Image/Icons/ProgressBlack.png')}
                            resizeMode="contain"
                            style={styles.bottomNavIcon}
                        />
                        <Text style={styles.bottomNavText}>Progress</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomNavItem} activeOpacity={1}>
                        <Image
                            source={require('../../../assets/Image/Icons/TeamBlue.png')}
                            resizeMode="contain"
                            style={styles.bottomNavIcon}
                        />
                        <Text style={styles.bottomNavTextActive}>Team</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.bottomNavItem} onPress={openMore}>
                        <Text style={styles.moreIcon}>...</Text>
                        <Text style={styles.bottomNavText}>More</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </AppGradient>
    );
}
