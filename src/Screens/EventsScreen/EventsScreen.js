import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';

const { height, width } = Dimensions.get('window');

const EventsScreen = () => {

    const [activeTab, setActiveTab] = useState('MY_EVENTS');

    const TabItem = ({ title, active, onPress }) => (
        <TouchableOpacity
            style={[styles.tabItem, active && styles.activeTab]}
            onPress={onPress}
        >
            <Text style={[styles.tabText, active && styles.activeTabText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    const MyEventCard = ({
        title,
        location,
        points,
        eventDate,
        checkInDate,
    }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.pointsText}>{points}</Text>
            </View>

            <Text style={styles.locationText}>Location: {location}</Text>

            <View style={styles.cardDivider} />

            <View style={styles.dateRow}>
                <View style={styles.dateBlock}>
                    <Text style={styles.dateLabel}>Event Date & Time</Text>
                    <Text style={styles.dateValue}>{eventDate}</Text>
                </View>

                <View style={styles.verticalDivider} />

                <View style={styles.dateBlock}>
                    <Text style={styles.dateLabel}>Check-In Date & Time</Text>
                    <Text style={styles.dateValue}>{checkInDate}</Text>
                </View>
            </View>
        </View>
    );


    const UpcomingEventCard = ({
        title,
        location,
        term,
        points,
        eventDate,
        isEarly,
    }) => (
        <View style={styles.upcomingCard}>
            {/* Header */}
            <View style={styles.upcomingHeader}>
                <Text style={styles.cardTitle}>{title}</Text>

                {isEarly && (
                    <View style={styles.ribbon}>
                        <Text style={styles.ribbonText}>Early Check in</Text>
                    </View>
                )}
            </View>

            <Text style={styles.locationText}>Location: {location}</Text>
            <Text style={styles.termText}>Event Term : {term}</Text>

            <View style={styles.pointsRow}>
                <View style={styles.dot} />
                <Text style={styles.pointsText}>{points}</Text>
            </View>

            {/* Footer */}
            <View style={styles.upcomingFooter}>
                <View>
                    <Text style={styles.dateLabel}>Event Date & Time</Text>
                    <Text style={styles.dateValue}>{eventDate}</Text>
                </View>

                <TouchableOpacity style={styles.checkInBtn}>
                    <Text style={styles.checkInText}>Check In Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );



    return (
        <SafeAreaView style={styles.safeArea}>
            <AppGradient style={styles.gradient}>
                <AppHeader />

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TabItem
                        title="My Events"
                        active={activeTab === 'MY_EVENTS'}
                        onPress={() => setActiveTab('MY_EVENTS')}
                    />
                    <TabItem
                        title="Upcoming Events"
                        active={activeTab === 'UPCOMING_EVENTS'}
                        onPress={() => setActiveTab('UPCOMING_EVENTS')}
                    />
                </View>

                {/* Content */}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'MY_EVENTS' ? (
                        <>
                            <MyEventCard
                                title="Graduation Ceremony"
                                location="Main Auditorium"
                                points="500 Pts"
                                eventDate="2025-06-15 | 1:00 PM"
                                checkInDate="2025-06-15 | 11:00 AM"
                            />

                            <MyEventCard
                                title="Innovation Summit"
                                location="Conference Room A"
                                points="300 Pts"
                                eventDate="2025-09-30 | 9:00 AM"
                                checkInDate="2025-09-30 | 8:00 AM"
                            />
                        </>
                    ) : (
                        <>
                            <UpcomingEventCard
                                title="Alumni Gathering"
                                location="Conference Hall B"
                                term="25F1"
                                points="500 Pts"
                                eventDate="2025-08-22 | 3:00 PM"
                                isEarly
                            />

                            <UpcomingEventCard
                                title="Career Fair"
                                location="Exhibition Center"
                                term="25F1"
                                points="100 Pts"
                                eventDate="2025-09-10 | 10:00 AM"
                            />
                        </>
                    )}
                </ScrollView>

            </AppGradient>
        </SafeAreaView>
    );
};

export default EventsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },

    /* Tabs */
    tabContainer: {
        height: height / 14,
        width: width / 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    tabItem: {
        height: height / 14,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#2E6FB6',
    },
    tabText: {
        fontSize: width / 24,
        color: '#667085',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#2E6FB6',
        fontWeight: '700',
    },

    /* Scroll */
    scrollContent: {
        paddingTop: height / 50,
        paddingBottom: height / 20,
        alignItems: 'center',
    },

    /* Card */
    card: {
        height: height / 4.2,
        width: width / 1.1,
        backgroundColor: '#FFFFFF',
        borderRadius: width / 30,
        borderWidth: 1,
        borderColor: '#B9DCF5',
        padding: width / 25,
        marginBottom: height / 40,
    },

    cardHeader: {
        height: height / 20,
        width: width / 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: width / 22,
        fontWeight: '700',
        color: '#3A3A3A',
    },
    pointsText: {
        fontSize: width / 28,
        fontWeight: '700',
        color: '#2E6FB6',
    },

    locationText: {
        fontSize: width / 28,
        color: '#667085',
        marginTop: height / 120,
    },

    cardDivider: {
        height: 1,
        width: width / 1.2,
        backgroundColor: '#E4F1FB',
        marginVertical: height / 60,
    },

    /* Dates */
    dateRow: {
        height: height / 10,
        width: width / 1.2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBlock: {
        height: height / 10,
        width: width / 2.8,
        justifyContent: 'center',
    },
    dateLabel: {
        fontSize: width / 32,
        color: '#667085',
        marginBottom: height / 200,
    },
    dateValue: {
        fontSize: width / 28,
        fontWeight: '600',
        color: '#344054',
    },
    verticalDivider: {
        height: height / 12,
        width: 1,
        backgroundColor: '#D0D5DD',
    },

    /* Upcoming Card */
upcomingCard: {
    width: width / 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: width / 30,
    borderWidth: 1,
    borderColor: '#B9DCF5',
    padding: width / 25,
    marginBottom: height / 40,
},

upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},

ribbon: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: width / 30,
    paddingVertical: height / 120,
    borderTopLeftRadius: width / 40,
    borderBottomLeftRadius: width / 40,
},

ribbonText: {
    color: '#FFFFFF',
    fontSize: width / 32,
    fontWeight: '600',
},

termText: {
    fontSize: width / 30,
    color: '#667085',
    marginTop: height / 120,
},

pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height / 150,
},

dot: {
    height: width / 40,
    width: width / 40,
    borderRadius: width / 80,
    backgroundColor: '#2E6FB6',
    marginRight: width / 50,
},

upcomingFooter: {
    marginTop: height / 40,
    paddingTop: height / 60,
    borderTopWidth: 1,
    borderTopColor: '#E4F1FB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},

checkInBtn: {
    height: height / 18,
    width: width / 3,
    backgroundColor: '#2E6FB6',
    borderRadius: width / 25,
    justifyContent: 'center',
    alignItems: 'center',
},

checkInText: {
    color: '#FFFFFF',
    fontSize: width / 28,
    fontWeight: '700',
},

});
