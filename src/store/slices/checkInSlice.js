import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const submitActivityId = createAsyncThunk(
  'checkIn/submitActivityId',
  async ({activityId, token}, {rejectWithValue}) => {
    try {
      const payload = {activityId};
      const response = await apiClient.post(
        `${env.apiBaseUrl}${endpoints.activityCheckIn}`,
        payload,
        {token},
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
  lastCheckIn: null,
  status: 'idle',
  error: null,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    resetCheckIn: state => {
      state.lastCheckIn = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitActivityId.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitActivityId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastCheckIn = action.payload;
      })
      .addCase(submitActivityId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetCheckIn} = checkInSlice.actions;
export default checkInSlice.reducer;
