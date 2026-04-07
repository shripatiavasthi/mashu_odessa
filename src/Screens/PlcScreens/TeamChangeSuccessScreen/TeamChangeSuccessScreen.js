import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { styles } from './TeamSuccessStyles';

export default function TeamChangeSuccessScreen({ navigation, route }) {
    const teamName = route?.params?.teamName || '';

  const handleViewTeam = () => {
    navigation.reset({
        index: 0,
        routes: [
            {
                name: 'MainTabs',
                params: {
                    screen: 'Home',
                    params: {
                        screen: 'Team',
                        params: {
                            screen: 'TeamScreen',
                        },
                    },
                },
            },
        ],
    });
};

    return (
        <AppGradient style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>

                <BackHeader
                    title="Change My Team"
                    onBack={() => navigation.goBack()}
                />

                <View style={styles.content}>

                    <View style={styles.iconOuter}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={require('../../../assets/Image/Success.gif')}
                                resizeMode="contain"
                                style={styles.checkIcon}
                            />
                        </View>
                    </View>
                    <View style={styles.successCon}>
                        <Text style={styles.successTitle}>
                            Team Changed Successfully!
                        </Text>
                    </View>

                    {/* <View style={styles.divider} /> */}
                    <View style={styles.congratsCon}>
                        <Text style={styles.congrats}>
                            Congratulations!
                        </Text>
                    </View>
                    <View style={styles.messageCon}>
                        <Text style={styles.message}>
                            You have successfully joined the{' '}
                            <Text style={styles.teamName}>{teamName}</Text> team
                            {' '}and have been added as a member.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleViewTeam}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            View My Team
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </AppGradient>
    );
}
