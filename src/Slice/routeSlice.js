/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Импортируем createSlice и createAsyncThunk

export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async (_, { rejectWithValue, getState }) => {
    const { search, filter } = getState();
    const { routeFrom, routeTo, date_start, date_end } = search;
    let url = `https://netology-trainbooking.netoservices.ru/routes?from_city_id=${routeFrom.id}&to_city_id=${routeTo.id}`;
    if (date_start) url += `&date_start=${date_start}`;
    if (date_end) url += `&date_end=${date_end}`;

    Object.entries(filter).forEach(([key, value]) => {
      if (value || value === 0) url += `&${key}=${value}`;
    });

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Server Error');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const routeSlice = createSlice({
  name: 'routes',
  initialState: { routes: [], status: null, error: null, total: 0 },
  reducers: {
    clearRoutes: (state) => {
      state.routes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.routes = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { clearRoutes } = routeSlice.actions;
export default routeSlice.reducer;
