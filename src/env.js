// const ENVIRONMENT = __DEV__ ? 'debug' : 'production'; 
// debug, staging, production
const ENVIRONMENT = 'debug';
const CONFIG = {
  debug: {
    apiBaseUrl: 'https://odessa-dev.infojinicloud.com',
    azure: {
      clientId: '84f6ef89-463c-4e4d-b92b-637b9f42fad7',
      tenantId: 'bdd49817-9db8-4c1c-8269-0cd1044427df',
      redirectUrl: {
        ios: 'com.infojini.odessadev://oauth/',
        android: 'com.infojini.odessadev://oauth',
      },
    },
  },

  staging: {
    apiBaseUrl: 'https://odessa-qa.infojinicloud.com',
    azure: {
      clientId: '84f6ef89-463c-4e4d-b92b-637b9f42fad7',
      tenantId: 'bdd49817-9db8-4c1c-8269-0cd1044427df',
      redirectUrl: {
        ios: 'com.infojini.odessadev://oauth/',
        android: 'com.infojini.odessadev://oauth',
      },
    },
  },

  production: {
    apiBaseUrl: 'https://odessa-dev.infojinicloud.com',
    azure: {
      clientId: '84f6ef89-463c-4e4d-b92b-637b9f42fad7',
      tenantId: 'bdd49817-9db8-4c1c-8269-0cd1044427df',
      redirectUrl: {
        ios: 'com.infojini.odessadev://oauth/',
        android: 'com.infojini.odessadev://oauth',
      },
    },
  },
};

const ENDPOINTS = {
  activityCheckIn: '/activities/check-in',
  eventCheckIn: '/api/v1/app/oc/events/check-in',
  authLogin: '/api/v1/app/authentication/login',
  authLogout: '/api/v1/app/authentication/logout',
  termCodesList: '/api/v1/app/oc/term-data/term-codes/list',
  userEventsByTerm: (userId, termId) =>
    `/api/v1/app/oc/events/user/${userId}/term/${termId}`,
  userUpcomingEvents: userId => `/api/v1/app/oc/events/user/${userId}/upcoming`,
  faqsList: '/api/v1/app/oc/faqs/list',
  userRewards: userId => `/api/v1/app/oc/rewards/${userId}`,
  userRewardsByTerm: (termCodeId, userId) =>
    `/api/v1/app/oc/rewards/term/${termCodeId}/user/${userId}`,
  termGoalPoints: termCodeId =>
    `/api/v1/app/oc/term-data/goal-points/list?termCodeId=${termCodeId}`,
};




const getConfig = () => CONFIG[ENVIRONMENT] || CONFIG.production;
export const env = {
  ...getConfig(),
  environment: ENVIRONMENT,
};
const config = getConfig();

console.log(
  `\n🌍 =====================================\n` +
  `   ENVIRONMENT : ${ENVIRONMENT.toUpperCase()}\n` +
  `   API BASE URL: ${config.apiBaseUrl}\n` +
  `=====================================\n`
);

export const endpoints = ENDPOINTS;

