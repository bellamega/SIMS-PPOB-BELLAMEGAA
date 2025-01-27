// src/app/someSlice.js
import { createSlice } from '@reduxjs/toolkit';

const someSlice = createSlice({
  name: 'some',
  initialState: {},
  reducers: {
    // Definisikan reducer di sini
  },
});

export const { actions } = someSlice;
export default someSlice.reducer;