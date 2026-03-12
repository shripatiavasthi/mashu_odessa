import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AppGradient from '../components/AppGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from './TestingScreenStyles';

const TestingScreen = () => {
  const [activeTab, setActiveTab] = useState('employee');

  return (
    <AppGradient style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Image/NewLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Welcome</Text>

        <Text style={styles.subtitle}>
          Login to stay connected with everything Odessa College, all in one place.
        </Text>

        {/* TAB SECTION */}
        <View style={styles.tabWrapper}>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('employee')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'employee' && styles.activeTabText,
              ]}
            >
              Student/Employee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('public')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'public' && styles.activeTabText,
              ]}
            >
              Public User
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.tabLine} />

        {/* CONTENT */}

        {activeTab === 'employee' ? (
          <View style={styles.content}>
            <Text style={styles.infoText}>
              Sign in with your Odessa College account
            </Text>

            <TouchableOpacity style={styles.microsoftButton}>
              <Image
                source={require('../assets/Image/microsoft.png')}
                style={styles.microsoftIcon}
              />
              <Text style={styles.microsoftText}>Log in with Microsoft</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>

            <Text style={styles.infoText}>
              Sign in with your Odessa College email id
            </Text>

            <Text style={styles.label}>Email ID</Text>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Email address"
                style={styles.input}
              />
              <Text style={styles.domain}>@odessa.edu</Text>
            </View>

            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>

          </View>
        )}

      </SafeAreaView>
    </AppGradient>
  );
};

export default TestingScreen;