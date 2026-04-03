import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { apiClient } from '../../../api/client';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { env, endpoints } from '../../../env';
import { selectAuth } from '../../../store';
import { styles } from './TeamSignupStyle';

export default function TeamSignup({ navigation }) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [password, setPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [teams, setTeams] = useState([]);
    const [teamsStatus, setTeamsStatus] = useState('idle');
    const [teamsError, setTeamsError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { accessToken, user } = useSelector(selectAuth);

    useEffect(() => {
        if (!accessToken) {
            setTeams([]);
            setTeamsStatus('idle');
            setTeamsError(null);
            return;
        }

        const loadTeams = async () => {
            try {
                setTeamsStatus('loading');
                setTeamsError(null);

                const response = await apiClient.get(
                    `${env.apiBaseUrl}${endpoints.plcTeams}`,
                    { token: accessToken },
                );

                const data = response?.data;
                const mappedTeams = Array.isArray(data)
                    ? data.map(team => ({
                        id: team?.teamId,
                        name: team?.teamName || 'Team',
                        type: typeof team?.teamType === 'string' && team.teamType.trim()
                            ? `${team.teamType.charAt(0).toUpperCase()}${team.teamType.slice(1).toLowerCase()}`
                            : 'Public',
                    }))
                    : [];

                setTeams(mappedTeams);
                setTeamsStatus('succeeded');
            } catch (error) {
                setTeams([]);
                setTeamsStatus('failed');
                setTeamsError(error?.message || 'Failed to load teams');
            }
        };

        loadTeams();
    }, [accessToken]);

    const isButtonEnabled = !!selectedTeam && (selectedTeam.type === 'Public' || password.trim().length > 0);

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
        setShowOptions(false);
        setSubmitError('');
        if (team.type === 'Public') setPassword('');
    };

    const handleChangeTeam = async () => {
        if (!isButtonEnabled || !accessToken || !user?.id || isSubmitting) return;

        try {
            setIsSubmitting(true);
            setSubmitError('');

            const payload = {
                teamId: selectedTeam.id,
            };

            if (selectedTeam.type === 'Private') {
                payload.teamPassword = password.trim();
            }

            const response = await apiClient.post(
                `${env.apiBaseUrl}${endpoints.plcJoinTeam(user.id)}`,
                payload,
                { token: accessToken },
            );

            const responseMessage =
                typeof response?.data === 'string' ? response.data.trim() : '';
            const isInvalidPassword =
                selectedTeam.type === 'Private' &&
                responseMessage.toLowerCase() === 'invalid password';

            if (!response?.success || isInvalidPassword) {
                if (isInvalidPassword) {
                    setSubmitError('Invalid team password');
                    return;
                }

                throw new Error(responseMessage || 'Failed to join team');
            }

            navigation.navigate('TeamChangeSuccessScreen', {
                teamName: selectedTeam.name
            });
        } catch (error) {
            setSubmitError(error?.message || 'Unable to join the team right now.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppGradient style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                <BackHeader
                    title="Sign Up for Team"
                    onBack={() => navigation.goBack()} />

                <View style={styles.contentContainer}>
                    <View style={styles.insContainer}>
                        <Text style={styles.instructionText}>
                            To sign up for team, use the drop-down option below. Teams that are marked as PRIVATE require a password to be able to join. You can obtain that password from the creator of that team name.
                        </Text>
                    </View>

                    {/* <View style={styles.insContainer}>
                        <Text style={styles.instructionText}>
                            If you select a team that is not marked private, you can leave the password field blank. These are public teams that anyone can join.
                        </Text>
                    </View> */}
                    <View style={styles.selectTeamCon}>
                        <Text style={styles.label}>Select a Team</Text>
                    </View>
                    <View style={styles.dropdownWrapper}>
                        <View style={styles.selectTeamCon}>
                            <TouchableOpacity
                                style={styles.selectBox}
                                onPress={() => setShowOptions(!showOptions)}
                                activeOpacity={0.8}>
                                <Text style={styles.selectText}>
                                    {selectedTeam
                                        ? `${selectedTeam.name} (${selectedTeam.type})`
                                        : 'Select Team'}
                                </Text>
                                <Text style={styles.dropdownArrow}>▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {showOptions && (
                        <View style={styles.optionsContainer}>
                            {teamsStatus === 'loading' ? (
                                <View style={styles.optionsStateContainer}>
                                    <ActivityIndicator size="small" color="#006BB6" />
                                    <Text style={styles.optionsStateText}>Loading teams...</Text>
                                </View>
                            ) : teamsError ? (
                                <View style={styles.optionsStateContainer}>
                                    <Text style={styles.optionsStateText}>{teamsError}</Text>
                                </View>
                            ) : teams.length === 0 ? (
                                <View style={styles.optionsStateContainer}>
                                    <Text style={styles.optionsStateText}>No teams found</Text>
                                </View>
                            ) : teams.map((team) => (
                                <TouchableOpacity
                                    key={team.id}
                                    style={styles.optionItem}
                                    onPress={() => handleTeamSelect(team)}>
                                    <Text style={styles.optionText}>
                                        {team.name} ({team.type})
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}


                    <View style={styles.spaceCon}>
                        {selectedTeam && selectedTeam.type === 'Private' && (
                            <>
                                <View style={styles.selectTeamCon}>
                                    <Text style={styles.label}>Team Password</Text>
                                </View>
                                <View style={styles.selectTeamCon}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        value={password}
                                        onChangeText={value => {
                                            setPassword(value);
                                            if (submitError) {
                                                setSubmitError('');
                                            }
                                        }}
                                        placeholder="Enter team password"
                                        // secureTextEntry
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={styles.selectTeamCon}>
                                    {!!submitError && (
                                        <Text style={styles.errorText}>Invalid credentials. Please check your password and try again.</Text>
                                    )}
                                </View>
                            </>
                        )}
                    </View>


                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                                styles.changeButton,
                                (!isButtonEnabled || isSubmitting) && styles.changeButtonDisabled,
                            ]}
                            onPress={handleChangeTeam}
                            disabled={!isButtonEnabled || isSubmitting}>
                            <Text
                                style={[
                                    styles.changeButtonText,
                                    (!isButtonEnabled || isSubmitting) && styles.changeButtonTextDisabled,
                                ]}>
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        </AppGradient>
    );
}
