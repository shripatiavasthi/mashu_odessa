import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const submitEventCheckIn = createAsyncThunk(
  'checkIn/submitEventCheckIn',
  async ({eventCode, userId, token}, {rejectWithValue}) => {
    try {
      const payload = {eventCode, userId};
      const response = await apiClient.post(
        `${env.apiBaseUrl}${endpoints.eventCheckIn}`,
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
      .addCase(submitEventCheckIn.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitEventCheckIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastCheckIn = action.payload;
      })
      .addCase(submitEventCheckIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetCheckIn} = checkInSlice.actions;
export default checkInSlice.reducer;
