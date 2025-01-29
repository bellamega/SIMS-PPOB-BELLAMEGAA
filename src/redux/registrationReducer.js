// src/redux/registrationReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  userData: null, // Menyimpan data pengguna yang berhasil didaftarkan
  loading: false, // Status loading saat proses registrasi
  error: null, // Menyimpan error jika terjadi kesalahan
};

// Slice
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload; // Mengubah state dengan data pengguna yang diterima
    },
    setLoading(state, action) {
      state.loading = action.payload; // Mengubah status loading
    },
    setError(state, action) {
      state.error = action.payload; // Menyimpan error
    },
  },
});

// Export actions
export const { setUserData, setLoading, setError } = registrationSlice.actions;

// Export reducer
export default registrationSlice.reducer;
