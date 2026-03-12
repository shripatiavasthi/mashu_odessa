// src/store/slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';
import { env, endpoints } from '../../env';

export const loginWithIdToken = createAsyncThunk(
  'auth/loginWithIdToken',
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${env.apiBaseUrl}${endpoints.authLogin}`,
        { idToken },
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

export const logoutWithAccessToken = createAsyncThunk(
  'auth/logoutWithAccessToken',
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${env.apiBaseUrl}${endpoints.authLogout}`,
        {},
        { token: accessToken },
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
  // Backend token (used for all API calls)
  accessToken: null,

  // MS tokens (stored in AsyncStorage, kept here for in-memory access)
  msAccessToken: null,
  msRefreshToken: null,
  msTokenExpiry: null,

  user: null,
  loginResponse: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called after login OR after silent token restore
    setAuthData: (state, action) => {
      const {
        accessToken,
        msAccessToken,
        msRefreshToken,
        msTokenExpiry,
        user,
      } = action.payload || {};
      state.accessToken = accessToken || null;
      state.msAccessToken = msAccessToken || null;
      state.msRefreshToken = msRefreshToken || null;
      state.msTokenExpiry = msTokenExpiry || null;
      state.user = user || null;
    },

    // Called after silent MS token refresh (only updates MS tokens, keeps backend token)
    updateMsTokens: (state, action) => {
      const { msAccessToken, msRefreshToken, msTokenExpiry } = action.payload || {};
      state.msAccessToken = msAccessToken || null;
      state.msRefreshToken = msRefreshToken || null;
      state.msTokenExpiry = msTokenExpiry || null;
    },

    clearAuth: state => {
      state.accessToken = null;
      state.msAccessToken = null;
      state.msRefreshToken = null;
      state.msTokenExpiry = null;
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
        state.error = action.payload || { message: 'Request failed' };
      })
      .addCase(logoutWithAccessToken.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutWithAccessToken.fulfilled, state => {
        state.accessToken = null;
        state.msAccessToken = null;
        state.msRefreshToken = null;
        state.msTokenExpiry = null;
        state.user = null;
        state.loginResponse = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutWithAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Request failed' };
      });
  },
});

export const { setAuthData, updateMsTokens, clearAuth } = authSlice.actions;
export default authSlice.reducer;


// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {apiClient} from '../../api/client';
// import {env, endpoints} from '../../env';

// export const loginWithIdToken = createAsyncThunk(
//   'auth/loginWithIdToken',
//   async ({idToken}, {rejectWithValue}) => {
//     try {
//       const response = await apiClient.post(
//         `${env.apiBaseUrl}${endpoints.authLogin}`,
//         {idToken},
//       );
//       return response;
//     } catch (error) {
//       return rejectWithValue({
//         message: error.message,
//         status: error.status,
//         data: error.data,
//       });
//     }
//   },
// );

// export const logoutWithAccessToken = createAsyncThunk(
//   'auth/logoutWithAccessToken',
//   async ({accessToken}, {rejectWithValue}) => {
//     try {
//       const response = await apiClient.post(
//         `${env.apiBaseUrl}${endpoints.authLogout}`,
//         {},
//         {token: accessToken},
//       );
//       return response;
//     } catch (error) {
//       return rejectWithValue({
//         message: error.message,
//         status: error.status,
//         data: error.data,
//       });
//     }
//   },
// );

// const initialState = {
//   accessToken: null,
//   refreshToken: null,
//   user: null,
//   loginResponse: null,
//   status: 'idle',
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuthData: (state, action) => {
//       const {accessToken, refreshToken, user} = action.payload || {};
//       state.accessToken = accessToken || null;
//       state.refreshToken = refreshToken || null;
//       state.user = user || null;
//     },
//     clearAuth: state => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.user = null;
//       state.loginResponse = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(loginWithIdToken.pending, state => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(loginWithIdToken.fulfilled, (state, action) => {
//         const payload = action.payload || {};
//         const data = payload.data || {};

//         state.status = 'succeeded';
//         state.loginResponse = payload;
//         state.accessToken = data.accessToken || null;
//         state.user = {
//           id: data.id || null,
//           email: data.email || null,
//           firstName: data.firstName || null,
//           lastName: data.lastName || null,
//           userType: data.userType || null,
//           role: data.role || null,
//           isActive: typeof data.isActive === 'boolean' ? data.isActive : null,
//         };
//       })
//       .addCase(loginWithIdToken.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || {message: 'Request failed'};
//       })
//       .addCase(logoutWithAccessToken.pending, state => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(logoutWithAccessToken.fulfilled, state => {
//         state.accessToken = null;
//         state.refreshToken = null;
//         state.user = null;
//         state.loginResponse = null;
//         state.status = 'idle';
//         state.error = null;
//       })
//       .addCase(logoutWithAccessToken.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || {message: 'Request failed'};
//       });
//   },
// });

// export const {setAuthData, clearAuth} = authSlice.actions;
// export default authSlice.reducer;
