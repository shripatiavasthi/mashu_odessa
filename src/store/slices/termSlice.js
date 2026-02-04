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

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const termSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    resetTerms: state => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
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
      });
  },
});

export const {resetTerms} = termSlice.actions;
export default termSlice.reducer;
