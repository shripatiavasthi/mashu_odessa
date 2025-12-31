import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppGradient from '../../components/AppGradient';
import Group from '../../assets/svg/Group.svg';
import Svg, { Circle, Rect } from 'react-native-svg';



const { height, width } = Dimensions.get('screen');

const ChooseRoleScreen = ({ navigation }) => {
  return (
    <AppGradient style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Image/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.title}>Choose Your Role</Text>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.card}
        // onPress={() => navigation.navigate('StudentLogin')}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/Image/graduated.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textBox}>
            <View style={styles.cardBox}>
              <Text style={styles.cardTitle}>Student</Text>
            </View>
            <View style={styles.cardDescBox}>
              <Text style={styles.cardDesc}>
                Choose this if you actively attend OC as a student
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EmployeeLoginScreen')}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/Image/Group.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            {/* <Group width={120} height={40} /> */}



          </View>
          <View style={styles.textBox}>
            <View style={styles.cardBox}>
              <Text style={styles.cardTitle}>Employee</Text>
            </View>
            <View style={styles.cardDescBox}>
              <Text style={styles.cardDesc}>
                Choose this if you work for the college
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={styles.card}
        // onPress={() => navigation.navigate('CommunityFlow')}
        >
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/Image/network.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textBox}>
            <View style={styles.cardBox}>
              <Text style={styles.cardTitle}>Community</Text>
            </View>
            <View style={styles.cardDescBox}>
              <Text style={styles.cardDesc}>
                Choose this if you're not a current student or employee.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>



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
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  logo: {
    width: width * 0.70,
    height: height * 0.13,
    alignSelf: 'center',
  },
  roleContainer: {
    height: height / 10,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#006BB6',
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
    backgroundColor: '#006BB60D',
    borderRadius: 8,
    height: height / 8.5,
    width: width / 1.1,
    alignSelf: 'center',
    // marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#00A2E5',
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
    // marginRight: width * 0.04,
    // tintColor: '#1E63B5',
  },
  textBox: {
    height: height / 10,
    width: width / 1.4,
    // backgroundColor: 'lightblue',
  },
  cardBox: {
    height: height / 20,
    width: width / 1.9,
    // backgroundColor: 'magenta',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#414651',
    fontFamily: 'Open Sans',

  },
  cardDescBox: {
    // height: height / 20,
    width: width / 1.9,
    // backgroundColor: 'lime',
    justifyContent: 'center',

  },
  cardDesc: {
    fontSize: 12,
    color: '#414651',
    fontWeight: '600',
    // marginTop: height * 0.004,
    lineHeight: 18,
    fontFamily: 'Open Sans',
  },
});
