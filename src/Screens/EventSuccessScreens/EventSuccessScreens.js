import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';


const { height, width } = Dimensions.get('window');

const EventSuccessScreens = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const activeMenu = useSelector(state => state.app.activeMenu);

  const { response } = route.params || {};
  const data = response?.data || {};
  const isPlcResponse =
    activeMenu === 'plc' ||
    Array.isArray(data?.eventType) ||
    data?.eventPlcCredits !== undefined;

  const splitDateTime = value => {
    if (typeof value !== 'string' || !value.trim()) {
      return ['N/A', 'N/A'];
    }

    const normalized = value.trim();
    const datePart = normalized.slice(0, 10) || 'N/A';
    const timePart = normalized.slice(11) || 'N/A';

    return [datePart, timePart];
  };

  const eventName = data?.eventName || 'Event';
  const eventLocation = data?.eventLocation || 'TBD';
  const termCode = data?.termCode || 'N/A';
  const eventCategory = data?.eventCategory || 'N/A';
  const eventType = Array.isArray(data?.eventType)
    ? data.eventType.filter(Boolean).join(', ')
    : data?.eventType || 'N/A';

  const [eventStartDatePart, eventStartTimePart] = isPlcResponse
    ? splitDateTime(data?.eventStartDateTime)
    : [data?.date || 'N/A', data?.startTime || 'N/A'];

  const [eventEndDatePart, eventEndTimePart] = isPlcResponse
    ? splitDateTime(data?.eventEndDateTime)
    : [data?.endDate || data?.date || 'N/A', data?.endTime || 'N/A'];

  const [checkInDatePart, checkInTimePart] = splitDateTime(
    isPlcResponse ? data?.eventCheckInTime : data?.checkInTime,
  );

  const metricLabel = isPlcResponse ? 'PLC Credit' : 'Event Points';
  const metricValue = isPlcResponse
    ? Number.isFinite(data?.eventPlcCredits)
      ? `${data.eventPlcCredits}`
      : '0'
    : Number.isFinite(data?.eventPoints)
      ? `${data.eventPoints} Points`
      : '0 Points';

  return (
    <AppGradient style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>

        <LinearGradient
          colors={['#006BB6', '#00A2E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}>
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


        <View style={styles.container}>


          <View style={styles.iconOuter}>
            <Image
              source={require('../../assets/Image/Success.gif')}
              resizeMode="contain"
              style={styles.checkIcon}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.successText}>
              You have successfully checked in to the{'\n'}
              <Text style={styles.boldText}>“{eventName}”</Text> event
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />


          <View style={styles.detailsContainer}>
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>Event Name</Text>
            </View>
            <View style={styles.namValContainer}>
              <Text style={styles.nametxtBold}>{eventName}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            {isPlcResponse && (
              <>
                <View style={styles.locContainer}>
                  <Text style={styles.detailText}>
                    Event Type : <Text style={styles.detailBold}>{eventType}</Text>
                  </Text>
                </View>

                <View style={styles.termContainer}>
                  <Text style={styles.detailText}>
                    Event Category: <Text style={styles.detailBold}>{eventCategory}</Text>
                  </Text>
                </View>
              </>
            )}

            <View style={styles.locContainer}>
              <Text style={styles.detailText}>
                Event Location:{' '}
                <Text style={styles.detailBold}>{eventLocation}</Text>
              </Text>
            </View>

            {!isPlcResponse && (
              <View style={styles.termContainer}>
                <Text style={styles.detailText}>
                  Term : <Text style={styles.detailBold}>{termCode}</Text>
                </Text>
              </View>
            )}
          </View>

          <View style={styles.eventstartCon}>
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Event Start Date
              </Text>
            </View>
            <View style={styles.namValContainer}>
              <Text style={styles.detailBold}>
                {eventStartDatePart} | {eventStartTimePart}
              </Text>
            </View>
          </View>

          {isPlcResponse && (
            <View style={styles.eventContainer}>
              <View>
                <Text style={styles.detailText}>
                  Event End Date
                </Text>
              </View>

              <View style={styles.namValContainer}>
                <Text style={styles.detailBold}>
                  {eventEndDatePart} | {eventEndTimePart}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.eventContainer}>
            <View>
              <Text style={styles.detailText}>
                Event Check-In Date
              </Text>
            </View>

            <View style={styles.namValContainer}>
              <Text style={styles.detailBold}>
                {checkInDatePart} | {checkInTimePart}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRowContainer}>
            <Text style={styles.detailText}>
              {metricLabel} :{' '}
              <Text style={styles.detailBold}>{metricValue}</Text>
            </Text>
          </View>



          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('MainTabs', {
                  screen: 'Home',
                  params: {
                    screen: 'Events',
                    params: { initialTab: 'MY_EVENTS' },
                  },
                })
              }>

              <Text style={styles.buttonText}>Visit Events</Text>
            </TouchableOpacity>

          </View>

        </View>
      </SafeAreaView>
    </AppGradient>
  );
};

export default EventSuccessScreens;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    height: height / 1,
    width: width,
    alignItems: 'center',
  },

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
    width: 28,
    height: 28,
    tintColor: colors.white,



  },
  headerTitle: {
    // marginLeft: 12,
    fontSize: typography.size.lg,
    color: colors.white,
    fontWeight: '700',
    fontFamily: typography.semiBold
  },


  iconOuter: {
    height: height / 7,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green',
  },

  checkIcon: {
    height: 100,
    width: 100
  },


  textContainer: {
    height: height / 10,
    width: width / 1.2,
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  successText: {
    fontSize: 16,
    color: '#006BB6',
    textAlign: 'center',
    lineHeight: height / 35,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },


  divider: {
    height: 1,
    width: width / 1.1,
    backgroundColor: '#99999980',
    // marginVertical: height / 40,

  },

  eventstartCon: {
    // height: height / ,
    paddingVertical:  5,
    width: width / 1.2,
    // justifyContent: 'space-evenly',

    // backgroundColor: 'cyan',
  },

  detailsContainer: {
    // height: height / 10,
    paddingVertical:  5,
    width: width / 1.2,
    // justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: colors.boderLight,
    // backgroundColor: 'pink',
  },
  eventContainer: {
    paddingVertical: 5,
    // height: height / 14,
    width: width / 1.2,
    // justifyContent: 'space-evenly',
    // borderBottomWidth: 1,
    
    // backgroundColor: 'pink',
  },
  detailRowContainer: {
    // height: height / 35,
    paddingVertical: 5,
    width: width / 1.2,
    justifyContent: 'flex-end',
    // backgroundColor: 'lightblue',
  },
  locContainer: {
    paddingVertical: 10,
    // height: height / 22,
    width: width / 1.2,
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  detailText: {
    fontSize: 14,
    color: '#414651',
    fontWeight: '400',
    fontFamily: typography.regular
  },
  boldContainer: {
    // height: height / 25,
    paddingVertical: 8,
    width: width / 1.2,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
  },
   namValContainer: {
    // height: height / 25,
    paddingBottom: 8,
    width: width / 1.2,
    // justifyContent: 'center',
    // backgroundColor: 'lightgreen',
  },
  termContainer: {
    height: height / 27,
    width: width / 1.2,
    justifyContent: 'center',
    // backgroundColor: 'lightpink',
  },
  nametxtBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 20,
    fontFamily: typography.bold
  },
  detailBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 20,
    fontFamily: typography.bold
  },


  buttonContainer: {
    height: height / 9.2,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  button: {
    height: height / 20,
    width: width / 1.2,
    backgroundColor: colors.primary,
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
