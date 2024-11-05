/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import {createSlice} from "@reduxjs/toolkit";

const initialFilterState = JSON.parse(localStorage.getItem('tripFilters')) || {
   firstClassAvailable: false,
   secondClassAvailable: false,
   thirdClassAvailable: false,
   expressTrain: true,
   airConditioning: false,
   wifi: false,

   priceRange: { min: 10, max: 5210 },

   departureTime: { from: 0, to: 24 },
   arrivalTime: { from: 0, to: 24 },

   limit: 5,
   offset: 0,
   sortBy: 'departureTime',
};

const tripFilterSlice = createSlice({
   name: 'tripFilter',
   initialState: initialFilterState,
   reducers: {
      updateFilter: (state, action) => {
         const { filterName, filterValue } = action.payload;
         state[filterName] = filterValue;
      },
   },
});

export const { updateFilter } = tripFilterSlice.actions;
export default tripFilterSlice.reducer;