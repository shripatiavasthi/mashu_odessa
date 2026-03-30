import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeMenu: 'oc', 
  },
  reducers: {
    setActiveMenu: (state, action) => {
      console.log('Setting active menu to:', action.payload);
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = appSlice.actions;
export default appSlice.reducer;