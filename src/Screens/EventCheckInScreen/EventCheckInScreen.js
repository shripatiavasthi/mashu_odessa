import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { submitEventCheckIn, resetCheckIn } from '../../store/slices/checkInSlice';
import { selectAuth, selectCheckIn } from '../../store';
import InvalidActivityModal from '../../components/InvalidActivityModal';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import styles from './EventCheckInstyles';


const { height, width } = Dimensions.get('window');

const EventCheckInScreen = ({ navigation, route }) => {
  const [activityId, setActivityId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectCheckIn);
  const { accessToken, user: authUser } = useAppSelector(selectAuth);
  const { user, accessToken: navToken } = route.params || {};
  const [showModal, setShowModal] = useState(false);

  const isValidActivityId = /^\d{6}$/.test(activityId);
  
  const onCheckIn = async () => {
    const trimmedId = activityId.trim();

    if (!trimmedId) {
      Alert.alert('Invalid Activity ID', 'Please enter an Activity ID.');
      return;
    }

    try {
      const token = navToken || accessToken;
      const resolvedUserId = user?.id || authUser?.id;

      const response = await dispatch(
        submitEventCheckIn({
          eventCode: trimmedId,
          userId: resolvedUserId,
          token,
        }),
      ).unwrap();


      navigation.navigate('EventSuccessScreens', {
        activityId: trimmedId,
        user: user || authUser,
        response,
      });
    } catch (err) {
      setModalVisible(true);
    }
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
                <View style={styles.inputSection}>
              <View style={styles.inputContainer}>
              
              <TextInput
                value={activityId}
                placeholderTextColor="#999"
                onChangeText={text =>
                  setActivityId(text.replace(/[^0-9]/g, ''))
                }
                placeholder="Enter Activity ID"
                keyboardType="number-pad"
                style={styles.input}
                maxLength={6}
              />
              </View>
              </View>
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

      </AppGradient>
    </SafeAreaView>
  );
};

export default EventCheckInScreen;

