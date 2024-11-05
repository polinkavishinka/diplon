/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */


import { createSlice } from '@reduxjs/toolkit'; // Импортируем createSlice

const initialState = {
  departureDate: null,
  returnDate: null,
  originCity: "санкт-петербург",
  destinationCity: "москва",
};

const tripSearchSlice = createSlice({
  name: "tripSearch",
  initialState,
  reducers: {
    updateSearchCriteria: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    swapCities: (state) => {
      const tempCity = state.originCity;
      state.originCity = state.destinationCity;
      state.destinationCity = tempCity;
    },
  },
});

export const { updateSearchCriteria, swapCities } = tripSearchSlice.actions;
export default tripSearchSlice.reducer;
