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
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={onRetry}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
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
    height: height/2,
    width: width / 1.05,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    // paddingVertical: height / 40,
  },

  header: {
    height: height / 14,
    width: width/1.3,
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
    width: width/ 1.15,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E53935',
  },

  descContainer: {
    width: width / 1.3,
    alignSelf: 'center',
    marginBottom: height / 50,
    // backgroundColor: 'pink'
  },
  description: {
    fontSize: 14,
    color: '#414651',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    height: height / 14,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },

  cancelButton: {
    height: height / 20,
    width: width / 3.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#414651',
  },

  retryButton: {
    height: height / 20,
    width: width / 3.2,
    borderRadius: 10,
    backgroundColor: '#245A9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
    iconContainer: {
    height: height / 6.5,
    width: width/1.15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },

  iconStyle:{
    height: 90,
    width: 90,
    resizeMode: 'contain'
  },
  
});