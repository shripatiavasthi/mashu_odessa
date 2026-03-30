import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeMenu: 'oc', // 'OC' or 'PLC', 
  },
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = appSlice.actions;
export default appSlice.reducer;