/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

import { createSlice } from '@reduxjs/toolkit'; // Импортируем createSlice

const initialState = {
  payer: JSON.parse(localStorage.getItem('payer')) || null,
};

const paySlice = createSlice({
  name: 'pay',
  initialState,
  reducers: {
    updatePayerData: (state, action) => {
      state.payer = action.payload;
      localStorage.setItem('payer', JSON.stringify(action.payload));
    },
  },
});

export const { updatePayerData } = paySlice.actions;
export default paySlice.reducer;
