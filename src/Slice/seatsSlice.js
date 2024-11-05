/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Импортируем createSlice и createAsyncThunk

export const fetchSeats = createAsyncThunk(
  'seats/fetchSeats',
  async (type, { rejectWithValue, getState }) => {
    const { train } = getState().seats;
    const id = train[type]._id;
    const url = `https://netology-trainbooking.netoservices.ru/routes/${id}/seats`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Server Error');
      return { type, data: await response.json() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  train: JSON.parse(localStorage.getItem('train')) || null,
  status: null,
  error: null,
  departure: JSON.parse(localStorage.getItem('seats-departure')) || {
    coachClass: null,
    coachItems: [],
    seats: {},
    seatCount: 0,
    services: {},
    coachList: [],
  },
  arrival: JSON.parse(localStorage.getItem('seats-arrival')) || {
    coachClass: null,
    coachItems: [],
    seats: {},
    seatCount: 0,
    services: {},
    coachList: [],
  },
};

const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    addTrain: (state, action) => {
      state.train = action.payload;
      localStorage.setItem('train', JSON.stringify(action.payload));
    },
    clearTrain: (state) => {
      state.train = null;
      localStorage.removeItem('train');
    },
    updateSeatSelection: (state, action) => {
      const { id, number, type } = action.payload;
      state[type].seats[id].push(number);
      state[type].seatCount += 1;
      localStorage.setItem(`seats-${type}`, JSON.stringify(state[type]));
    },
    // Дополнительные редьюсеры можно обновить аналогично
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.status = 'resolved';
        state[action.payload.type] = action.payload.data;
      })
      .addCase(fetchSeats.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { addTrain, clearTrain, updateSeatSelection } = seatsSlice.actions;
export default seatsSlice.reducer;


