import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { apiClient } from '../../../api/client';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { styles } from './TeamNewStyle';

const TeamNewScreen = ({ navigation }) => {
    const [teamName, setTeamName] = useState('');
    const [teamPassword, setTeamPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { accessToken } = useSelector(selectAuth);

    const isCreateEnabled = teamName.trim().length > 0;

    const handleCreateTeam = async () => {
        if (!isCreateEnabled || !accessToken || isSubmitting) {
            return;
        }

        const trimmedTeamName = teamName.trim();
        const trimmedTeamPassword = teamPassword.trim();

        try {
            setIsSubmitting(true);

            const response = await apiClient.post(
                `${env.apiBaseUrl}${endpoints.plcTeams}`,
                {
                    teamName: trimmedTeamName,
                    ...(trimmedTeamPassword ? { teamPassword: trimmedTeamPassword } : {}),
                },
                { token: accessToken },
            );

            const responseMessage =
                typeof response?.data === 'string' ? response.data : '';
            const isCreated =
                response?.success === true &&
                responseMessage !== 'Team creation is not allowed';

            if (!isCreated) {
                throw new Error(responseMessage || 'Failed to create team');
            }

            navigation.navigate('TeamCreatedSuccessScreen', {
                teamName: trimmedTeamName,
                isPrivate: trimmedTeamPassword.length > 0,
            });
        } catch (error) {
            Alert.alert('Create Team Failed', error?.message || 'Unable to create the team right now.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <AppGradient style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                <BackHeader
                    title="Create a New Team"
                    onBack={() => navigation.goBack()}
                />

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <View style={styles.headContainer}>
                            <Text style={styles.infoTitle}>
                                Important Information about Teams and Team Names
                            </Text>
                        </View>

                        <View style={styles.bulletList}>
                            <View style={styles.bulletItemCon}>
                                <Text style={styles.bulletItem}>
                                    • Do not use any special characters when creating your team name (only letters and numbers please).
                                </Text>
                            </View>
                            <View style={styles.bulletItemCon}>
                                <Text style={styles.bulletItem}>
                                    • Duplicate team names will not be allowed. If you try to create a team name that someone else has already created, you will be asked to create a different name.
                                </Text>
                            </View>
                            <View style={styles.bulletItemCon}>
                                <Text style={styles.bulletItem}>
                                    • Do not use crude, vulgar, or suggestive words in your team name. Any team name deemed to be containing this kind of language will be removed.
                                </Text>
                            </View>
                            <View style={styles.bulletItemCon}>
                                <Text style={styles.bulletItem}>
                                    • Teams must contain a minimum of 2 members and a maximum of 5 members. Any teams created that do not have at least 2 members will be removed.
                                </Text>
                            </View>
                            <View style={styles.bulletItemCon}>
                                <Text style={styles.bulletItem}>
                                    • Creating a Team Name will automatically add you as a member of that team. If you decide later on that you want to change teams, you can use the Change Team function on the main page to switch your team association.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.labelCon}>
                            <Text style={styles.label}>Team Name</Text>
                        </View>
                        <View style={styles.inputCon}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Team Name"
                                value={teamName}
                                onChangeText={setTeamName}
                                autoCapitalize="words"
                                maxLength={50}
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.importantNote}>
                                (IMPORTANT: In order to be eligible for prizes team size must be a MINIMUM of 2 members and a MAX of 5 members.)
                            </Text>
                        </View>

                        <View style={styles.labelCon}>
                            <Text style={styles.label}>Team Password</Text>
                        </View>
                        <View style={styles.inputCon}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                value={teamPassword}
                                onChangeText={setTeamPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputCon}>
                            <Text style={styles.importantNote}>
                                (If you leave this field blank, the team will be considered a public team and anyone can register for it.)
                            </Text>
                        </View>


                        <View style={styles.btnCon}>
                            <TouchableOpacity
                                style={[
                                    styles.createButton,
                                    (!isCreateEnabled || isSubmitting) && styles.createButtonDisabled
                                ]}
                                onPress={handleCreateTeam}
                                disabled={!isCreateEnabled || isSubmitting}
                            >
                                <Text style={[
                                    styles.createButtonText,
                                    (!isCreateEnabled || isSubmitting) && styles.createButtonTextDisabled
                                ]}>
                                    {isSubmitting ? 'Creating Team...' : 'Create Team'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppGradient>
    );
}

export default TeamNewScreen;
