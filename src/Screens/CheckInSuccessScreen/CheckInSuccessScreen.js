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
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Entypo';

const { height, width } = Dimensions.get('window');

const CheckInSuccessScreen = ({ navigation }) => {
  const route = useRoute();
  const data = route?.params?.response?.data
 
  const handleVisitEvents = () => {
    const parentNav = navigation.getParent?.();
    if (parentNav) {
      parentNav.navigate('Events', { initialTab: 'MY_EVENTS' });
      return;
    }
    navigation.navigate('Events', { initialTab: 'MY_EVENTS' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.gradient}>
        <AppHeader />

        <View style={styles.container}>


          <View style={styles.iconOuter}>
            {/* <View style={styles.iconCircle}> */}
            <Image
              source={require('../../assets/Image/Calendar.gif')}
              resizeMode="contain"
              style={styles.checkIcon}
            />
            {/* </View> */}
          </View>


          <View style={styles.textContainer}>
            <Text style={styles.successText}>
              You have successfully checked in to the{'\n'}
              <Text style={styles.boldText}>“Convocation”</Text> event
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Event Name: <Text style={styles.detailBold}>{data.eventName}</Text>
              </Text>
            </View>
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Event Date:{' '}
                <Text style={styles.detailBold}>
                   {data.date} | {data.startTime}
                </Text>
              </Text>
            </View>
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Event Location:{' '}
                <Text style={styles.detailBold}>{data.eventLocation}</Text>
              </Text>
            </View>

            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Term : <Text style={styles.detailBold}>{data.termCode}</Text>
              </Text>
            </View>
            
            <View style={styles.detailRowContainer}>
              <Text style={styles.detailText}>
                Event Points :{' '}
                <Text style={styles.detailBold}>{data.eventPoints}</Text>
              </Text>
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleVisitEvents}
            >
              <Text style={styles.buttonText}>Visit Events</Text>
            </TouchableOpacity>
          </View>

        </View>
      </AppGradient>
    </SafeAreaView>
  );
};

export default CheckInSuccessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    height: height / 1.2,
    width: width,
    alignItems: 'center',
  },


  iconOuter: {
    height: height / 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  iconCircle: {
    height: height / 6,
    width: height / 6,
    borderRadius: height / 12,
    borderWidth: 4,
    borderColor: '#2E6FB6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
      height: 100,
      width: 100
    // backgroundColor: 'cyan'
  },

  /* Text */
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

  /* Divider */
  divider: {
    height: 1,
    width: width / 1.2,
    backgroundColor: '#99999980',
    marginVertical: height / 40,

  },

  /* Details */
  detailsContainer: {
    height: height / 5,
    width: width / 1.2,
    // justifyContent: 'space-evenly',
    // backgroundColor: 'pink',
  },
  detailRowContainer: {
    height: height / 25,
    width: width / 1.2,
    // justifyContent: 'space-evenly',
    // backgroundColor: 'lightblue',
  },
  detailText: {
    fontSize: 14,
    color: '#414651',
  },
  detailBold: {
    fontWeight: '700',
    color: '#414651',
  },

  /* Button */
  buttonContainer: {
    height: height / 6,
    width: width / 1,
    justifyContent: 'center',
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
