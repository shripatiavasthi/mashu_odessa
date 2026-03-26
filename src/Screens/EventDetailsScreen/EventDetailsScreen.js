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
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import AppGradient from '../../components/AppGradient';
const { width, height } = Dimensions.get('window');

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();



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

  const checkInFull = event.checkInTime || 'Not checked in yet';

  const [checkInDatePart, checkInTimePart] = checkInFull.includes(' ')
    ? checkInFull.split(' ')
    : [checkInFull, 'N/A'];

  return (
      
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.linearStyle}>
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
            <Text style={styles.value}>{event.name || event.title || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.eventnameCon}>
            <Text style={styles.label}>
              Term : <Text style={styles.value}>{terms || 'N/A'}</Text>
            </Text>
          </View>
        </View>


        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              Event Location: <Text style={styles.value}>{event.location || 'N/A'}</Text>
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
              {event.date} | {event.startTime || 'N/A'}
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
              <Text style={styles.value}>{event.eventPoints || event.points || '0'} Pts</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      </AppGradient>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F6FBFF',

  },

  linearStyle:{
    height: height/1.05,
    width: width/1
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
    height: height / 25,
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
    fontSize: typography.size.md,
    color: colors.textDark,
    fontWeight: '700',
  },

  row: {

    // marginBottom: 16,
  },
  labelContainer: {
    height: height / 20,
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
