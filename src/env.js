const ENVIRONMENT = __DEV__ ? 'debug' : 'production';

const CONFIG = {
  debug: {
    apiBaseUrl: 'https://odessa-dev.infojinicloud.com',
    azure: {
      clientId: '84f6ef89-463c-4e4d-b92b-637b9f42fad7',
      tenantId: 'bdd49817-9db8-4c1c-8269-0cd1044427df',
      redirectUrl: {
        ios: 'com.odessa.mobile.app://oauth/',
        android: 'com.odessa.mobile.app://oauth',
      },
    },
  },
  production: {
    apiBaseUrl: 'https://api.odessa.example.com',
    azure: {
      clientId: '84f6ef89-463c-4e4d-b92b-637b9f42fad7',
      tenantId: 'bdd49817-9db8-4c1c-8269-0cd1044427df',
      redirectUrl: {
        ios: 'com.odessa.mobile.app://oauth/',
        android: 'com.odessa.mobile.app://oauth',
      },
    },
  },
};

const ENDPOINTS = {
  activityCheckIn: '/activities/check-in',
  eventCheckIn: '/api/v1/oc/app/events/check-in',
  authLogin: '/api/v1/oc/app/authentication/login',
  authLogout: '/api/v1/oc/app/authentication/logout',
  termCodesList: '/api/v1/oc/app/term-data/term-codes/list',
  userEventsByTerm: (userId, termId) =>
    `/api/v1/oc/app/events/user/${userId}/term/${termId}`,
  userUpcomingEvents: userId => `/api/v1/oc/app/events/user/${userId}/upcoming`,

  

};

const getConfig = () => CONFIG[ENVIRONMENT] || CONFIG.production;

export const env = {
  ...getConfig(),
  environment: ENVIRONMENT,
};

export const endpoints = ENDPOINTS;
