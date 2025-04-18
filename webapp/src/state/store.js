import { configureStore } from '@reduxjs/toolkit';
import sizeSlice from './sizeSlice';

export default configureStore({
  reducer: {
    size: sizeSlice,
  },
});
