import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { styles } from './TeamSignupStyle';

const teamsData = [
    { id: 1, name: 'Black Bears', type: 'Private' },
    { id: 2, name: 'Green Falcons', type: 'Private' },
    { id: 3, name: 'Red Hawks', type: 'Private' },
    { id: 4, name: 'Blue Pythons', type: 'Public' },
];

export default function TeamSignup({ navigation }) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [password, setPassword] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const isButtonEnabled = !!selectedTeam && (selectedTeam.type === 'Public' || password.trim().length > 0);

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
        setShowOptions(false);
        if (team.type === 'Public') setPassword('');
    };

    const handleChangeTeam = () => {
        if (!isButtonEnabled) return;
        console.log('Changing to team:', selectedTeam?.name, 'Password:', password || '(none)');
        navigation.navigate('TeamChangeSuccessScreen', {
            teamName: selectedTeam.name
        });

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppGradient style={{ flex: 1 }}>

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
                            {teamsData.map((team) => (
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
                                        onChangeText={setPassword}
                                        placeholder="Enter team password"
                                        // secureTextEntry
                                        autoCapitalize="none"
                                    />
                                </View>
                            </>
                        )}
                    </View>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={[
                                styles.changeButton,
                                !isButtonEnabled && styles.changeButtonDisabled,
                            ]}
                            onPress={handleChangeTeam}
                            disabled={!isButtonEnabled}>
                            <Text
                                style={[
                                    styles.changeButtonText,
                                    !isButtonEnabled && styles.changeButtonTextDisabled,
                                ]}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppGradient>
        </SafeAreaView>
    );
}