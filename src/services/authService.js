import AsyncStorage from '@react-native-async-storage/async-storage';
import { refresh } from 'react-native-app-auth';
import { Platform } from 'react-native';
import { env } from '../env';

const STORAGE_KEYS = {
  MS_ACCESS_TOKEN: '@auth/ms_access_token',
  MS_REFRESH_TOKEN: '@auth/ms_refresh_token',
  MS_TOKEN_EXPIRY: '@auth/ms_token_expiry',
  BACKEND_ACCESS_TOKEN: '@auth/backend_access_token',
  USER_DATA: '@auth/user_data',
};


const msalConfig = {
  clientId: env.azure.clientId,
  redirectUrl:
    Platform.OS === 'ios'
      ? env.azure.redirectUrl.ios
      : env.azure.redirectUrl.android,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  usePKCE: true,
  serviceConfiguration: {
    authorizationEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${env.azure.tenantId}/oauth2/v2.0/token`,
  },
};


export const saveAuthSession = async ({
  msAccessToken,
  msRefreshToken,
  msTokenExpiry,
  backendAccessToken,
  user,
}) => {
  try {
    const entries = [
      [STORAGE_KEYS.MS_ACCESS_TOKEN, msAccessToken || ''],
      [STORAGE_KEYS.MS_REFRESH_TOKEN, msRefreshToken || ''],
      [STORAGE_KEYS.MS_TOKEN_EXPIRY, msTokenExpiry || ''],
      [STORAGE_KEYS.BACKEND_ACCESS_TOKEN, backendAccessToken || ''],
      [STORAGE_KEYS.USER_DATA, JSON.stringify(user || {})],
    ];
    await AsyncStorage.multiSet(entries);
    console.log('[authService] Session saved');
  } catch (e) {
    console.warn('[authService] Failed to save session:', e);
  }
};


export const loadAuthSession = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    const results = await AsyncStorage.multiGet(keys);
    const map = Object.fromEntries(results);

    const msRefreshToken = map[STORAGE_KEYS.MS_REFRESH_TOKEN];
    const msTokenExpiry = map[STORAGE_KEYS.MS_TOKEN_EXPIRY];
    const backendAccessToken = map[STORAGE_KEYS.BACKEND_ACCESS_TOKEN];
    const userRaw = map[STORAGE_KEYS.USER_DATA];
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!msRefreshToken || !backendAccessToken || !user) {
      return null;
    }

    return {
      msAccessToken: map[STORAGE_KEYS.MS_ACCESS_TOKEN],
      msRefreshToken,
      msTokenExpiry,
      backendAccessToken,
      user,
    };
  } catch (e) {
    console.warn('[authService] Failed to load session:', e);
    return null;
  }
};

export const clearAuthSession = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    console.log('[authService] Session cleared');
  } catch (e) {
    console.warn('[authService] Failed to clear session:', e);
  }
};

export const isMsTokenExpired = (msTokenExpiry) => {
  if (!msTokenExpiry) return true;
  const expiryTime = new Date(msTokenExpiry).getTime();
  const bufferMs = 5 * 60 * 1000; 
  return Date.now() >= expiryTime - bufferMs;
};

export const refreshMsToken = async (msRefreshToken) => {
  try {
    const refreshResult = await refresh(msalConfig, {
      refreshToken: msRefreshToken,
    });

    return {
      msAccessToken: refreshResult.accessToken,
      msRefreshToken: refreshResult.refreshToken || msRefreshToken,
      msTokenExpiry: refreshResult.accessTokenExpirationDate,
      idToken: refreshResult.idToken,
    };
  } catch (e) {
    console.warn('[authService] MS token refresh failed:', e);
    throw e; // Caller must catch this and force re-login
  }
};