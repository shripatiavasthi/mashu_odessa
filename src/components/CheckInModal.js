import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { colors, typography } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const CheckInModal = ({
  visible,
  onClose,
  eventName,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [activityId, setActivityId] = useState('');

    const navigation = useNavigation();


  useEffect(() => {
    if (!visible) {
      setStep(1);
      setActivityId('');
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Check In Now</Text>

          
          {step === 1 && (
            <>
              <View style={styles.iconWrap}>
                <Image
                  source={require('../assets/Image/Calendar.png')}
                  style={styles.icon}
                />
              </View>

              <Text style={styles.text}>
                Are you sure do you want to check in{'\n'}
                <Text style={styles.bold}>{eventName}</Text>
              </Text>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => setStep(2)}
                >
                  <Text style={styles.confirmText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.heading}>Event Check-In</Text>

              <Text style={styles.description}>
                To proceed with the check-in, enter the Activity ID you received
                from the event organizer.{'\n\n'}
                Once submitted, we will verify the ID and complete your check-in.
              </Text>

              <Text style={styles.label}>Activity ID</Text>
              <TextInput
                placeholder="Enter activity ID"
                value={activityId}
                onChangeText={setActivityId}
                style={styles.input}
              />

              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.confirmBtn,
                    !activityId && { opacity: 0.5 },
                  ]}
                  disabled={!activityId}
                  onPress={() => {
                    onSubmit(activityId);
                    onClose();
                    navigation.navigate('EventSuccessScreens')
                  }}
                >
                  <Text style={styles.confirmText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CheckInModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingBottom: 16,
  },

  /* Header */
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  /* STEP 1 */
  iconWrap: {
    marginTop: 24,
    alignItems: 'center',
  },

  icon: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },

  text: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: '#4B5563',
    paddingHorizontal: 24,
    lineHeight: 20,
  },

  bold: {
    fontWeight: '700',
    color: '#111827',
  },

  /* STEP 2 */
  heading: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#0A58A8',
    textAlign: 'center',
  },

  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  label: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  input: {
    marginTop: 8,
    marginHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 24,
  },

  cancelBtn: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cancelText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  confirmBtn: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#0A58A8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

