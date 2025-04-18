import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  navbarOpened: true,
  // Add more columns here
};

export const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbarOpened = !state.navbarOpened;
    },
  },
});

export const { toggleNavbar } = sizeSlice.actions;

export default sizeSlice.reducer;
