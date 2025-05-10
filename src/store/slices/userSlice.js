import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for user authentication
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * User slice for managing authentication state
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Use deep cloning to avoid reference issues
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setError } = userSlice.actions;
export default userSlice.reducer;