/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

import { createSlice } from '@reduxjs/toolkit'; // Импортируем createSlice

const initialState = {
  stage: 1,
};

const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    changeStage: (state, action) => {
      state.stage = action.payload?.stage || state.stage;
    },
    incrementStage: (state) => {
      state.stage += 1;
    },
    resetStage: (state) => {
      state.stage = initialState.stage; // Возвращаем stage к начальному состоянию
    },
  },
});

export const { changeStage, incrementStage, resetStage } = stageSlice.actions;
export default stageSlice.reducer;
