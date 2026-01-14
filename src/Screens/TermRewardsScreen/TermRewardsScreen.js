import React from 'react';
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

const RewardsScreen = () => {
  const TermCard = ({ title, term, points, reward }) => (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{title}</Text>
            {term && (
              <View style={styles.termBadge}>
                <Text style={styles.termText}>{term}</Text>
              </View>
            )}
          </View>

          {points && (
            <Text style={styles.pointsText}>
              Points: {points}{' '}
              <Text style={styles.pointsItalic}>
                (Met Challenge Score Points)
              </Text>
            </Text>
          )}
        </View>

        <View style={styles.rewardTag}>
          <Text style={styles.rewardText}>{reward}</Text>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Term Rewards</Text>

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

          {/* OC Success Rewards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OC Success Rewards</Text>

            <TermCard title="OC Success Reward" reward="$ 25" />
            <TermCard title="OC Success Reward Bonus" reward="$ 200" />
          </View>
        </ScrollView>

        {/* Floating Info Button */}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>i</Text>
        </TouchableOpacity>
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

  scrollContent: {
    paddingTop: height / 40,
    paddingBottom: height / 8,
    alignItems: 'center',
  },

  /* Sections */
  section: {
    width: width / 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: width / 22,
    borderWidth: 1,
    borderColor: '#B9DCF5',
    paddingVertical: height / 40,
    marginBottom: height / 30,
  },

  sectionTitle: {
    fontSize: width / 20,
    fontWeight: '700',
    color: '#1D4E89',
    textAlign: 'center',
    marginBottom: height / 40,
  },

  /* Card */
  card: {
    width: width / 1.18,
    minHeight: height / 10, // ✅ iOS safe
    backgroundColor: '#FFFFFF',
    borderRadius: width / 30,
    borderWidth: 1,
    borderColor: '#CDE6FA',
    paddingHorizontal: width / 24,
    paddingVertical: height / 70,
    alignSelf: 'center',
    marginBottom: height / 60,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height / 120,
  },

  cardTitle: {
    fontSize: width / 22,
    fontWeight: '700',
    color: '#3A3A3A',
    marginRight: width / 40,
  },

  termBadge: {
    borderWidth: 1,
    borderColor: '#9EC9F3',
    borderRadius: width / 25,
    paddingHorizontal: width / 40,
    paddingVertical: height / 300,
  },

  termText: {
    fontSize: width / 30,
    fontWeight: '600',
    color: '#1D6FB8',
  },

  pointsText: {
    fontSize: width / 30,
    color: '#667085',
  },

  pointsItalic: {
    fontStyle: 'italic',
    color: '#667085',
  },

  /* Reward Tag */
  rewardTag: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: width / 28,
    paddingVertical:
      Platform.OS === 'ios' ? height / 180 : height / 160,
    borderTopLeftRadius: width / 40,
    borderBottomLeftRadius: width / 40,
    justifyContent: 'center',
  },

  rewardText: {
    color: '#FFFFFF',
    fontSize: width / 26,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  /* Floating Button */
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
