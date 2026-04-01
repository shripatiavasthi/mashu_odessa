import React from 'react';
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
const { width, height } = Dimensions.get('window');

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeMenu = useSelector(state => state.app.activeMenu);



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
  const isPlcEvent =
    activeMenu === 'plc' ||
    Array.isArray(event?.eventType) ||
    event?.eventPlcCredits !== undefined;

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
  const eventMetric = isPlcEvent
    ? Number.isFinite(event?.eventPlcCredits)
      ? `${event.eventPlcCredits} PLC Credit${event.eventPlcCredits === 1 ? '' : 's'}`
      : Number.isFinite(event?.eventPoints)
        ? `${event.eventPoints} Points`
        : '0 PLC Credit'
    : `${event?.eventPoints || event?.points || '0'} Pts`;

  const [eventDatePart, eventTimePart] = isPlcEvent
    ? splitDateTime(event?.eventStartDateTime)
    : [event?.date || 'N/A', event?.startTime || 'N/A'];

  const [checkInDatePart, checkInTimePart] = splitDateTime(
    isPlcEvent ? event?.eventCheckInTime : event?.checkInTime,
  );

  return (
    <AppGradient style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#006BB6', '#00A2E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
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
            <View style={styles.eventnameCon}>
              <Text style={styles.label}>Event Name</Text>
            </View>
            <View style={styles.valueCon}>
              <Text style={styles.value}>{eventName}</Text>
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
            <>
              <View style={styles.section}>
                <View style={styles.eventnameCon}>
                  <Text style={styles.label}>Event Check-In Date</Text>
                </View>
                <View style={styles.valueCon}>
                  <Text style={styles.value}>
                    {checkInDatePart} | {checkInTimePart}
                    {/* {event.date} | {event.startTime || 'N/A'} */}
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.eventnameCon}>
              <Text style={styles.label}>
                Event Points :{' '}
                <Text style={styles.value}>{eventMetric}</Text>
              </Text>
            </View>
          </View>
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
  valueCon: {
    // height: height / 25,
    paddingBottom: 15,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    // justifyContent: 'center'
  },
  section: {
    // marginBottom: 22,
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
