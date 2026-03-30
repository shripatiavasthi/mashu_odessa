import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import RewardPointsModal from '../../components/RewardPointsModal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFaqs} from '../../store/slices/faqSlice';
import {selectAuth, selectFaq} from '../../store';


const { height, width } = Dimensions.get('window');

const FaqScreen = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {accessToken} = useSelector(selectAuth);
  const activeMenu = useSelector(state => state.app.activeMenu);
  const {items: faqItems, status: faqStatus} = useSelector(selectFaq);
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    if (!accessToken || faqStatus !== 'idle') {
      return;
    }
    dispatch(fetchFaqs({accessToken, activeMenu}));
  }, [accessToken, activeMenu, dispatch, faqStatus]);

  const toggleItem = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const handleRefresh = async () => {
  setIsRefreshing(true);
  try {
    await dispatch(fetchFaqs({accessToken, activeMenu})).unwrap();
  } catch (error) {
    console.error('Failed to refresh FAQs:', error);
  } finally {
    setIsRefreshing(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>

      <AppGradient style={styles.gradient}>
        <AppHeader />

        <ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      colors={['#006BB6']}    
      tintColor={'#006BB6'}      // iOS
    />
  }
>
          {faqItems.map((item, index) => {
            const isOpen = index === activeIndex;

            return (
              <View key={item?.id || index} style={styles.card}>
                <TouchableOpacity
                  style={styles.questionRow}
                  onPress={() => toggleItem(index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.questionText}>{item.question}</Text>

                  <Text style={styles.icon}>
                    {isOpen ? '−' : '+'}
                  </Text>
                </TouchableOpacity>

                {isOpen && (
                  <>
                    <View style={styles.divider} />
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </>
                )}
              </View>
            );
          })}
        </ScrollView>

      </AppGradient>

    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: height / 40,
    paddingBottom: height / 6,
    alignItems: 'center',
  },


  card: {

    width: width / 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00A2E54D',
    paddingHorizontal: width / 24,
    paddingVertical: height / 55,
    marginBottom: height / 60,

  },

  questionRow: {
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  questionText: {
    
    width: width / 1.5,
    fontSize: 14,
    fontWeight: '600',
    color: '#414651',
    lineHeight: 20

  },

  icon: {
    fontSize: width / 17,
    fontWeight: '600',
    color: '#006BB6',
    lineHeight: 20,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D0D5DD',
    marginVertical: height / 70,
  },

  answerText: {
    fontSize: 12,
    color: '#414651',
    lineHeight: 20,
    fontFamily: 'OpenSons-Regular',
    fontWeight: '400'
  },
});
