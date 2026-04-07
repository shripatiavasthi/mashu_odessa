import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs } from '../../store/slices/faqSlice';
import { selectAuth, selectFaq } from '../../store';

const { height, width } = Dimensions.get('window');

const FaqScreen = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const { items: faqItems, status: faqStatus } = useSelector(selectFaq);

  const isLoading = faqStatus === 'loading' || faqStatus === 'idle';

  useEffect(() => {
    if (!accessToken || faqStatus !== 'idle') return;
    dispatch(fetchFaqs({ accessToken }));
  }, [accessToken, dispatch, faqStatus]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchFaqs({ accessToken })).unwrap();
    } catch (e) {
      console.warn('Refresh failed:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const toggleItem = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const renderContent = () => {
    if (isLoading && !refreshing) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#006BB6" />
        </View>
      );
    }

    if (!faqItems || faqItems.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>No FAQs Available</Text>
          <Text style={styles.emptySubtitle}>
            There are no FAQs available right now.
          </Text>
          <Text style={styles.emptySubtitle}>Check back soon for updates!</Text>
        </View>
      );
    }

    return faqItems.map((item, index) => {
      const isOpen = index === activeIndex;
      return (
        <View key={item?.id || index} style={styles.card}>
          <TouchableOpacity
            style={styles.questionRow}
            onPress={() => toggleItem(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.questionText}>{item.question}</Text>
            <Text style={styles.icon}>{isOpen ? '−' : '+'}</Text>
          </TouchableOpacity>
          {isOpen && (
            <>
              <View style={styles.divider} />
              <Text style={styles.answerText}>{item.answer}</Text>
            </>
          )}
        </View>
      );
    });
  };

  return (
      <AppGradient style={styles.gradient}>
    <SafeAreaView style={styles.safeArea}>
        <AppHeader />
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            (isLoading || !faqItems || faqItems.length === 0) && styles.scrollContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#006BB6']}
              tintColor={'#006BB6'}
            />
          }
        >
          {renderContent()}
        </ScrollView>
    </SafeAreaView>
      </AppGradient>
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
    paddingBottom: height / 4,
    alignItems: 'center',
  },
  scrollContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    paddingHorizontal: width / 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5fa8',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    width: width / 1.5,
    fontSize: 14,
    fontWeight: '600',
    color: '#414651',
    lineHeight: 20,
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
    fontWeight: '400',
  },
});