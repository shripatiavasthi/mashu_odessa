import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async ({accessToken, userId}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.userRewards(userId)}`,
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
  terms: [],
  ocSuccessReward: null,
  status: 'idle',
  error: null,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    resetRewards: state => {
      state.terms = [];
      state.ocSuccessReward = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRewards.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.status = 'succeeded';
        state.terms = Array.isArray(data.terms) ? data.terms : [];
        state.ocSuccessReward = data.ocSuccessReward || null;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetRewards} = rewardsSlice.actions;
export default rewardsSlice.reducer;
