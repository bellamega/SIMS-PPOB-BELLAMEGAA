import { configureStore } from '@reduxjs/toolkit';
import someReducer from './someSlice'; // pastikan ini sesuai dengan reducers yang Anda gunakan

const store = configureStore({
  reducer: {
    some: someReducer,
  },
});

export default store;