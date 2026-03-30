import { createSlice } from '@reduxjs/toolkit';

const normalizeActiveMenu = value => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'oc';
  }

  return value.trim().toLowerCase();
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeMenu: 'oc', 
  },
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = normalizeActiveMenu(action.payload);
    },
  },
});

export const { setActiveMenu } = appSlice.actions;
export default appSlice.reducer;
