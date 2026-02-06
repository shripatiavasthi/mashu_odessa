import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../components/AppGradient';
import { colors, typography } from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRewardTermDetails} from '../../store/slices/rewardsSlice';
import {selectAuth, selectRewards} from '../../store';

    const { width, height } = Dimensions.get('window');

const TermRewardDetailsScreen = () => {

    const navigation = useNavigation(); 
    const route = useRoute();
    const dispatch = useDispatch();

    const {accessToken, user} = useSelector(selectAuth);
    const {termDetails, termDetailsStatus} = useSelector(selectRewards);

    const {termCodeId, termCode, displayName, rewardAmount} = route.params || {};

  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!accessToken || !user?.id || !termCodeId) {
      return;
    }
    dispatch(
      fetchRewardTermDetails({
        accessToken,
        userId: user.id,
        termCodeId,
      }),
    );
  }, [accessToken, dispatch, termCodeId, user?.id]);

  const events = useMemo(() => {
    const list = termDetails?.events;
    if (!Array.isArray(list)) {
      return [];
    }
    return list.map(item => ({
      id: item?.id || item?.eventId,
      title: item?.name || item?.title || 'Event',
      date: [item?.date, item?.startTime].filter(Boolean).join(' | ') || 'TBD',
      points: Number.isFinite(item?.eventPoints)
        ? `${item.eventPoints} Pts`
        : item?.points || '0 Pts',
      location: item?.location || 'TBD',
      termCode: item?.termCode || termCode || '',
      checkInDate:
        item?.checkInDate ||
        item?.checkInTime ||
        item?.checkInAt ||
        'TBD',
    }));
  }, [termDetails, termCode]);

  const totalReward =
    termDetails?.totalReward ??
    termDetails?.rewardAmount ??
    (typeof rewardAmount === 'string'
      ? Number(rewardAmount.replace(/[^0-9.]/g, ''))
      : rewardAmount) ??
    0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.gradient}>
        <LinearGradient
          colors={['#006BB6', '#00A2E5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}
              style={styles.arrowCon}>
              <Image
                source={require('../../assets/Image/back.png')}
                style={styles.backIcon}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Event Check In</Text>
          </View>
        </LinearGradient>

        <View style={styles.ribbonContainer}>
          <ImageBackground source={require('../../assets/Image/RewardHead.png')} style={styles.ribbon}>
            <Text style={styles.ribbonText}>
              Total reward by term {termCode || displayName || ''} : $
              {Number.isFinite(totalReward) ? totalReward : 0}
            </Text>
          </ImageBackground>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {events.map((item, index) => (
            <View key={item.id || index} style={styles.cardSpace}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setSelectedEvent(item);
                  setShowEventModal(true);
                }}>
                <View style={styles.titleContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.pointsText}>{item.points}</Text>
                </View>
                <View style={styles.pointContainer}>
                  <Text style={styles.cardDate}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={showEventModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalheadCon}>
                <Text style={styles.modalTitle}>Event Details</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.labelConatiner}>
                <Text style={styles.label}>Event Name</Text>
              </View>
              <View style={styles.valueConatiner}>
                <Text style={styles.value}>{selectedEvent?.title}</Text>
              </View>
              <View style={styles.modalDivider} />
              <View style={styles.labelConatiner}>
                <Text style={styles.label}>
                  Term : <Text style={styles.value}>{selectedEvent?.termCode || termCode || ''}</Text>
                </Text>
              </View>
              <View style={styles.midValConatiner}>
                <Text style={styles.label}>
                  Event Location: <Text style={styles.value}>{selectedEvent?.location || 'TBD'}</Text>
                </Text>
              </View>

              <View style={styles.modalDivider} />
              <View style={styles.labelConatiner}>
                <Text style={styles.label}>Event Date</Text>
              </View>
              <View style={styles.valueConatiner}>
                <Text style={styles.value}>{selectedEvent?.date || 'TBD'}</Text>
              </View>
              <View style={styles.labelConatiner}>
                <Text style={styles.label}>Event Check-In Date</Text>
              </View>
              <View style={styles.valueConatiner}>
                <Text style={styles.value}>{selectedEvent?.checkInDate || 'TBD'}</Text>
              </View>
              <View style={styles.modalDivider} />
              <View style={styles.pointMdConatiner}>
                <Text style={styles.label}>
                  Event Points : <Text style={styles.value}>{selectedEvent?.points}</Text>
                </Text>
              </View>

              <View style={styles.divider} />
              <View style={styles.pointMdConatiner}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setShowEventModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </AppGradient>
    </SafeAreaView>
  );
};

export default TermRewardDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },

  container: {
    height: height / 1.2,
    width: width,
    alignItems: 'center',
  },

  header: {
    height: height / 14,
    width: width / 1,
  },
  headerContent: {
    height: height / 14,
    width: width / 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowCon: {
    height: height / 14,
    width: width / 7.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    width: 28,
    height: 28,
    tintColor: colors.white,
  },
  headerTitle: {
    fontSize: typography.size.lg,
    color: colors.white,
    fontWeight: '700',
    fontFamily: typography.semiBold
  },

  ribbonContainer: {
    height: height / 22,
    width: width / 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  ribbon: {
    resizeMode: 'contain',
    height: 25,
    width: width / 1.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ribbonText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: typography.semiBold,
    fontWeight: '800'
  },

  scrollContent: {
    paddingBottom: height / 10,
    alignItems: 'center',
  },

  cardSpace: {
    height: height / 10,
    width: width / 1.1,
    justifyContent: 'flex-end'
  },

  card: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B9E1FF',
  },
  titleContainer: {
    height: height / 30,
    width: width / 1.2,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pointContainer: {
    height: height / 35,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  cardTitle: {
    fontSize: 14,
    fontFamily: typography.bold,
    color: colors.textDark,
    fontWeight: '700',
    lineHeight: 20
  },

  cardDate: {
    fontFamily: typography.regular,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400'
  },

  pointsText: {
    fontSize: 12,
    fontFamily: typography.bold,
    color: colors.primary,
    fontWeight: '700',
    lineHeight: 20
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    height: height / 2.04,
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 12,
  },

  modalheadCon: {
    height: height / 15,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  modalTitle: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textDark,
    fontWeight: '700',
  },

  modalDivider: {
    height: 1,
    backgroundColor: colors.boderLight,
    width: width / 1.2,
    alignSelf: 'center'
  },

  divider: {
    height: 1,
    backgroundColor: colors.boderLight,
  },

  labelConatiner: {
    height: height / 28,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },

  label: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: typography.regular
  },
  valueConatiner: {
    height: height / 28,
    width: width / 1.2,
    alignSelf: 'center',
  },
  pointMdConatiner: {
    height: height / 17,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  midValConatiner: {
    height: height / 22,
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  value: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: typography.bold
  },

  bold: {
    fontFamily: typography.bold,
    color: colors.textDark,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: colors.boderLight,
    height: height / 27,
    width: width / 5.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },

  cancelText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textDark,
    fontWeight: '400',
    lineHeight: 20
  },
});
