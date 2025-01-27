import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      // Validasi payload untuk mencegah error
      const { email, firstName, lastName } = action.payload || {};
      if (email && firstName && lastName) {
        state.email = email;
        state.firstName = firstName;
        state.lastName = lastName;
      } else {
        console.warn('Incomplete profile data received:', action.payload);
      }
    },
    resetProfile: (state) => {
      // Mengembalikan state ke kondisi awal
      state.email = '';
      state.firstName = '';
      state.lastName = '';
    },
  },
});

export const { setProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
