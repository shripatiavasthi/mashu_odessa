import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { colors, typography } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import InvalidActivityModal from './InvalidActivityModal';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {submitEventCheckIn, resetCheckIn} from '../store/slices/checkInSlice';
import {selectAuth, selectCheckIn} from '../store';

const { height, width } = Dimensions.get('window')

const CheckInModal = ({
  visible,
  onClose,
  eventName,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [activityId, setActivityId] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(selectCheckIn);
  const {accessToken, user: authUser} = useAppSelector(selectAuth);


  useEffect(() => {
    if (!visible) {
      setStep(1);
      setActivityId('');
      setErrorVisible(false);
    }
  }, [visible]);

  const isValidActivityId = /^\d{6}$/.test(activityId);

  const handleCheckIn = async () => {
    const trimmedId = activityId.trim();
    if (!trimmedId) {
      setErrorVisible(true);
      return;
    }
    try {
      const response = await dispatch(
        submitEventCheckIn({
          eventCode: trimmedId,
          userId: authUser?.id,
          token: accessToken,
        }),
      ).unwrap();

      dispatch(resetCheckIn());
      onSubmit?.(trimmedId, response);
      onClose?.();
      navigation.navigate('EventSuccessScreens', {
        activityId: trimmedId,
        user: authUser,
        response,
      });
    } catch (err) {
      setErrorVisible(true);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <View style={styles.modalheadCon}>
            <Text style={styles.title}>Check In Now</Text>
          </View>
          <View style={styles.cardDivider} />
          {step === 1 && (
            <>
              <View style={styles.iconWrap}>
                <Image
                  source={require('../assets/Image/Calendar.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.txtDetails}>
                <Text style={styles.text}>
                  Are you sure do you want to check in{'\n'}
                  <Text style={styles.bold}>{eventName}</Text>
                </Text>
              </View>

              <View style={styles.cardDivider} />
              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <View style={styles.checkinSpanceCon}>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.confirmText}>Check In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {step === 2 && (
            <>
            <View style={styles.checkInCon}>
              <Text style={styles.heading}>Event Check-In</Text>
            </View>
              <Text style={styles.description}>
                To proceed with the check-in, enter the Activity ID you received
                from the event organizer.{'\n\n'}
                Once submitted, we will verify the ID and complete your check-in.
              </Text>
              <View style={styles.labelCon}>
              <Text style={styles.label}>Activity ID</Text>
              </View>
              <View style={styles.txtinpCon}>
              <TextInput
                placeholder="Enter activity ID"
                value={activityId}
                onChangeText={text =>
                  setActivityId(text.replace(/[^0-9]/g, ''))
                }
                style={styles.input}
                keyboardType="number-pad"
                maxLength={6}
              />
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>


                <View style={styles.checkinSpanceCon}>
                  <TouchableOpacity
                    style={[
                      styles.confirmBtn,
                      (!isValidActivityId || status === 'loading') && { opacity: 0.5 },
                    ]}
                    disabled={!isValidActivityId || status === 'loading'}
                    onPress={handleCheckIn}
                  >
                    <Text style={styles.confirmText}>
                      {status === 'loading' ? 'Checking in...' : 'Check In'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      <InvalidActivityModal
        visible={errorVisible}
        onCancel={() => setErrorVisible(false)}
        onRetry={() => {
          setErrorVisible(false);
          setActivityId('');
          dispatch(resetCheckIn());
        }}
      />
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
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingBottom: 16,
  },


  modalheadCon: {
    height: height / 15,
    width: width / 1.25,
    // backgroundColor: "blue",
    // alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold
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

  txtDetails: {
    height: height / 12,
    width: width / 1.2,
    // backgroundColor: "blue",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },

  text: {
    // marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    color: colors.textDark,
    
    lineHeight: 20,
  },

  bold: {
    fontFamily: typography.bold,
    fontWeight: '700',
    color: colors.textDark,

  },

  checkInCon:{
     height: height / 15,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center',
    justifyContent: 'center'
  },
  heading: {
    // marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 20
  },

  description: {
    width: width/1.3,
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    // paddingHorizontal: 20,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    alignSelf: 'center'
  },
  labelCon:{
    height: height/30,
    width: width/1.2,
    alignSelf: 'center',
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    // alignItems: 'center'
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  txtinpCon:{
      height: height/15,
    width: width/1.1,
  },

  input: {
    height: height/22,
    width: width/1.2,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#111827',
  },

  /* Footer */
  footer: {
    height: height / 13,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  cardDivider: {
    height: 1,
    width: width / 1.1,
    backgroundColor: colors.boderLight,
    // marginVertical: height / 60,

  },
  cancelBtn: {
    height: height / 24,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 12,
  },

  cancelText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  checkinSpanceCon: {
    height: height / 20,
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },

  confirmBtn: {
    height: height / 24,
    width: width / 4,
    // paddingHorizontal: 20,
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
