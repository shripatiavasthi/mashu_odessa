import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const fetchTermCodes = createAsyncThunk(
  'terms/fetchTermCodes',
  async ({accessToken}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.termCodesList}`,
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

export const fetchGoalPoints = createAsyncThunk(
  'terms/fetchGoalPoints',
  async ({accessToken, termCodeId}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.termGoalPoints(termCodeId)}`,
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
  status: 'idle',
  error: null,
  goalPoints: [],
  ocSuccessRewards: null,
  goalPointsStatus: 'idle',
  goalPointsError: null,
};

const termSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    resetTerms: state => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.goalPoints = [];
      state.ocSuccessRewards = null;
      state.goalPointsStatus = 'idle';
      state.goalPointsError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTermCodes.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTermCodes.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || [];

        state.status = 'succeeded';
        state.items = Array.isArray(data) ? data : [];
      })
      .addCase(fetchTermCodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      })
      .addCase(fetchGoalPoints.pending, state => {
        state.goalPointsStatus = 'loading';
        state.goalPointsError = null;
      })
      .addCase(fetchGoalPoints.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.goalPointsStatus = 'succeeded';
        state.goalPoints = Array.isArray(data.goalPoints) ? data.goalPoints : [];
        state.ocSuccessRewards = data.ocSuccessRewards || null;
      })
      .addCase(fetchGoalPoints.rejected, (state, action) => {
        state.goalPointsStatus = 'failed';
        state.goalPointsError = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetTerms} = termSlice.actions;
export default termSlice.reducer;
