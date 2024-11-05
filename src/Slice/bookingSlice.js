/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooking = createAsyncThunk(
async (reservationId, { rejectWithValue }) => {
try {
const response = await fetch(`https://example.com/api/reservation/${reservationId}`);

if (!response.ok) {
throw new Error('Error fetching reservation');
}

return await response.json();
} catch (error) {
return rejectWithValue(error.message);
}
}
);

const reservationSlice = createSlice({
name: "reservation",
initialState: {
reservationStatus: null,
error: null,
reservationData: null,
},
reducers: {
resetReservationStatus: (state) => {
state.reservationStatus = null;
state.error = null;
state.reservationData = null; // Сброс данных бронирования
},
},
extraReducers: (builder) => {
builder
.addCase(fetchBooking.pending, (state) => {
state.reservationStatus = "loading";
})
.addCase(fetchBooking.fulfilled, (state, action) => {
state.reservationData = action.payload;
state.reservationStatus = "success";
})
.addCase(fetchBooking.rejected, (state, action) => {
state.error = action.payload;
state.reservationStatus = "error";
});
},
});

export const { resetReservationStatus } = reservationSlice.actions;
export default reservationSlice.reducer;
