import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentFitnessChallengeHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Challenge</Text>
      <Text style={styles.description}>
        Student fitness challenge screens should live under this program.
      </Text>
    </View>
  );
};

export default StudentFitnessChallengeHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B3A57',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#4A5565',
  },
});
