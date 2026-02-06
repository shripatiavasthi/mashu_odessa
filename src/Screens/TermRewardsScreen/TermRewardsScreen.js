import React, { useEffect, useMemo, useState } from 'react';
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
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import { colors, typography } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRewards} from '../../store/slices/rewardsSlice';
import {selectAuth, selectRewards} from '../../store';

import Icon from 'react-native-vector-icons/Entypo';


const { height, width } = Dimensions.get('window');

const RewardsScreen = ({ onMenuPress }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accessToken, user} = useSelector(selectAuth);
  const {terms: rewardTerms, ocSuccessReward, status: rewardsStatus} = useSelector(selectRewards);

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      navigation.openDrawer?.() || navigation.getParent?.()?.openDrawer?.();
    }
  };



  const [showModal, setShowModal] = useState(false);
  const [showDecemberModal, setShowDecemberModal] = useState(false);

  useEffect(() => {
    if (!accessToken || !user?.id || rewardsStatus !== 'idle') {
      return;
    }
    dispatch(fetchRewards({accessToken, userId: user.id}));
  }, [accessToken, dispatch, rewardsStatus, user?.id]);

  const termCards = useMemo(
    () =>
      Array.isArray(rewardTerms)
        ? rewardTerms.map(term => ({
            key: term?.termCodeId || term?.termCode,
            termCodeId: term?.termCodeId || null,
            title: term?.displayName || term?.termCode || 'Term',
            term: term?.termCode || '',
            points: Number.isFinite(term?.points) ? `${term.points}` : '0',
            status: term?.status || '',
            reward: Number.isFinite(term?.rewardAmount)
              ? `$ ${term.rewardAmount}`
              : '$ 0',
          }))
        : [],
    [rewardTerms],
  );

  const TermCard = ({ title, term, points, reward, status, termCodeId }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card}
        onPress={() => {
          navigation.navigate('TermRewardDetailsScreen', {
            termCodeId,
            termCode: term,
            displayName: title,
            rewardAmount: reward,
          });
        }}
      >
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
                <ImageBackground source={require('../../assets/Image/RewardIcon.png')}
                  style={styles.rewardTag}
                  resizeMode='contain'
                >
                  <Text style={styles.rewardText}>{reward}</Text>
                </ImageBackground>
              </View>
            </View>

            {points && (
              <View style={styles.pointCon}>
                <Text style={styles.pointsText}>
                  Points: {points}{' '}
                  {status ? (
                    <Text style={styles.pointsItalic}>({status})</Text>
                  ) : null}
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
        {/* <AppHeader /> */}

        <LinearGradient
          colors={['#2E6FB6', '#4DA3DA']}
          style={styles.header}>
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={handleMenuPress}>
            <Image
              source={require('../../assets/Image/Menu.png')}
              resizeMode="contain"
              style={styles.menuIcon} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Image/Menulogo.png')}
              resizeMode="contain"
              style={styles.logo}
            />


            <View style={styles.filterContainer}>
              {/* <TouchableOpacity style={styles.filterCon}>
                                            <Text style={styles.filterTxt}>1000 Pts</Text>
                                        </TouchableOpacity> */}

              <TouchableOpacity style={styles.dropDownCon}>
                <Text style={styles.filterTxt}>2025</Text>
                <Image source={require('../../assets/Image/drop_down.png')} resizeMode='contain' style={styles.dropImgStyle} />
              </TouchableOpacity>
            </View>



          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Term Rewards */}
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>Term Rewards</Text>
            </View>
            {termCards.map(term => (
              <TermCard
                key={term.key}
                title={term.title}
                term={term.term}
                points={term.points}
                reward={term.reward}
                status={term.status}
                termCodeId={term.termCodeId}
              />
            ))}
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>December Bonus</Text>
            </View>
            {/* <TermCard title="December Bonus" reward="$ 25" /> */}

            <View style={styles.decSpaceContainer}>
              <View style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>December Bonus</Text>
                    <TouchableOpacity onPress={() => setShowDecemberModal(true)}>
                      {/* <Text style={styles.termText}>mashu</Text> */}
                      <Image source={require('../../assets/Image/Info.png')} style={styles.infoImgStyle} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <ImageBackground source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode='contain'
                    >
                      <Text style={styles.rewardText}>$ 25</Text>
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

            {/* <TermCard title="OC Success Reward" reward="$ 25" />
            <TermCard title="OC Success Reward Bonus" reward="$ 200" /> */}

            <View style={styles.decSpaceContainer}>
              <TouchableOpacity style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>OC Success Reward</Text>
                  </View>
                  <View>
                    <ImageBackground source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode='contain'>
                      <Text style={styles.rewardText}>
                        {Number.isFinite(ocSuccessReward?.ocSuccessReward)
                          ? `$ ${ocSuccessReward.ocSuccessReward}`
                          : '$ 0'}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
            </View>


            <View style={styles.decSpaceContainer}>
              <TouchableOpacity style={styles.cardDecContainer}
                onPress={() => { navigation.navigate('SuccessRewardBonus') }}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>OC Success Reward Bonus</Text>
                  </View>
                  <View>
                    <ImageBackground source={require('../../assets/Image/RewardIcon.png')}
                      style={styles.rewardTag}
                      resizeMode='contain'
                    >
                      <Text style={styles.rewardText}>
                        {Number.isFinite(ocSuccessReward?.ocSuccessRewardBonus)
                          ? `$ ${ocSuccessReward.ocSuccessRewardBonus}`
                          : '$ 0'}
                      </Text>
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
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
        />


        <Modal
          visible={showDecemberModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.decModalContainer}>

              <View style={styles.decHeadContainer}>
                <Text style={styles.decTitle}>December Bonus</Text>
              </View>
              <View style={styles.modalDivider} />

              {/* Icon */}
              <View style={styles.iconContainer}>
                <Image
                  source={require('../../assets/Image/Calendar.png')}
                  style={styles.bonusIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.criteriaContainer}>
                <Text style={styles.decHeading}>
                  Employee Eligibility Criteria
                </Text>
              </View>

              <View style={styles.decContainer}>
                <Text style={styles.decText}>
                  To be eligible, you must be a full-time employee with continuous
                  employment for the past year.
                </Text>
              </View>
              <View style={styles.txtDecContainer}>
                <Text style={styles.decText}>
                  For December 2025, you must have been full-time from September
                  2024 to December 2025 and earned at least 1,500 points in each
                  term (F1, F2, S1, S2).
                </Text>
              </View>

              <View style={styles.modalDivider} />

              <View style={styles.btnSpaceCon}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setShowDecemberModal(false)}
                >
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


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },



  header: {
    height: height / 12,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  menuContainer: {
    height: height / 18,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  logoContainer: {
    height: height / 12,
    width: width / 1.3,
    justifyContent: 'space-between',
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  filterContainer: {
    height: height / 20,
    width: width / 3.2,
    // backgroundColor: 'cyan',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  dropDownCon: {
    height: height / 40,
    width: width / 6.8,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',

  },


  filterTxt: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: typography.semiBold,
    color: colors.white
  },
  dropImgStyle: {
    height: 20,
    width: 20,
  },


  scrollContent: {
    paddingTop: height / 40,
    paddingBottom: height / 8,
    alignItems: 'center',
  },

  /* Sections */
  sectionContainer: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerContainer: {
    height: height / 25,
    width: width / 1.1,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },



  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D4E89',
    textAlign: colors.primaryDark,
    fontFamily: typography.bold,
  },

  cardContainer: {
    height: height / 10,
    width: width / 1.1,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end'
  },
  decSpaceContainer: {
    height: height / 12,
    width: width / 1.1,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end'
  },

  card: {
    // height: height / 11,
    width: width / 1.18,
    // backgroundColor: 'pink',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDE6FA',
    // justifyContent: 'center',
    alignSelf: 'center',
    // marginBottom: height / 60,
  },

  ocSectionCon: {
    height: height / 10,
    width: width / 1.18,
    justifyContent: 'center',
  },

  cardTopRow: {
    height: height / 12,
    width: width / 1.18,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },

  titleRow: {
    height: height / 25,
    width: width / 1.19,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // marginBottom: height / 120,
    // backgroundColor: 'cyan'
  },
  titleCon: {
    height: height / 20,
    width: width / 2,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // paddingHorizontal: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    fontFamily: typography.bold,
    paddingHorizontal: 10
    // marginRight: width / 40,
  },
  infoImgStyle: {
    tintColor: colors.primary,
    height: 20,
    width: 20,

  },

  termBadge: {
    borderWidth: 1,
    borderColor: '#9EC9F3',
    borderRadius: width / 25,
    height: height / 45,
    width: width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: width / 40,
    // paddingVertical: height / 300,
    backgroundColor: '#f4f6f8',

  },
  cardDecContainer: {
    height: height / 15,
    width: width / 1.18,
    // backgroundColor: 'pink',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDE6FA',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  decebmerinfoCon: {
    height: height / 20,
    width: width / 1.185,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'cyan'
  },
  decCon: {
    height: height / 20,
    width: width / 2,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10
  },
  termText: {
    fontSize: width / 30,
    fontWeight: '600',
    color: colors.primaryDark,
  },

  pointCon: {
    height: height / 28,
    width: width / 1.27,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  pointsText: {
    fontSize: 12,
    color: colors.textDark,
  },

  pointsItalic: {
    fontStyle: 'italic',
    color: '#667085',
  },

  /* Reward Tag */
  rewardTag: {
    height: height / 35,
    width: width / 7.5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  rewardText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: typography.semiBold
    // includeFontPadding: false,
    // textAlignVertical: 'center',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  decModalContainer: {
    height: height / 1.96,
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: 12,
    // padding: 20,
  },
  decHeadContainer: {
    height: height / 15,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center',
    justifyContent: 'center'
  },

  decTitle: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textDark,
    fontWeight: 'bold',
    // lineHeight: 150
  },

  criteriaContainer: {
    height: height / 25,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center',
    // justifyContent: 'center'
  },

  modalDivider: {
    height: 1,
    backgroundColor: colors.boderLight,
    // marginVertical: 14,
  },

  iconContainer: {
    height: height / 7,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bonusIcon: {
    height: 80,
    width: 80,
    tintColor: colors.primary,

  },

  decHeading: {
    fontSize: 16,
    fontFamily: typography.bold,
    color: colors.textDark,
    textAlign: 'center',
    fontWeight: '700'
    // marginBottom: 10,
  },
  decContainer: {
    height: height / 14,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center'
  },

  txtDecContainer: {
    height: height / 8.5,
    width: width / 1.2,
    // backgroundColor: "lightblue",
    alignSelf: 'center'
  },
  decText: {
    // width: width / 1.2,
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    // marginBottom: 10,
    textAlign: 'center',
    fontFamily: typography.regular,
    fontWeight: '400'
  },

  btnSpaceCon: {
    height: height / 19,
    width: width / 1.2,
    // backgroundColor: "blue",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  closeBtn: {

    borderWidth: 1,
    borderColor: colors.boderLight,
    height: height / 27,
    width: width / 5.5,
    // backgroundColor: 'cyan',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'

  },

  closeText: {
    fontSize: 14,
    fontFamily: typography.semiBold,
    color: colors.textDark,
    fontWeight: '400',
    lineHeight: 20
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
