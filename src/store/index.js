import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});