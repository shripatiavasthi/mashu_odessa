import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppGradient from '../../components/AppGradient';

const { height, width } = Dimensions.get('window');

const FaqScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question: 'What is OC All In?',
      answer:
        'OC All In is an incentive program that rewards Odessa College Employees for engaging in college activities',
    },
    {
      question: 'Who is eligible?',
      answer:
        'All eligible Odessa College employees may participate in the OC All In program.',
    },
    {
      question: 'What are the rewards?',
      answer:
        'Participants can earn points and redeem them for rewards based on engagement.',
    },
    {
      question: 'How do I Participate?',
      answer:
        'You can participate by attending events, activities, and completing challenges.',
    },
    {
      question: 'What are the event types?',
      answer:
        'Events include academic, social, wellness, and professional development activities.',
    },
    {
      question: 'How do I claim my rewards?',
      answer:
        'Rewards can be claimed once eligibility criteria and point thresholds are met.',
    },
  ];

  const toggleItem = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppGradient style={styles.gradient}>
        <AppHeader />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {faqData.map((item, index) => {
            const isOpen = index === activeIndex;

            return (
              <View key={index} style={styles.card}>
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

        {/* Floating Info Button */}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>i</Text>
        </TouchableOpacity>
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
    // height: height/18,
    width: width / 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00A2E54D',
    paddingHorizontal: width / 24,
    paddingVertical: height / 75,
    marginBottom: height / 40,

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
    
  },

  icon: {
    fontSize: width / 17,
    fontWeight: '600',
    color: '#006BB6',
    lineHeight: width / 16,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D0D5DD',
    marginVertical: height / 40,
  },

  answerText: {
    fontSize: 12,
    color: '#414651',
    lineHeight: 20,
    fontFamily: 'OpenSons-Regular'
  },

  
  fab: {
    position: 'absolute',
    right: width / 18,
    bottom: Platform.OS === 'ios' ? height / 10 : height / 10,
    height: width / 6,
    width: width / 6,
    borderRadius: width / 12,
    backgroundColor: '#2E6FB6',
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
