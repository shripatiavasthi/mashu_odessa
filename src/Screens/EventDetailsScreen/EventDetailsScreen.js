import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import AppGradient from '../../components/AppGradient';
import CheckInModal from '../../components/CheckInModal';


const { width, height } = Dimensions.get('window');

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeMenu = useSelector(state => state.app.activeMenu);

  const [showCheckInModal, setShowCheckInModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);



  const { data: event, terms, fromTab } = route.params || {};


  if (!event) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 18 }}>
          No event data available
        </Text>
      </SafeAreaView>
    );
  }

  const isMyEvent = fromTab === 'MY_EVENTS';
  const isUpcomingEvent = fromTab === 'UPCOMING_EVENTS';
  const isPlcEvent =
    activeMenu === 'plc' ||
    Array.isArray(event?.eventType) ||
    event?.eventPlcCredits !== undefined;
  const showCheckInButton = isUpcomingEvent && Boolean(event?.showCheckInButton);

  const splitDateTime = value => {
    if (typeof value !== 'string' || !value.trim()) {
      return ['N/A', 'N/A'];
    }

    const normalized = value.trim();
    return [normalized.slice(0, 10) || 'N/A', normalized.slice(11) || 'N/A'];
  };

  const eventName = event?.name || event?.title || event?.eventName || 'N/A';
  const eventLocation = event?.location || event?.eventLocation || 'N/A';
  const eventTerm = event?.termCode || terms || 'N/A';
  const eventType = Array.isArray(event?.eventType)
    ? event.eventType.filter(Boolean).join(', ')
    : event?.eventType || 'N/A';
  const eventCategory = event?.eventCategory || 'N/A';
  const isTeamEvent = event?.eventMode === 'team';
  const hasPlcCredits = Number.isFinite(event?.eventPlcCredits);
  const metricLabel = hasPlcCredits ? 'PLC Credit' : 'Event Points';
  const metricValue = hasPlcCredits
    ? `${event.eventPlcCredits} PLC Credit${event.eventPlcCredits === 1 ? '' : 's'}`
    : `${event?.eventPoints || event?.points || '0'} Points`;

  const [eventDatePart, eventTimePart] = isPlcEvent
    ? splitDateTime(event?.eventStartDateTime)
    : [event?.date || 'N/A', event?.startTime || 'N/A'];

  const [checkInDatePart, checkInTimePart] = splitDateTime(
    isPlcEvent ? event?.eventCheckInTime : event?.checkInTime,
  );

  const [eventEndDatePart, eventEndTimePart] = isPlcEvent
    ? splitDateTime(event?.eventEndDateTime)
    : [event?.endDate || event?.date || 'N/A', event?.endTime || 'N/A'];

    

  return (
    <AppGradient style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#006BB6', '#00A2E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
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
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowCon}>
              <Image
                source={require('../../assets/Image/back.png')}
                style={styles.backIcon}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Event Details</Text>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.eventNameHeader}>
              <Text style={styles.label}>Event Name</Text>
            </View>
            <View style={styles.titlevalueCon}>
              <Text style={styles.titleValue}>{eventName}
              </Text>

              {isTeamEvent && (
                <View style={styles.teamEventBadge}>
                  <Text style={styles.teamEventText}>Team Event</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.divider} />

          {isPlcEvent ? (
            <View style={styles.section}>
              <View style={styles.eventnameCon}>
                <Text style={styles.label}>
                  Event Type : <Text style={styles.value}>{eventType}</Text>
                </Text>
              </View>
              <View style={styles.eventnameCon}>
                <Text style={styles.label}>
                  Event Category : <Text style={styles.value}>{eventCategory}</Text>
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.section}>
              <View style={styles.eventnameCon}>
                <Text style={styles.label}>
                  Term : <Text style={styles.value}>{eventTerm}</Text>
                </Text>
              </View>
            </View>
          )}


          <View style={styles.section}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                Event Location: <Text style={styles.value}>{eventLocation}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.divider} />




          {!isPlcEvent && (
            <>
              <View style={styles.section}>
                <View style={styles.eventnameCon}>
                  <Text style={styles.label}>Event Date</Text>
                </View>
                <View style={styles.valueCon}>
                  <Text style={styles.value}>
                    {eventDatePart} | {eventTimePart}
                  </Text>
                </View>
              </View>

              {isMyEvent && (
                <View style={styles.section}>
                  <View style={styles.eventnameCon}>
                    <Text style={styles.label}>Event Check-In Date</Text>
                  </View>
                  <View style={styles.valueCon}>
                    <Text style={styles.value}>
                      {checkInDatePart} | {checkInTimePart}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}

          {isPlcEvent && (
            <View style={styles.dateSectionCon}>
              <View style={styles.section}>
                <View style={styles.nameCon}>
                  <Text style={styles.label}>Event Start Date</Text>
                </View>
                <View style={styles.titleCon}>
                  <Text style={styles.dateValue}>
                    {eventDatePart} | {eventTimePart}
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.nameCon}>
                  <Text style={styles.label}>Event End Date</Text>
                </View>
                <View style={styles.titleCon}>
                  <Text style={styles.dateValue}>
                    {eventEndDatePart} | {eventEndTimePart}
                  </Text>
                </View>
              </View>

              {isMyEvent && (
                <View style={styles.section}>
                  <View style={styles.nameCon}>
                    <Text style={styles.label}>Event Check-In Date</Text>
                  </View>
                  <View style={styles.titleCon}>
                    <Text style={styles.dateValue}>
                      {checkInDatePart} | {checkInTimePart}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.eventnameCon}>
              <Text style={styles.label}>
                {metricLabel} : <Text style={styles.value}>{metricValue}</Text>
              </Text>
            </View>
          </View>
          {showCheckInButton && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSelectedEvent({
                    id: event?.id || event?.eventId,
                    name: eventName,
                  });
                  setShowCheckInModal(true);
                }}>
                <Text style={styles.buttonText}>Check In Now</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </SafeAreaView>
    </AppGradient>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF',

  },

  /* Header */
  header: {
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'red'
  },
  headerContent: {
    height: height / 14,
    width: width / 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'cyan',

  },
  arrowCon: {
    height: height / 14,
    width: width / 7.5,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: colors.white,
  },
  headerTitle: {
    // marginLeft: 12,
    fontSize: typography.size.lg,
    color: colors.white,
    fontWeight: '700',
    fontFamily: typography.semiBold
  },

  content: {
    height: height / 10,
    width: width / 1.1,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: colors.boderLight
  },

  eventnameCon: {
    height: height / 22,
    width: width / 1.1,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  dateSectionCon: {
    width: width,
    paddingVertical: 8,
  },
  nameCon: {
    height: height / 25,
    width: width / 1.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  titleCon: {
    minHeight: height / 35,
    width: width / 1.1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },
  eventNameHeader: {
    minHeight: height / 22,
    width: width / 1.1,
    alignSelf: 'center',
    // justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: width / 40,
  },
  valueCon: {
    // height: height / 25,
    paddingBottom: 15,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    // justifyContent: 'center'
  },
  titlevalueCon: {
    flexDirection: 'row',
    alignSelf: 'center',
    // flexShrink: 1,
    // justifyContent: 'center',
    // width: width / 1.75,
    gap: width / 50,

    // // height: height / 25,
    paddingBottom: 15,
    width: width / 1.1,
    // backgroundColor: 'lightblue',
    // flexDirection: 'row',
    // alignSelf: 'center',
    // // justifyContent: 'center',
    alignItems: 'center',

  },
  label: {
    fontSize: typography.size.sm,
    color: colors.grayDark,
    fontFamily: typography.regular,
    fontWeight: '400'
  },
  value: {
    fontSize: typography.size.sm,
    color: colors.textDark,
    fontWeight: '700',
    fontFamily: typography.bold
  },
  dateValue: {
    fontSize: typography.size.sm,
    color: colors.textDark,
    fontWeight: '700',
    fontFamily: typography.bold
  },

  titleValue: {
    width: width / 1.55,
    fontSize: typography.size.sm,
    color: colors.textDark,
    fontWeight: '700',
    fontFamily: typography.bold
  },
  row: {

    // marginBottom: 16,
  },
  labelContainer: {
    // height: height / 20,
    paddingVertical: 15,
    width: width / 1.1,
    // backgroundColor: 'cyan',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.boderLight,
    justifyContent: 'center'
  },
  rowLabelCon: {
    height: height / 22,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',

  },
  rowLabel: {
    fontSize: typography.size.sm,
    color: colors.grayDark,
    fontWeight: '400'
  },
  rowValue: {
    fontSize: typography.size.md,
    color: colors.textDark,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontFamily: typography.regular
  },

  divider: {
    height: 1,
    width: width / 1.1,
    backgroundColor: colors.boderLight,
    // marginTop: 18
    alignSelf: 'center'
  },
  teamEventBadge: {
    backgroundColor: '#FFF4E5',
    borderRadius: 16,
    height: height / 40,
    width: width / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamEventText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C56A16',
    fontFamily: typography.semiBold,
  },

   buttonContainer: {
    height: height / 3,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  button: {
    height: height / 22,
    width: width / 1.2,
    backgroundColor: '#2E6FB6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#F6FBFF',

//   },

//   linearStyle:{
//     height: height/1.05,
//     width: width/1
//   },

//   header: {
//     height: height / 14,
//     width: width / 1,
//     // backgroundColor: 'red'
//   },
//   headerContent: {
//     height: height / 14,
//     width: width / 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: 'cyan',

//   },
//   arrowCon: {
//     height: height / 14,
//     width: width / 7.5,
//     // backgroundColor: 'cyan',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   backIcon: {
//     width: 25,
//     height: 25,
//     tintColor: colors.white,
//   },
//   headerTitle: {
//     // marginLeft: 12,
//     fontSize: typography.size.lg,
//     color: colors.white,
//     fontWeight: '700',
//     fontFamily: typography.semiBold
//   },

//   content: {
//     height: height / 10,
//     width: width / 1.1,
//     // backgroundColor: 'cyan',
//     alignSelf: 'center',
//     borderBottomWidth: 1,
//     borderColor: colors.boderLight
//   },

//   eventnameCon: {
//     height: height / 22,
//     width: width / 1.1,
//     // backgroundColor: 'yellow',
//     alignSelf: 'center',
//     justifyContent: 'flex-end'
//   },
//   valueCon: {
//     height: height / 25,
//     width: width / 1.1,
//     // backgroundColor: 'blue',
//     alignSelf: 'center',
//     // justifyContent: 'center'
//   },
//   section: {
//     // marginBottom: 22,
//   },

//   label: {
//     fontSize: typography.size.sm,
//     color: colors.grayDark,
//     fontFamily: typography.regular,
//     fontWeight: '400'
//   },
//   value: {
//     fontSize: typography.size.md,
//     color: colors.textDark,
//     fontWeight: '700',
//   },

//   row: {

//     // marginBottom: 16,
//   },
//   labelContainer: {
//     height: height / 20,
//     width: width / 1.1,
//     // backgroundColor: 'cyan',
//     alignSelf: 'center',
//     borderBottomWidth: 0.5,
//     borderColor: colors.boderLight,
//     justifyContent: 'center'
//   },
//   rowLabelCon: {
//     height: height / 22,
//     width: width / 1.1,
//     // backgroundColor: 'blue',
//     alignSelf: 'center',

//   },
//   rowLabel: {
//     fontSize: typography.size.sm,
//     color: colors.grayDark,
//     fontWeight: '400'
//   },
//   rowValue: {
//     fontSize: typography.size.md,
//     color: colors.textDark,
//     fontWeight: '700',
//     paddingHorizontal: 10,
//     fontFamily: typography.regular
//   },

//   divider: {
//     height: 1,
//     width: width / 1.1,
//     backgroundColor: colors.boderLight,
//     // marginTop: 18
//     alignSelf: 'center'
//   },
// });
