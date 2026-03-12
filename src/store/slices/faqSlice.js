import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {env, endpoints} from '../../env';

export const fetchFaqs = createAsyncThunk(
  'faq/fetchFaqs',
  async ({accessToken}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `${env.apiBaseUrl}${endpoints.faqsList}`,
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

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    resetFaqs: state => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFaqs.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.status = 'succeeded';
        state.items = Array.isArray(data.faqs) ? data.faqs : [];
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      });
  },
});

export const {resetFaqs} = faqSlice.actions;
export default faqSlice.reducer;
