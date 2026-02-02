import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiClient} from '../../api/client';
import {endpoints} from '../../env';

export const loginWithIdToken = createAsyncThunk(
  'auth/loginWithIdToken',
  async ({idToken}, {rejectWithValue}) => {
    try {
      const response = await apiClient.post(endpoints.authLogin, {idToken});
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
  accessToken: null,
  refreshToken: null,
  user: null,
  loginResponse: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const {accessToken, refreshToken, user} = action.payload || {};
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      state.user = user || null;
    },
    clearAuth: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.loginResponse = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginWithIdToken.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginWithIdToken.fulfilled, (state, action) => {
        const payload = action.payload || {};
        const data = payload.data || {};

        state.status = 'succeeded';
        state.loginResponse = payload;
        state.accessToken = data.accessToken || null;
        state.user = {
          id: data.id || null,
          email: data.email || null,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          userType: data.userType || null,
          role: data.role || null,
          isActive: typeof data.isActive === 'boolean' ? data.isActive : null,
        };
      })
      .addCase(loginWithIdToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || {message: 'Request failed'};
      });
  },
});

export const {setAuthData, clearAuth} = authSlice.actions;
export default authSlice.reducer;
