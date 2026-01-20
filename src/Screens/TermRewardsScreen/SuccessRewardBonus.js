import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import { colors, typography } from '../../styles/globalStyles';

const { height, width } = Dimensions.get('window');

const SuccessRewardBonus = (props) => {

  const [showModal, setShowModal] = useState(false);

  const TermCard = ({ title, term, points, reward }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
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
                  <Text style={styles.pointsItalic}>
                    (Met Challenge Score Points)
                  </Text>
                </Text>
              </View>
            )}
          </View>

        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.gradient}>
        <AppHeader />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Term Rewards */}
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>Term Rewards</Text>
            </View>
            <TermCard
              title="Fall 1"
              term="25F1"
              points="3500"
              reward="$ 100"
            />

            <TermCard
              title="Fall 2"
              term="25F2"
              points="3700"
              reward="$ 100"
            />

            <TermCard
              title="Spring 1"
              term="26S1"
              points="4500"
              reward="$ 250"
            />

            <TermCard
              title="Spring 2"
              term="26S2"
              points="4800"
              reward="$ 75"
            />
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
                    <TouchableOpacity>
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

          {/* OC Success Rewards */}
          <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>OC Success Rewards</Text>
            </View>
            {/* <TermCard title="OC Success Reward" reward="$ 25" />
            <TermCard title="OC Success Reward Bonus" reward="$ 200" /> */}


            <View style={styles.decSpaceContainer}>
              <View style={styles.cardDecContainer}>
                <View style={styles.decebmerinfoCon}>
                  <View style={styles.decCon}>
                    <Text style={styles.cardTitle}>OC Success Reward</Text>
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

      </AppGradient>
    </SafeAreaView>
  );
};

export default SuccessRewardBonus;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
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
    justifyContent: 'center',
    alignSelf: 'center'
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
