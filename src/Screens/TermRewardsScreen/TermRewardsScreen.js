import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import { colors, typography } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewards } from '../../store/slices/rewardsSlice';
import { fetchGoalPoints } from '../../store/slices/termSlice';
import { selectAuth, selectTerms, selectRewards } from '../../store';

import Icon from 'react-native-vector-icons/Entypo';

import { styles } from './RewardsStyle';

const { height, width } = Dimensions.get('window');

const RewardsScreen = ({ onMenuPress }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { accessToken, user } = useSelector(selectAuth);
  const { items: termItems, goalPoints, status: termStatus } = useSelector(selectTerms);
  const { terms, ocSuccessReward } = useSelector(selectRewards);


  const [refreshing, setRefreshing] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDecemberModal, setShowDecemberModal] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState(null);


  const handleRefresh = useCallback(() => {
    if (!accessToken || !user?.id) return;
    setRefreshing(true);
    dispatch(fetchRewards({ accessToken, userId: user.id }));

    if (selectedTermId) {
      dispatch(
        fetchGoalPoints({
          accessToken,
          termCodeId: selectedTermId,
        })
      );
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, [dispatch, accessToken, user?.id, selectedTermId]);

  useEffect(() => {
    if (!accessToken || !user?.id) return;
    dispatch(fetchRewards({ accessToken, userId: user.id }));
  }, [dispatch, accessToken, user?.id]);

  useEffect(() => {
    if (!termItems?.length || selectedTermId) return;

    const currentTerm = termItems.find(t => t.currentTerm === true);
    const fallbackTerm = termItems[0];
    const targetTerm = currentTerm || fallbackTerm;

    if (targetTerm?.id) {
      setSelectedTermId(targetTerm.id);
    }
  }, [termItems, selectedTermId]);

  useEffect(() => {
    if (!accessToken || !selectedTermId || termStatus === 'loading') return;

    dispatch(
      fetchGoalPoints({
        accessToken,
        termCodeId: selectedTermId,
      })
    );
  }, [accessToken, selectedTermId, dispatch, termStatus]);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
    }
  };

  const TermCard = ({ title, term, points, reward, status, termCodeId }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('TermRewardDetailsScreen', {
            termCodeId,
            termCode: term,
            displayName: title,
            rewardAmount: reward,
          });
        }}>
        <View style={styles.cardTopRow}>
          <View>
            <View style={styles.titleRow}>
              <View style={styles.titleCon}>
                <Text style={styles.cardTitle}>{title}</Text>
                {term && (
                  <View style={styles.termBadge}>
                    <Text style={styles.termText}>{term}</Text>
                  </View>
                )}
              </View>
              <View>
                <ImageBackground
                  source={require('../../assets/Image/RewardIcon.png')}
                  style={styles.rewardTag}
                  resizeMode="contain">
                  <Text style={styles.rewardText}>{reward}</Text>
                </ImageBackground>
              </View>
            </View>

            {points && (
              <View style={styles.pointCon}>
                <Text style={styles.pointsText}>
                  Points: {points}{' '}
                  {status ? <Text style={styles.pointsItalic}>({status})</Text> : null}
                </Text>
                <Icon name="chevron-with-circle-right" size={18} color="#666666" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.gradient}>
        <LinearGradient colors={['#2E6FB6', '#4DA3DA']} style={styles.header}>
          <TouchableOpacity style={styles.menuContainer} onPress={handleMenuPress}>
            <Image
              source={require('../../assets/Image/Menu.png')}
              resizeMode="contain"
              style={styles.menuIcon}
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Image/Menulogo.png')}
              resizeMode="contain"
              style={styles.logo}
            />

            <View style={styles.filterContainer}>
              <Pressable style={styles.dropDownCon}>
                <Text style={styles.filterTxt}>2026</Text>
                <Image
                  source={require('../../assets/Image/drop_down.png')}
                  resizeMode="contain"
                  style={styles.dropImgStyle}
                />
              </Pressable>
            </View>
          </View>
        </LinearGradient>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#006BB6']}
              tintColor="#006BB6"
            />
          }>
          {terms && terms.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>Term Rewards</Text>
              </View>
              {terms.map(term => (
                <TermCard
                  key={term.termCodeId}
                  title={term.displayName}
                  term={term.termCode}
                  points={Number.isFinite(term?.points) ? `${term.points}` : '0'}
                  reward={Number.isFinite(term?.rewardAmount) ? `$ ${term.rewardAmount}` : '$ 0'}
                  status={term.status}
                  termCodeId={term.termCodeId}
                />
              ))}
            </View>
          )}

          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>December Bonus</Text>
            </View>

            <View style={styles.decSpaceContainer}>
              <View style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>December Bonus</Text>
                    <TouchableOpacity onPress={() => setShowDecemberModal(true)}>
                      <Image
                        source={require('../../assets/Image/Info.png')}
                        style={styles.infoImgStyle}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <ImageBackground
                      source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode="contain">
                      <Text style={styles.rewardText}>$0</Text>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>OC Success Rewards</Text>
            </View>

            <View style={styles.decSpaceContainer}>
              <Pressable style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>OC Success Reward</Text>
                  </View>
                  <View>
                    <ImageBackground
                      source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode="contain">
                      <Text style={styles.rewardText}>
                        {Number.isFinite(ocSuccessReward?.ocSuccessReward)
                          ? `$ ${ocSuccessReward.ocSuccessReward}`
                          : '$ 0'}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              </Pressable>
            </View>

            <View style={styles.decSpaceContainer}>
              <Pressable style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>OC Success Reward Bonus</Text>
                  </View>
                  <View>
                    <ImageBackground
                      source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode="contain">
                      <Text style={styles.rewardText}>
                        {Number.isFinite(ocSuccessReward?.ocSuccessRewardBonus)
                          ? `$ ${ocSuccessReward.ocSuccessRewardBonus}`
                          : '$ 0'}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => setShowModal(prev => !prev)}
          style={styles.fab}
          activeOpacity={0.8}>
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
          goalPointsData={goalPoints?.[0] || {}}
          ocSuccessReward={ocSuccessReward || {}}
        />

        {/* December Bonus Modal */}
        <Modal visible={showDecemberModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.decModalContainer}>
              <View style={styles.decHeadContainer}>
                <Text style={styles.decTitle}>December Bonus</Text>
              </View>
              <View style={styles.modalDivider} />

              <View style={styles.iconContainer}>
                <Image
                  source={require('../../assets/Image/Calendar.png')}
                  style={styles.bonusIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.criteriaContainer}>
                <Text style={styles.decHeading}>Employee Eligibility Criteria</Text>
              </View>

              <View style={styles.decContainer}>
                <Text style={styles.decText}>
                  To be eligible, you must be a full-time employee with continuous employment
                  for the past year.
                </Text>
              </View>
              <View style={styles.txtDecContainer}>
                <Text style={styles.decText}>
                  For December 2025, you must have been full-time from September 2024 to
                  December 2025 and earned at least 1,500 points in each term (F1, F2, S1, S2).
                </Text>
              </View>
              <View style={styles.modalDivider} />
              <View style={styles.btnSpaceCon}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setShowDecemberModal(false)}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </AppGradient>
    </SafeAreaView>
  );
};

export default RewardsScreen;