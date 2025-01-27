import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  topUpAmount: '',
  error: '',
  successMessage: '',
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTopUpAmount: (state, action) => {
      state.topUpAmount = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    resetState: (state) => {
      state.topUpAmount = '';
      state.error = '';
      state.successMessage = '';
    },
  },
});

export const { setBalance, setTopUpAmount, setError, setSuccessMessage, resetState } = balanceSlice.actions;
export default balanceSlice.reducer;
