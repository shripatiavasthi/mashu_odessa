import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient, { BackHeader } from '../../../../../components/AppGradient';
import { styles } from './PolicyStyles';
import { colors, typography } from '../../../../../styles/globalStyles';
import AppHeader from '../../../../../components/AppHeader';

const { width, height } = Dimensions.get('window');

export default function ProfessionalLearningPolicyScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppGradient style={{ height: height/1}}>
                <BackHeader
                    title="Professional Learning Policy"
                    onBack={() => navigation.goBack()}
                />
                {/* <AppHeader /> */}
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    >

                    <View style={styles.container}>
                        <View style={styles.titleCon}>
                            <Text style={styles.titleTxt}>Professional Learning Policy</Text>
                        </View>

                        <View style={styles.boxContainer}>
                            <View style={styles.secHeadingCon}>
                                <Text style={styles.sectionTitle}>Purpose:</Text>
                            </View>
                            <View style={styles.paragraphCon}>
                                <Text style={styles.paragraph}>
                                    Odessa College is committed to continuing educational opportunities in professional learning for:
                                </Text>
                            </View>
                            <View style={styles.bulletList}>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Career Enhancement</Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Technology Training</Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Personal Enrichment</Text>
                                </View>
                            </View>
                            <View style={styles.secHeadingCon}>
                                <Text style={styles.paragraph}>
                                    This applies to all full-time employees.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.boxContainer}>
                            <View style={styles.secHeadingCon}>
                                <Text style={styles.sectionTitle}>Adjuncts</Text>
                            </View>
                            <View style={styles.paragraphCon}>
                                <Text style={styles.paragraph}>
                                    Each Adjunct employee is required to obtain a minimum of four (4) Odessa College Professional Learning credit hours each long semester of the Academic Year (August-July). These credit hours must fall within the following areas:
                                </Text>
                            </View>
                            <View style={styles.bulletList}>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Career Enhancement – 2 hours</Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Technology Training – 2 hours</Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>•  Personal Enrichment – Optional</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxContainer}>
                            <View style={styles.secHeadingCon}>
                                <Text style={styles.sectionTitle}>Outline</Text>
                            </View>

                            <View style={styles.bulletList}>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>
                                        •  Employees earn Professional Learning (PL) credits in the respective areas by registering for sessions through the Professional Learning Dashboard.
                                    </Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>
                                        •  Employees may earn:
                                    </Text>
                                </View>
                                <View style={styles.subBulletList}>
                                    <View style={styles.bulletSpace}>
                                        <Text style={styles.bulletItem}>•  One (1) credit for attending a session</Text>
                                    </View>
                                    <View style={styles.bulletSpace}>
                                        <Text style={styles.bulletItem}>•  Two (2) credits for presenting a PL session</Text>
                                    </View>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>
                                        •  Employees may submit a proposal for a Professional Learning session through the Professional Learning Dashboard or by requesting a service through the Fresh service portal found on the self-service dashboard.
                                    </Text>
                                </View>
                                <View style={styles.bulletSpace}>
                                    <Text style={styles.bulletItem}>
                                        •  Employees may also apply for external credits in the form of Continuing Education Units (CEU).
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </AppGradient>
        </SafeAreaView>
    );
}

