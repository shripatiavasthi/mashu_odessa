import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppGradient, { BackHeader } from '../../../components/AppGradient';
import { colors, typography } from '../../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

export default function PlcDetailScreen({ navigation, route }) {
    const rawEvent = route?.params?.event || null;

    const splitDateTime = value => {
        if (typeof value !== 'string' || !value.trim()) {
            return 'TBD';
        }

        const normalized = value.trim();
        const datePart = normalized.slice(0, 10) || 'TBD';
        const timePart = normalized.slice(11) || 'TBD';
        return `${datePart} | ${timePart}`;
    };

    const event = rawEvent
        ? {
            title: rawEvent?.eventName || 'Event',
            type: Array.isArray(rawEvent?.eventType)
                ? rawEvent.eventType.filter(Boolean).join(', ')
                : rawEvent?.eventType || 'N/A',
            category: rawEvent?.eventCategory || 'N/A',
            location: rawEvent?.eventLocation || 'TBD',
            startDate: splitDateTime(rawEvent?.eventStartDateTime),
            endDate: splitDateTime(rawEvent?.eventEndDateTime),
            checkInDate: splitDateTime(rawEvent?.eventCheckInTime),
            plcCredit: Number.isFinite(rawEvent?.eventPlcCredits)
                ? rawEvent.eventPlcCredits
                : Number.isFinite(rawEvent?.eventPoints)
                    ? rawEvent.eventPoints
                    : 0,
        }
        : {
            title: 'Graduation Ceremony',
            type: 'Career Enhancement',
            category: 'PLC 2006',
            location: 'Conference Room A',
            startDate: '2025 - 09 - 10 | 10:00 AM',
            endDate: '2025 - 09 - 10 | 11:00 AM',
            checkInDate: '2025 - 09 - 10 | 10:00 AM',
            plcCredit: 1,
        };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* <BackHeader title="Event Details" onBack={() => navigation.goBack()} /> */}

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={25} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details</Text>
            </View>

            <AppGradient style={styles.fill}>
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.section}>
                        <View style={styles.nameCon}>
                            <Text style={styles.label}>Event Name</Text>
                        </View>
                        <View style={styles.titleCon}>
                            <Text style={styles.valueTitle}>{event.title}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.sectionCon}>
                        <View style={styles.inlineFieldCon}>
                            <Text style={styles.inlineLabel}>Event Type: </Text>
                            <Text style={styles.inlineValue}>{event.type}</Text>
                        </View>

                        <View style={styles.inlineFieldCon}>
                            <Text style={styles.inlineLabel}>Event Category: </Text>
                            <Text style={styles.inlineValue}>{event.category}</Text>
                        </View>

                        <View style={styles.inlineFieldCon}>
                            <Text style={styles.inlineLabel}>Event Location: </Text>
                            <Text style={styles.inlineValue}>{event.location}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.dateSectionCon}>
                        <View style={styles.nameCon}>
                            <Text style={styles.label}>Event Start Date</Text>
                        </View>
                        <View style={styles.titleCon}>
                            <Text style={styles.dateValue}>{event.startDate}</Text>
</View>

                        <View style={styles.nameCon}>
                            <Text style={styles.label}>Event End Date</Text>
                        </View>
                        <View style={styles.titleCon}>
                            <Text style={styles.dateValue}>{event.endDate}</Text>
</View>
                        <View style={styles.nameCon}>
                            <Text style={styles.label}>Event Check- In Date</Text>
                        </View>
                        <View style={styles.titleCon}>
                            <Text style={styles.dateValue}>{event.checkInDate}</Text>
                            </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.lastSection}>
                        <View style={styles.inlineFieldCon}>
                            <Text style={styles.inlineLabel}>PLC Credit : </Text>
                            <Text style={styles.inlineValue}>{event.plcCredit}</Text>
                        </View>
                    </View>

                </ScrollView>
            </AppGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    header: {
        height: height / 14,
        width: width,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width / 25,
    },
    backBtn: {
        height: height / 14,
        width: width / 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: typography.size.lg,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.white,
        marginLeft: width / 40,
    },

    fill: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },

    section: {
        height: height / 11.5,
        width: width / 1,
        // backgroundColor: 'cyan'
        // width: width,

        // paddingHorizontal: width / 18,
        // paddingVertical: height / 60,
    },
    nameCon: {
        height: height / 25,
        width: width / 1.1,
        // alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'yellow',
        justifyContent: 'flex-end'
    },
    divider: {
        height: 1,
        width: width / 1.1,
        alignSelf: 'center',
        backgroundColor: colors.boderLight,
    },

   

    label: {
        fontSize: typography.size.xs,
        fontFamily: typography.regular,
        color: colors.textMuted,
        // marginBottom: height / 200,
    },
    titleCon: {
        height: height / 35,
        width: width / 1.1,
        // alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    valueTitle: {
        fontSize: typography.size.lg,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
    },

    dateValue: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
    },

    sectionCon: {
        height: height / 6.5,
        width: width / 1,
        // alignItems: 'center',
        // alignSelf: 'center',
        // backgroundColor: 'yellow',
        // justifyContent: 'flex-end',


    },
    inlineFieldCon: {
        flexDirection: 'row',
       height: height / 23,
        width: width / 1.1,
        alignItems: 'flex-end',
        alignSelf: 'center',
        // backgroundColor: 'cyan',
        // justifyContent: 'flex-end'
    },

    inlineLabel: {
        fontSize: typography.size.sm,
        fontFamily: typography.regular,
        color: colors.textMuted,
    },

    inlineValue: {
        fontSize: typography.size.sm,
        fontFamily: typography.bold,
        fontWeight: '700',
        color: colors.textDark,
    },
    lastSection:{
         height: height / 15,
        width: width / 1,
        // alignItems: 'flex-end',
        // alignSelf: 'center',
        // backgroundColor: 'lightgreen',
    },
    dateSectionCon:{
         height: height / 4.5,
        width: width / 1,
        // alignItems: 'flex-end',
        // alignSelf: 'center',
        // backgroundColor: 'lightgreen',
    }
});
