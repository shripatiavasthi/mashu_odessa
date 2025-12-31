import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
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
    },
  },
});

export const {setAuthData, clearAuth} = authSlice.actions;
export default authSlice.reducer;
