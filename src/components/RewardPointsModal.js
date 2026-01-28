import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography } from '../styles/globalStyles';

const { height, width } = Dimensions.get('screen');

const RewardPointsModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Overlay – closes modal when pressed */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => { }}>
          <LinearGradient
            colors={['#0B6FB6', '#0FA3E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Reward Points for This Term</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Goal Points</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.points}>🏁 1500</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.amount}>$ 25</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Double Down Points</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.points}>🏁 3000</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.amount}>$ 50</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Challenge Score Points</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.points}>🏁 3200</Text>
              <Text style={styles.divider}>|</Text>
              <Text style={styles.amount}>$ 100</Text>
            </View>

            {/* <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity> */}
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default RewardPointsModal;


const styles = StyleSheet.create({
  overlay: {
    height: height / 1,
    width: width / 1,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: height / 4.9
  },
  container: {
    height: height / 5.5,
    width: width * 0.8,
    borderRadius: 10,
    // padding: 22,
    // backgroundColor: 'cyan'
  },
  titleContainer:{
    height: height / 23,
    width: width * 0.7,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    fontSize: typography.size.md,
    color: colors.white,
    fontWeight: '700',
    // marginBottom: 18,

  },
  row: {
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    width: width * 0.7,
    alignSelf: 'center'
  },
  label: {
    color: colors.white,
    fontSize: typography.size.xs,
    flex: 1.6,
  },
  divider: {
    color: colors.white,
    marginHorizontal: 8,
    opacity: 0.7,
  },
  points: {
    color: colors.white,
    fontSize: typography.size.sm,
    flex: 1,
  },
  amount: {
    color: colors.white,
    fontSize: typography.size.sm,
    flex: 0.8,
  },
  closeBtn: {
    marginTop: 18,
    alignSelf: 'flex-end',
  },
  // closeText: {
  //   color: colors.white,
  //   fontSize: typography.size.md,
  //   fontWeight: '600',
  // },
});
