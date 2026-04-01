import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { styles } from './TeamNewStyle';

const TeamCreatedSuccessScreen = ({ navigation, route }) => {

    const { teamName, isPrivate } = route.params || {};

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppGradient style={{ flex: 1 }}>

                <BackHeader
                    title="Create a New Team"
                    onBack={() => navigation.goBack()}
                />

                <View style={styles.successContainer}>

                    <View style={styles.successCircle}>
                        <View style={styles.iconOuter}>
                            <Image
                                source={require('../../../assets/Image/Success.gif')}
                                resizeMode="contain"
                                style={styles.checkIcon}
                            />
                        </View>
                    </View>

                    <View style={styles.successTitleContainer}>
                        <Text style={styles.successTitle}>
                            Team Created Successfully!
                        </Text>
                    </View>
                    

                    <View style={styles.successTextContainer}>

                        <View style={styles.congratsContainer}>
                            <Text style={styles.congratsText}>
                                Congratulations!
                            </Text>
                        </View>

                        <View style={styles.congratsContainer}>
                            <Text style={styles.successDescription}>
                                Your team{' '}
                                <Text style={styles.boldText}>
                                    {teamName}
                                </Text>{' '}
                                has been successfully created and you have been added to this team.
                            </Text>
                        </View>

                        <View style={styles.desContainer}>
                            <Text style={styles.successDescription}>
                                This team is a{' '}
                                <Text style={styles.boldText}>
                                    {isPrivate ? 'PRIVATE' : 'PUBLIC'}
                                </Text>{' '}
                                team.
                            </Text>
                        </View>

                        {
                            isPrivate && (
                                <View style={styles.desContainer}>
                                    <Text style={styles.successDescription}>
                                        Anyone wishing to join this team will need to know the password that you created. Make sure that you share the team name and password with the friends and family that you want to join the team so that they can select it while registering.
                                    </Text>
                                </View>
                            )
                        }

                    </View>

                </View>

            </AppGradient>
        </SafeAreaView>
    );
};

export default TeamCreatedSuccessScreen;