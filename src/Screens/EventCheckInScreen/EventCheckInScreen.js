import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { submitActivityId, resetCheckIn } from '../../store/slices/checkInSlice';
import { selectAuth, selectCheckIn } from '../../store';
import InvalidActivityModal from '../../components/InvalidActivityModal';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import RewardPointsModal from '../../components/RewardPointsModal';

const { height, width } = Dimensions.get('window');

const EventCheckInScreen = ({ navigation, route }) => {
  const [activityId, setActivityId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectCheckIn);
  const { accessToken, user: authUser } = useAppSelector(selectAuth);
  const { user, accessToken: navToken } = route.params || {};
  const [showModal, setShowModal] = useState(false);

  const isValidActivityId = /^\d{4}$/.test(activityId);

  const onCheckIn = async () => {

    navigation.navigate('CheckInSuccessScreen')

    // const trimmedId = activityId.trim();

    // if (!/^\d{4}$/.test(trimmedId)) {
    //   Alert.alert('Invalid Activity ID', 'Activity ID must be exactly 4 digits.');
    //   return;
    // }

    // console.log('Activity ID:', trimmedId);

    // try {
    //   const token = navToken || accessToken;
    //   const response = await dispatch(
    //     submitActivityId({activityId: trimmedId, token}),
    //   ).unwrap();

    //   dispatch(resetCheckIn());
    //   navigation.navigate('CheckInSuccessScreen', {
    //     activityId: trimmedId,
    //     user: user || authUser,
    //     response,
    //   });
    // } catch (err) {
    //   setModalVisible(true);
    // }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.container}>
        <AppHeader />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Event Check-In</Text>
            </View>

            <View style={styles.headerContainers}>
              <Text style={styles.description}>
                To proceed with the check-in, enter the Activity ID you received
                from the event organizer.
              </Text>
            </View>

            <View style={styles.headerContainer}>
              <Text style={styles.description}>
                Once submitted, we will verify the ID and complete your check-in.
              </Text>
            </View>

            <View style={styles.labelContainer}>
              <Text style={styles.label}>Activity ID</Text>
            </View>

            <View style={styles.spacer}>
              <TextInput
                value={activityId}
                onChangeText={text =>
                  setActivityId(text.replace(/[^0-9]/g, ''))
                }
                placeholder="Enter Activity ID"
                keyboardType="number-pad"
                style={styles.input}
                maxLength={4}
              />
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isValidActivityId || status === 'loading') &&
                  styles.disabledButton,
                ]}
                onPress={onCheckIn}
                disabled={!isValidActivityId || status === 'loading'}
              >
                <Text
                  style={[
                    styles.buttonText,
                    (!isValidActivityId || status === 'loading') &&
                    styles.disabledButtonText,
                  ]}
                >
                  {status === 'loading' ? 'Checking in...' : 'Check-In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <InvalidActivityModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onRetry={() => {
              setModalVisible(false);
              setActivityId('');
              dispatch(resetCheckIn());
            }}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={() => setShowModal(prev => !prev)}
          style={styles.fab}
          activeOpacity={0.8}
        >
          <Image
            source={
              showModal
                ? require('../../assets/Image/close.png')
                : require('../../assets/Image/Info.png')
            }
          />
        </TouchableOpacity>

        <RewardPointsModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />

      </AppGradient>
    </SafeAreaView>
  );
};

export default EventCheckInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  headerContent: {
    height: height / 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: typography.regular,
  },
  headerContainer: {
    height: height / 15,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerContainers: {
    height: height / 15,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: typography.regular,
  },
  labelContainer: {
    height: height / 15,
    width: width / 1.2,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    fontFamily: typography.regular,
  },
  spacer: {
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: height / 22,
    width: width / 1.2,
    borderColor: '#99999980',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: colors.white,
    fontSize: 16,
    fontFamily: typography.regular,
  },
  btnContainer: {
    height: height / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    height: height / 22,
    width: width / 1.2,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: typography.regular,
  },
  disabledButtonText: {
    color: '#FFFFFFAA',
  },


  fab: {
    position: 'absolute',
    right: width / 18,
    bottom: Platform.OS === 'ios' ? height / 10 : height / 10,
    height: width / 7,
    width: width / 7,
    borderRadius: width / 12,
    backgroundColor: '#006BB6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  fabText: {
    color: '#FFFFFF',
    fontSize: width / 18,
    fontWeight: '700',
  },

});
