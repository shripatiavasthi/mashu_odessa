import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CheckInModal from '../../components/CheckInModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoalPoints, fetchTermCodes } from '../../store/slices/termSlice';
import { fetchEventsByTerm, fetchUpcomingEvents } from '../../store/slices/eventsSlice';
import { selectAuth, selectEvents, selectTerms } from '../../store';

import Icon from 'react-native-vector-icons/Entypo';

const { height, width } = Dimensions.get('window');

const EventsScreen = ({ showMenu = true, onMenuPress }) => {
  const [activeTab, setActiveTab] = useState('MY_EVENTS');
  const [showModal, setShowModal] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedTermId, setSelectedTermId] = useState(null);
  const [hasSetInitialTerm, setHasSetInitialTerm] = useState(false); 

  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(selectAuth);
  const { items: termItems, status: termStatus, goalPoints, ocSuccessRewards } = useSelector(selectTerms);
  const { items: eventItems, upcomingItems, totalPoints, status: eventsStatus } = useSelector(selectEvents);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  
  const currentGoalData = goalPoints?.[0] || {};

  const csPoints = Number.isFinite(currentGoalData.csPoints) ? currentGoalData.csPoints : 0;
  const ddPoints = Number.isFinite(currentGoalData.ddPoints) ? currentGoalData.ddPoints : 0;

  
  let pointsLabel = '0 Pts';
  if (Number.isFinite(totalPoints)) {
    if (totalPoints >= csPoints) {
      pointsLabel = `CS ${totalPoints} Pts`;
    } else if (totalPoints >= ddPoints) {
      pointsLabel = `DD ${totalPoints} Pts`;
    } else {
      pointsLabel = `${totalPoints} Pts`;
    }
  }

  const termOptions = useMemo(() => {
    if (!Array.isArray(termItems) || !termItems.length) return [];
    return termItems
      .map(item => ({
        id: item?.id || null,
        termCode: item?.termCode || null,
        currentTerm: !!item?.currentTerm, 
      }))
      .filter(item => item.termCode);
  }, [termItems]);

  
  React.useEffect(() => {
    if (!termOptions.length || hasSetInitialTerm) return;

  
    const preferredTerm = termOptions.find(t => t.currentTerm === true);
    const targetTerm = preferredTerm || termOptions[0];

    if (targetTerm) {
      setSelectedTerm(targetTerm.termCode);
      setSelectedTermId(targetTerm.id);
      setHasSetInitialTerm(true);
    }
  }, [termOptions, hasSetInitialTerm]);

  
  React.useEffect(() => {
    if (!isFocused) return;
    const initialTab = route?.params?.initialTab;
    if (initialTab === 'MY_EVENTS' || initialTab === 'UPCOMING_EVENTS') {
      setActiveTab(prev => (prev === initialTab ? prev : initialTab));
      navigation.setParams?.({ initialTab: undefined });
    }
  }, [isFocused, route?.params?.initialTab, navigation]);

  
  React.useEffect(() => {
    if (!isFocused || !accessToken) return;
    if (termStatus === 'idle') {
      dispatch(fetchTermCodes({ accessToken }));
    }
  }, [accessToken, dispatch, isFocused, termStatus]);

  
  React.useEffect(() => {
    if (!isFocused || !accessToken || !user?.id || !selectedTermId) return;

    dispatch(
      fetchEventsByTerm({
        accessToken,
        userId: user.id,
        termId: selectedTermId,
      }),
    );

    dispatch(
      fetchGoalPoints({
        accessToken,
        termCodeId: selectedTermId,
      }),
    );
  }, [accessToken, dispatch, isFocused, selectedTermId, user?.id]);

  
  React.useEffect(() => {
    if (!isFocused || !accessToken || !user?.id) return;
    dispatch(
      fetchUpcomingEvents({
        accessToken,
        userId: user.id,
      }),
    );
  }, [accessToken, dispatch, isFocused, user?.id]);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
    }
  };

  const goToEventDetails = event => {
    navigation.navigate('EventDetailsScreen', { data: event, terms: selectedTerm });
  };

  const MyEventCard = ({ event, title, location, points, eventDate, checkInDate }) => (
    <View style={styles.spaceConatiner}>
      <TouchableOpacity onPress={() => goToEventDetails(event)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.pointsRow}>
            <View style={styles.dot} />
            <Text style={styles.pointsText}>{points}</Text>
          </View>
        </View>
        <View style={styles.locationCon}>
          <Text style={styles.locationText}>Location: {location}</Text>
          <Icon name="chevron-with-circle-right" size={18} color="#666666" />
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
      </TouchableOpacity>
    </View>
  );

  const UpcomingEventCard = ({
    event,
    earlyCheckinAllowed,
    title,
    location,
    term,
    points,
    eventDate,
    showCheckInButton,
  }) => (
    <View style={styles.upcomingContainer}>
      <TouchableOpacity style={styles.upcomingCard} onPress={() => goToEventDetails(event)}>
        <View style={styles.cardHeaderUpcome}>
          <Text style={styles.cardTitle}>{title}</Text>
          {earlyCheckinAllowed && (
            <View style={styles.ribbon}>
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
          <Icon name="chevron-with-circle-right" size={18} color="#666666" />
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
            {showCheckInButton && (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.checkInBtn}
                  onPress={() => {
                    setSelectedEvent({ id: event?.id, name: title });
                    setShowCheckInModal(true);
                  }}>
                  <Text style={styles.checkInText}>Check In Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    const isLoading = termStatus === 'loading' || eventsStatus === 'loading';
    const hasNoEvents = activeTab === 'MY_EVENTS' ? !eventItems?.length : !upcomingItems?.length;

    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      );
    }

    if (hasNoEvents) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>No events found</Text>
          <Text style={styles.loadingText}>
            {activeTab === 'MY_EVENTS'
              ? 'No events completed in this term yet'
              : 'No upcoming events in this term'}
          </Text>
        </View>
      );
    }

    return (
      <>
        {activeTab === 'MY_EVENTS' ? (
          eventItems.map((event, index) => {
            const title = event?.name || `Event ${index + 1}`;
            const location = event?.location || 'TBD';
            const points = `${event?.eventPoints || 0} Pts`;
            const eventDate = `${event?.date} | ${event?.startTime || 'TBD'}`.trim();
            const checkInDate = event?.checkInTime || 'TBD';

            return (
              <MyEventCard
                key={event?.id || index}
                event={event}
                title={title}
                location={location}
                points={points}
                eventDate={eventDate}
                checkInDate={checkInDate}
              />
            );
          })
        ) : (
          upcomingItems.map((event, index) => {
            const earlyCheckinAllowed = !!event.earlyCheckinAllowed;
            const title = event?.name || `Event ${index + 1}`;
            const location = event?.location || 'TBD';
            const term = event?.termCode || selectedTerm || 'N/A';
            const points = Number.isFinite(event?.eventPoints)
              ? `${event.eventPoints} Pts`
              : '0 Pts';
            const eventDate = [event?.date, event?.startTime].filter(Boolean).join(' | ') || 'TBD';

            return (
              <UpcomingEventCard
                key={event?.id || index}
                event={event}
                earlyCheckinAllowed={earlyCheckinAllowed}
                title={title}
                location={location}
                term={term}
                points={points}
                eventDate={eventDate}
                showCheckInButton={!!event?.showCheckInButton}
              />
            );
          })
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CheckInModal
        visible={showCheckInModal}
        eventName={selectedEvent?.name}
        onClose={() => setShowCheckInModal(false)}
        onSubmit={activityId => {
          console.log('Check-in submitted:', {
            eventId: selectedEvent?.id,
            activityId,
          });
        }}
      />

      <AppGradient style={styles.gradient}>
        <LinearGradient colors={['#2E6FB6', '#4DA3DA']} style={styles.header}>
          <TouchableOpacity style={styles.menuContainer} onPress={handleMenuPress}>
            <Image
              source={require('../../assets/Image/Menu.png')}
              resizeMode="contain"
              style={styles.menuIcon}
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Image/Menulogo.png')}
              resizeMode="contain"
              style={styles.logo}
            />

            {activeTab === 'MY_EVENTS' && (
              <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterCon}>
                  <Text style={styles.filterTxt}>{pointsLabel}</Text>
                </TouchableOpacity>

                <View style={styles.dropDownWrapper}>
                  <Pressable
                    onPress={() => setIsTermOpen(prev => !prev)}
                    style={({ pressed }) => [styles.dropDownCon, pressed && styles.dropDownPressed]}>
                    <Text style={styles.filterTxt}>
                      {selectedTerm || termOptions[0]?.termCode || 'Select Term'}
                    </Text>
                    <Image source={require('../../assets/Image/drop_down.png')} />
                  </Pressable>

                  {isTermOpen && (
                    <Modal transparent animationType="fade" onRequestClose={() => setIsTermOpen(false)}>
                      <Pressable style={styles.modalOverlay} onPress={() => setIsTermOpen(false)} />

                      <View style={styles.modalDropdown}>
                        {termOptions.map(term => (
                          <Pressable
                            key={term.termCode}
                            onPress={() => {
                              setSelectedTerm(term.termCode);
                              setSelectedTermId(term.id);
                              setIsTermOpen(false);
                            }}
                            style={styles.dropDownItem}>
                            <Text style={styles.dropDownItemText}>{term.termCode}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </Modal>
                  )}
                </View>
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab('MY_EVENTS')}
            style={({ pressed }) => [
              styles.tabItem,
              activeTab === 'MY_EVENTS' && styles.activeTab,
              pressed && { opacity: 0.85 },
            ]}>
            <Text style={[styles.tabText, activeTab === 'MY_EVENTS' && styles.activeTabText]}>
              My Events
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('UPCOMING_EVENTS')}
            style={({ pressed }) => [
              styles.tabItem,
              activeTab === 'UPCOMING_EVENTS' && styles.activeTab,
              pressed && { opacity: 0.85 },
            ]}>
            <Text style={[styles.tabText, activeTab === 'UPCOMING_EVENTS' && styles.activeTabText]}>
              Upcoming Events
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>

        <TouchableOpacity
          onPress={() => setShowModal(prev => !prev)}
          style={styles.fab}
          activeOpacity={0.8}>
          <Image
            source={showModal ? require('../../assets/Image/close.png') : require('../../assets/Image/Info.png')}
          />
        </TouchableOpacity>

        <RewardPointsModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          goalPointsData={goalPoints?.[0]}
          ocSuccessRewards={ocSuccessRewards}
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
  centerContainer: {
    height: height / 1.35,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'cyan'
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },

  header: {
    height: height / 12,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  menuContainer: {
    height: height / 18,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'space-between',
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center'
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
  filterContainer: {
    height: height / 20,
    width: width / 2.6,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  filterCon: {
    height: height / 40,
    width: width / 5,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center'
  },

  dropDownCon: {
    height: height / 40,
    width: width / 6.5,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',

  },
  dropDownWrapper: {
    position: 'relative',
    alignItems: 'flex-end',
    // backgroundColor: 'cyan'
  },
  dropDownPressed: {
    opacity: 0.9,

  },
  dropDownMenu: {
    position: 'absolute',
    top: height / 40 + 6,
    right: 0,
    minWidth: width / 6.5,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 10,

  },
  dropDownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.boderLight,
    backgroundColor: colors.white,
    borderRadius: 8

  },
  dropDownItemLast: {
    borderBottomWidth: 0,
  },
  dropDownItemPressed: {
    backgroundColor: colors.surface,

  },
  dropDownItemText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.primary,
    textAlign: 'center',
  },


  filterTxt: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.white
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
    paddingBottom: height / 10,
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
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.bold
  },
  locationCon: {
    height: height / 25,
    width: width / 1.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
    alignSelf: 'center',
    flexDirection: 'row'
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


  dateRow: {
    height: height / 14.4,
    width: width / 1.11,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    // backgroundColor: 'cyan'
  },
  dateBlock: {
    height: height / 15,
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
    height: height / 25,
    width: width / 1.2,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'lightblue',
    alignSelf: 'center',
    flexDirection: 'row'
  },

  termText: {
    fontSize: width / 30,
    color: '#667085',
    // marginTop: height / 120,
  },

  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    height: height / 35,
    width: width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25

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
    height: height / 24,
    width: width / 2.9,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  modalDropdown: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 50,
    right: 25,
    minWidth: width / 6.5,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },


});
