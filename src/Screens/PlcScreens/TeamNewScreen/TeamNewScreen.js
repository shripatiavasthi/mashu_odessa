import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { styles } from './TeamNewStyle';

const TeamNewScreen =({ navigation }) => {
    const [teamName, setTeamName] = useState('');
    const [teamPassword, setTeamPassword] = useState('');

    const isCreateEnabled = teamName.trim().length > 0 && teamPassword.trim().length > 0;

    const handleCreateTeam = () => {
        if (!isCreateEnabled) return;
        
        console.log('Creating new team:', teamName, 'Password:', teamPassword || '(Public)');
        
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppGradient style={{ flex: 1 }}>

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

                        {/* Team Name Input */}
                        <Text style={styles.label}>Team Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Team Name"
                            value={teamName}
                            onChangeText={setTeamName}
                            autoCapitalize="words"
                            maxLength={50}
                        />

                        <Text style={styles.importantNote}>
                            (IMPORTANT: In order to be eligible for prizes team size must be a MINIMUM of 2 members and a MAX of 5 members.)
                        </Text>

                        {/* Team Password Input */}
                        <Text style={styles.label}>Team Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Password"
                            value={teamPassword}
                            onChangeText={setTeamPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <Text style={styles.passwordNote}>
                            (If you leave this field blank, the team will be considered a public team and anyone can register for it.)
                        </Text>

                        {/* Create Team Button - Enabled only when both fields are filled */}
                        <TouchableOpacity
                            style={[
                                styles.createButton,
                                !isCreateEnabled && styles.createButtonDisabled
                            ]}
                            onPress={handleCreateTeam}
                            disabled={!isCreateEnabled}
                        >
                            <Text style={[
                                styles.createButtonText,
                                !isCreateEnabled && styles.createButtonTextDisabled
                            ]}>
                                Create Team
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </AppGradient>
        </SafeAreaView>
    );
}

export default TeamNewScreen;