// registrationReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  userData: null, // Sesuaikan dengan kebutuhan data
  loading: false,
  error: null,
};

// Slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setUserData, setLoading, setError } = registrationSlice.actions;

// Export reducer
export default registrationSlice.reducer;
