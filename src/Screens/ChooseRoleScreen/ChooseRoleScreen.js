import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../../store/slices/appSlice';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Entypo';

import OcAllInIcon from '../../assets/Image/svg/OcAllIn.svg';
import Plc from '../../assets/Image/svg/Plc.svg';
import Thirty from '../../assets/Image/svg/Thirty.svg';

const { height, width } = Dimensions.get('screen');

const ChooseRoleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAllIn = () => {
    console.log('OC All-In selected');
    dispatch(setActiveMenu('oc'));
    navigation.navigate('MainTabs')
  };

  const handlePLC = () => {
    console.log('PLC selected');
    dispatch(setActiveMenu('plc'));
    navigation.navigate('MainTabs')
  };

  const handleThirty = () => {
    Alert.alert(
      'WorkInProgress!',
      'Working now on 30 login flow, check back soon!'
    );
  };

  return (
    <AppGradient style={styles.safeArea}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colors.primary} /> */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>

            <Image
              source={require('../../assets/Image/NewLogo.png')}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.roleContainer}>
            <Text style={styles.title}>Select a feature to proceed</Text>
          </View>

          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.card} onPress={handleAllIn}>
              <View style={styles.iconContainer}>
                <OcAllInIcon width={42} height={42} color={colors.primaryDark} />
              </View>

              <View style={styles.textBox}>
                <View style={styles.cardBox}>
                  <Text style={styles.cardTitle}>OC All-In</Text>
                </View>
                <View style={styles.cardDescBox}>
                  <Text style={styles.cardDesc}>
                    Please log in to access the employee reward program
                  </Text>
                </View>
              </View>
              <Icon name="chevron-with-circle-right" size={20} color="#0e0707" />
            </TouchableOpacity>
          </View>

          <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.card} onPress={handlePLC}>
              <View style={styles.iconContainer}>
                <Plc width={42} height={42} color={colors.primaryDark} />
              </View>

              <View style={styles.textBox}>
                <View style={styles.cardBox}>
                <Text style={styles.cardTitle}>Professional Learning Center</Text>
                </View>
                <View style={styles.cardDescBox}>
                <Text style={styles.cardDesc}>
                  Please log in to access the PLC credits
                </Text>
                </View>
              </View>
              <Icon name="chevron-with-circle-right" size={20} color="#666666" />
          </TouchableOpacity>
          </View>

          <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.card} onPress={handleThirty}>
            
              <View style={styles.iconContainer}>
                <Thirty width={42} height={42} color={colors.primaryDark} />
              </View>
              <View style={styles.textBox}>
                <View style={styles.cardBox}>
                <Text style={styles.cardTitle}>30 For 30 Fitness Challenge</Text>
                </View>
                <View style={styles.cardDescBox}>
                <Text style={styles.cardDesc}>
                  Please log in to access the fitness challenge
                </Text>
              </View>
            </View>
              <Icon name="chevron-with-circle-right" size={20} color="#666666" />
          </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
      </SafeAreaView>
    </AppGradient>
  );
};

export default ChooseRoleScreen;

const styles = StyleSheet.create({
  container: {
    height: height / 1,
    width: width / 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageContainer: {
    height: height / 3.5,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  logo: {
    width: width * 0.70,
    height: height * 0.13,
    alignSelf: 'center',
  },
  roleContainer: {
    height: height / 15,
    width: width / 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 24,
  },
  boxContainer: {
    height: height / 7.5,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  card: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    borderRadius: 8,
    height: height / 9,
    width: width / 1.1,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  iconContainer: {
    width: width * 0.2,
    height: height / 10,

    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange'
  },
  icon: {
    width: width * 0.16,
    height: height / 20,

  },
  textBox: {
    height: height / 10,
    width: width / 1.6,
    // backgroundColor: 'lightblue',
    // justifyContent: 'center'
  },
  cardBox: {
    height: height / 25,
    width: width / 1.6,
    // backgroundColor: 'magenta',
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#414651',
    fontFamily: 'Open Sans',
    textAlign: 'auto',

  },
  cardDescBox: {
    height: height / 20,
    width: width / 1.7,
    // backgroundColor: 'lime',
    // justifyContent: 'center',

  },
  cardDesc: {
    fontSize: 12,
    color: '#414651',
    fontWeight: '600',
    // marginTop: height * 0.004,
    lineHeight: 20,
    fontFamily: 'Open Sans',
  },
});

