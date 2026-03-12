import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { colors, typography } from '../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const InvalidActivityModal = ({ visible, onCancel, onRetry }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Event Check In</Text>
          </View>

          <View style={styles.divider} />

          {/* Icon */}
          <View style={styles.iconContainer}>
            <Image source={require('../assets/Image/Icons/Invalid.png')} style={styles.iconStyle} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Invalid Activity ID</Text>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.description}>
              The activity ID you have entered appears to be invalid.
            </Text>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.description}>
              Please reach out to your event coordinator to obtain the correct
              ID and proceed.
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.btnSpace}>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={onRetry}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default InvalidActivityModal;

const styles = StyleSheet.create({
  overlay: {
    height: height,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    height: height / 2.32,
    width: width / 1.1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    // paddingVertical: height / 40,
  },

  header: {
    height: height / 16,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignSelf: 'center'

  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#414651',
  },

  divider: {
    height: 1,
    backgroundColor: '#D0D5DD',
    width: '100%',
  },



  titleContainer: {
    height: height / 20,
    width: width / 1.15,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.redColor,
    fontFamily: typography.bold
  },

  descContainer: {
    height: height / 17,
    width: width / 1.3,
    alignSelf: 'center',
    // marginBottom: height / 50,
    // backgroundColor: 'pink'
  },
  description: {
    fontSize: 14,
    color: '#414651',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: typography.semiBold
  },

  buttonRow: {
    // flexDirection: 'row',
    height: height / 14,
    width: width / 1.1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  btnContainer: {
    height: height / 14,
    width: width / 1.2,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnSpace: {
    height: height / 14,
    width: width / 4,
    // backgroundColor: 'yellow',
    justifyContent:'center',
    alignItems: 'flex-end'
  },

  cancelButton: {
    height: height / 25,
    width: width / 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: typography.regular,
    color: colors.textDark,
  },

  retryButton: {
    height: height / 25,
    width: width / 5,
    borderRadius: 8,
    backgroundColor: '#245A9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: typography.regular,
    color: '#FFFFFF',
  },
  iconContainer: {
    height: height / 8,
    width: width / 1.05,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',

  },

  iconStyle: {
    height: 75,
    width: 75,
    resizeMode: 'contain',
    tintColor: colors.redColor
  },

});
