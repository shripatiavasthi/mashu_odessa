import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../../components/AppGradient';
import { styles } from './TeamLoginSignStyle';
import AppHeader from '../../../components/AppHeader';
export default function TeamLoginSignScreen({ navigation }) {
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
                            <View style={styles.buttonSpace}>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={() => navigation.navigate('TeamNewScreen')}
                                >
                                    <Text style={styles.buttonText}>Create a New Team</Text>
                                </TouchableOpacity>
                            </View>
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