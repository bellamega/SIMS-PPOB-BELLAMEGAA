// src/redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationReducer';
import profileReducer from './slice/profileSlice'; 


const store = configureStore({
  reducer: {
    registration: registrationReducer,
    profile: profileReducer, // Pastikan reducer profile ada di sini
  },
});

export default store;
