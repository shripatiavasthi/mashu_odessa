import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,useRoute } from '@react-navigation/native';
import { colors, typography } from '../../styles/globalStyles';


const { width, height } = Dimensions.get('window');

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const data = route?.params?.data;
  const terms = route?.params?.terms

  const Section = ({ label, value }) => (
    <View style={styles.section}>
      <View style={styles.eventnameCon}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueCon}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  const Row = ({ label, value, boldValue }) => (
    <View style={styles.labelContainer}>
      <View style={styles.rowLabelCon}>
        <Text style={styles.rowLabel}>{label} :</Text>
        <Text style={[styles.rowValue, boldValue && styles.bold]}>
          {value}
        </Text>
      </View>
    </View>
  );

  const Divider = () => <View style={styles.divider} />;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#006BB6', '#00A2E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowCon}>
              <Image
                source={require('../../../src/assets/Image/back.png')}
                style={styles.backIcon}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Event Details</Text>
          </View>
        </LinearGradient>


        {/* Content */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Section
            label="Event Name"
            value={data.name}
          />

          {/* <Divider /> */}

          <Row label="Term" value={terms} />
          <Row label="Event Location" value={data.location} />

          <Divider />

          <Section
            label="Event Date"
            value={`${data.date } | ${data.startTime}`}
          />

          <Section
            label="Event Check- In Date"
            value={data.checkInTime}
          />

          <Divider />

          <Row
            label="Event Points"
            value={data.eventPoints}
            boldValue
          />
        </ScrollView>
      </View>
    </SafeAreaView>
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

  /* Content */
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
    fontWeight: '600'
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
    // height: height / 10,
    // width: width / 1.1,
    // // backgroundColor: 'cyan',
    // alignSelf: 'center',
    // borderBottomWidth: 0.5,
    // borderColor: colors.boderLight
  },
  rowLabelCon: {
    height: height / 22,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
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
  // bold: {
  //   fontWeight: '600',
  // },

  divider: {
    height: 1,
    backgroundColor: colors.boderLight,
    marginTop: 18
  },
});
