import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import authReducer from './slices/authSlice';
import checkInReducer from './slices/checkInSlice';
import termReducer from './slices/termSlice';
import eventsReducer from './slices/eventsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  checkIn: checkInReducer,
  terms: termReducer,
  events: eventsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const selectAuth = state => state.auth;
export const selectCheckIn = state => state.checkIn;
export const selectTerms = state => state.terms;
export const selectEvents = state => state.events;
