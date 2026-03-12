import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const fetchEventsByTerm = createAsyncThunk(
  'events/fetchEventsByTerm',
  async ({accessToken, userId, termId}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.userEventsByTerm(userId, termId)}`,
        {token: accessToken},
      );
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }
  },
);

export const fetchUpcomingEvents = createAsyncThunk(
  'events/fetchUpcomingEvents',
  async ({accessToken, userId}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.userUpcomingEvents(userId)}`,
        {token: accessToken},
      );
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }
  },
);

const initialState = {
  items: [],
  upcomingItems: [],
  totalPoints: 0,
  status: 'idle',
  upcomingStatus: 'idle',
  error: null,
  upcomingError: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetEvents: state => {
      state.items = [];
      state.upcomingItems = [];
      state.totalPoints = 0;
      state.status = 'idle';
      state.upcomingStatus = 'idle';
      state.error = null;
      state.upcomingError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEventsByTerm.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventsByTerm.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.status = 'succeeded';
        state.items = Array.isArray(data.events) ? data.events : [];
        state.totalPoints = Number.isFinite(data.totalPoints)
          ? data.totalPoints
          : 0;
      })
      .addCase(fetchEventsByTerm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      })
      .addCase(fetchUpcomingEvents.pending, state => {
        state.upcomingStatus = 'loading';
        state.upcomingError = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.upcomingStatus = 'succeeded';
        state.upcomingItems = Array.isArray(data.events) ? data.events : [];
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.upcomingStatus = 'failed';
        state.upcomingError = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetEvents} = eventsSlice.actions;
export default eventsSlice.reducer;
