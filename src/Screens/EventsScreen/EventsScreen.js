import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import CheckInModal from '../../components/CheckInModal'

const { height, width } = Dimensions.get('window');

const EventsScreen = ({ showMenu = true, onMenuPress }) => {

    const [activeTab, setActiveTab] = useState('MY_EVENTS');
    const [showModal, setShowModal] = useState(false);

    const [showCheckInModal, setShowCheckInModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);



    const navigation = useNavigation();
    const route = useRoute();

    useFocusEffect(

        useCallback(() => {
                    console.log("callback running")
            const initialTab = route?.params?.initialTab;
            if (initialTab) {
                setActiveTab(initialTab);
            }
        }, [route?.params?.initialTab])
    );


    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
        }
    };


    const TabItem = ({ title, active, onPress }) => (
        <TouchableOpacity
            style={[styles.tabItem, active && styles.activeTab]}
            onPress={onPress}>

            <Text style={[styles.tabText, active && styles.activeTabText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    const goToEventDetails = () => {
        navigation.navigate('EventDetailsScreen');
    };

    const MyEventCard = ({
        title,
        location,
        points,
        eventDate,
        checkInDate,
    }) => (
        <View style={styles.spaceConatiner}>
            <TouchableOpacity
                onPress={goToEventDetails}
                style={styles.card}>
                {/* <View style={styles.card}> */}
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{title}</Text>

                    <View style={styles.pointsRow}>
                        <View style={styles.dot} />
                        <Text style={styles.pointsText}>{points}</Text>
                    </View>
                </View>
                <View style={styles.locationCon}>
                    <Text style={styles.locationText}>Location: {location}</Text>
                </View>

                <View style={styles.cardDivider} />
                <View style={styles.dateRow}>
                    <View style={styles.dateBlock}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateLabel}>Event Date & Time</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.dateValue}>{eventDate}</Text>
                        </View>
                    </View>

                    <View style={styles.verticalDivider} />

                    <View style={styles.dateBlock}>
                        <View style={styles.checkInCon}>
                            <Text style={styles.dateLabel}>Check-In Date & Time</Text>
                        </View>
                        <View style={styles.checkInvalueCon}>
                            <Text style={styles.dateValue}>{checkInDate}</Text>
                        </View>
                    </View>
                </View>
                {/* </View> */}
            </TouchableOpacity>
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
        <View style={styles.upcomingContainer}>
            <TouchableOpacity style={styles.upcomingCard}>
                <View style={styles.cardHeaderUpcome}>
                    <Text style={styles.cardTitle}>{title}</Text>

                    {isEarly && (
                        <View style={styles.ribbon}>
                            {/* <Text style={styles.ribbonText}>Early Check in</Text> */}
                            <Image source={require('../../assets/Image/ArrowStyle.png')} />
                        </View>
                    )}
                </View>
                <View style={styles.upcomingLoc}>
                    <Text style={styles.locationText}>Location: {location}</Text>
                    <View style={styles.pointsRow}>
                        <View style={styles.dot} />
                        <Text style={styles.pointsText}>{points}</Text>
                    </View>
                </View>

                <View style={styles.termContainer}>
                    <Text style={styles.termText}>Event Term : {term}</Text>
                </View>

                {/* Footer */}
                <View style={styles.cardDivider} />
                <View style={styles.dateRow}>
                    <View style={styles.dateBlock}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateLabel}>Event Date & Time</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.dateValue}>{eventDate}</Text>
                        </View>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.dateBlock}>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={styles.checkInBtn}
                                onPress={() => {
                                    setSelectedEvent({
                                        id: 'event_123',
                                        name: 'Alumni Gathering',
                                    });
                                    setShowCheckInModal(true);
                                }}
                            >
                                <Text style={styles.checkInText}>Check In Now</Text>
                            </TouchableOpacity>

                        </View>
                        {/* <View style={styles.checkInvalueCon}>
                            <Text style={styles.dateValue}>{checkInDate}</Text>
                        </View> */}
                    </View>
                </View>



                {/* </View> */}
            </TouchableOpacity>
        </View>
    );



    return (
        <SafeAreaView style={styles.safeArea}>

            <CheckInModal
                visible={showCheckInModal}
                eventName={selectedEvent?.name}
                onClose={() => setShowCheckInModal(false)}
                onSubmit={(activityId) => {
                    console.log('Event ID:', selectedEvent?.id);
                    console.log('Activity ID:', activityId);

                    
                    // dispatch(checkInEvent({ eventId, activityId }))
                }}
            />



            <AppGradient style={styles.gradient}>

                <LinearGradient
                    colors={['#2E6FB6', '#4DA3DA']}
                    style={styles.header}>
                    <TouchableOpacity
                        style={styles.menuContainer}
                        onPress={handleMenuPress}>
                        <Image
                            source={require('../../assets/Image/Menu.png')}
                            resizeMode="contain"
                            style={styles.menuIcon} />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/Image/Menulogo.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>
                </LinearGradient>


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

                <TouchableOpacity
                    onPress={() => setShowModal(prev => !prev)}
                    style={styles.fab}
                    activeOpacity={0.8}>

                    <Image
                        source={
                            showModal
                                ? require('../../assets/Image/close.png')
                                : require('../../assets/Image/Info.png')
                        }
                    />
                </TouchableOpacity>
                <RewardPointsModal
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                />

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

    header: {
        height: height / 12,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'cyan'
    },
    menuContainer: {
        height: height / 18,
        width: width / 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        height: height / 12,
        width: width / 1.3,
        justifyContent: 'center',
    },
    menuIcon: {
        width: 30,
        height: 30,
        tintColor: colors.white,
    },
    logo: {
        width: 100,
        height: 60,
        resizeMode: 'contain',
    },


    /* Tabs */
    tabContainer: {
        height: height / 17,
        width: width / 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        // backgroundColor: 'cyan',
        borderWidth: 0.5,
        borderColor: colors.border
    },
    tabItem: {
        height: height / 18,
        width: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        // backgroundColor: 'lightgreen',
        backgroundColor: '#FFFFFF',
    },
    activeTab: {
       
        borderBottomColor: colors.primary,

    },
    tabText: {
        fontSize: typography.size.md,
        color: '#667085',
        fontWeight: '500',
    },
    activeTabText: {
        fontSize: typography.size.md,
        color: '#2E6FB6',
        fontWeight: '700',
    },

    /* Scroll */
    scrollContent: {
        // paddingTop: height / 50,
        paddingBottom: height / 20,
        // alignItems: 'center',
    },

    spaceConatiner: {
        height: height / 5.5,
        width: width / 1,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    card: {
        height: height / 6.5,
        width: width / 1.1,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,


    },
    cardHeader: {
        height: height / 25,
        width: width / 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'blue',
        alignSelf: 'center'
    },
    cardHeaderUpcome: {
        height: height / 25,
        width: width / 1.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'blue',
        alignSelf: 'flex-end'
    },
    cardTitle: {
        fontSize: typography.size.md,
        fontWeight: '700',
        color: colors.textDark,
        fontFamily: typography.bold
    },
    pointsText: {
        fontSize: typography.xs,
        fontWeight: '700',
        color: colors.primary,
        fontFamily: typography.bold
    },
    locationCon: {
        height: height / 25,
        width: width / 1.2,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue',
        alignSelf: 'center'
    },


    locationText: {
        fontSize: typography.xs,
        color: colors.textDark,
        fontWeight: '400',
        fontFamily: typography.regular
    },

    cardDivider: {
        height: 1,
        width: width / 1.1,
        backgroundColor: colors.border,
        // marginVertical: height / 60,

    },

    /* Dates */
    dateRow: {
        height: height / 14.4,
        width: width / 1.11,
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: colors.surface,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 0
    },
    dateBlock: {
        height: height / 14,
        width: width / 2.4,
        // justifyContent: 'center',
        // backgroundColor: 'yellow',
        // paddingHorizontal: 15
    },
    dateContainer: {
        height: height / 30,
        width: width / 2.4,
        justifyContent: 'flex-end',
        // backgroundColor: 'pink',
    },
    checkInCon: {
        height: height / 30,
        width: width / 2.4,
        justifyContent: 'flex-end',
        // backgroundColor: 'pink',
        paddingHorizontal: 10
    },
    checkInvalueCon: {
        height: height / 32,
        width: width / 2.4,
        justifyContent: 'center',
        // backgroundColor: 'lightgreen',
        paddingHorizontal: 10
    },
    dateLabel: {
        fontSize: typography.size.xx,
        color: colors.textDark,
        // marginBottom: height / 200,
        
    },
    timeContainer: {
        height: height / 32,
        width: width / 2.4,
        justifyContent: 'center',
        // backgroundColor: 'pink',
    },
    dateValue: {
        fontSize: typography.size.xs,
        fontWeight: '700',
        color: colors.textDark,
        fontFamily: typography.bold
    },
    verticalDivider: {
        height: height / 18,
        width: 1,
        backgroundColor: colors.border,
        // justifyContent: 'center',
        alignSelf: 'center'
    },

    // upcoming Designing here 
    upcomingContainer: {
        height: height / 4.3,
        width: width / 1,
        // backgroundColor: "blue",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    upcomingCard: {
        width: width / 1.1,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B9DCF5',
        // padding: width / 25,
        // marginBottom: height / 40,
    },


    upcomingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    upcomingLoc: {
        height: height / 20,
        width: width / 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'cyan',
        alignSelf: 'center'
    },

    termContainer: {
        height: height / 20,
        width: width / 1.2,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue',
        alignSelf: 'center'
    },

    termText: {
        fontSize: width / 30,
        color: '#667085',
        // marginTop: height / 120,
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
    btnContainer: {
        height: height / 15,
        width: width / 2.2,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center'
    },

    checkInBtn: {
        height: height / 23,
        width: width / 2.6,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkInText: {
        color: '#FFFFFF',
        fontSize: width / 28,
        fontWeight: '700',
    },

    fab: {
        position: 'absolute',
        right: width / 18,
        bottom: Platform.OS === 'ios' ? height / 10 : height / 10,
        height: width / 7,
        width: width / 7,
        borderRadius: width / 12,
        backgroundColor: '#006BB6',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },

    fabText: {
        color: '#FFFFFF',
        fontSize: width / 18,
        fontWeight: '700',
    },

});
