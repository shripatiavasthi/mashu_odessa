import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
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

export default function TeamLoginSignScreen({ navigation }) {
    const { accessToken } = useSelector(selectAuth);
    const [allowTeamCreation, setAllowTeamCreation] = useState(false);
    const [settingsStatus, setSettingsStatus] = useState('idle');

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

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
            };
        }, [accessToken]),
    );

    return (
        <AppGradient style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <AppHeader />
                <View style={styles.container}>
                    <View style={styles.contentBox}>
                        <View style={styles.contentCon}>
                            <Text style={styles.descriptionText}>
                                You are not currently part of any team.{"\n"}
                                Please join an existing team or create a new team.
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

            </SafeAreaView>
        </AppGradient>
    );
}
