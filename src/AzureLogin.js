import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import {env} from './env';

const config = {
  clientId: env.azure.clientId,
  redirectUrl:
    Platform.OS === 'ios'
      ? env.azure.redirectUrl.ios
      : env.azure.redirectUrl.android,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/token`,
    revocationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/logout`,
  },
};

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      console.log('Starting login...');
      const result = await authorize(config);

      console.log('Login Success! Token:', result.accessToken);
      setToken(result.accessToken);

      Alert.alert('Success', 'Token generated successfully!');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Odessa College Login</Text>
        
        {token ? (
          <View style={styles.tokenContainer}>
            <Text style={styles.successText}>Token Generated:</Text>
            <Text style={styles.tokenText} numberOfLines={5}>
              {token}
            </Text>
          </View>
        ) : (
          <Button 
            title="Sign In with Microsoft" 
            onPress={handleLogin} 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  tokenContainer: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, width: '100%' },
  successText: { color: 'green', fontWeight: 'bold', marginBottom: 5 },
  tokenText: { fontFamily: 'monospace', color: '#333' }
});

export default App;
