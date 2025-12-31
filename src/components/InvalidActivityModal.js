import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import Svg, { Circle, Rect, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const InvalidActivityModal = ({ visible, onCancel, onRetry }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Card */}
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Event Check In</Text>
          </View>

          <View style={styles.divider} />

          {/* Icon */}
          <View style={styles.iconContainer}>
            {/* <Svg
              height={height / 7}
              width={height / 7}
              viewBox="0 0 100 100"
            >
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E53935"
                strokeWidth="6"
                fill="none"
              />
              <Rect
                x="30"
                y="28"
                width="40"
                height="32"
                rx="6"
                stroke="#E53935"
                strokeWidth="5"
                fill="none"
              />
              <Path
                d="M42 48 L48 54 L60 42"
                stroke="#E53935"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg> */}
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Invalid Activity ID</Text>
          </View>

          {/* Description */}
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
    width: width / 1.15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: height / 40,
  },

  header: {
    height: height / 18,
    justifyContent: 'center',
    paddingHorizontal: width / 15,
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

  iconContainer: {
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    height: height / 14,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: height / 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
});
