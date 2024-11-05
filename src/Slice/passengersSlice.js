/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
passengerCount: JSON.parse(localStorage.getItem("passengerCount")) || {
adult: 0,
child: 0,
infant: 0,
},
passengerPrice: JSON.parse(localStorage.getItem("passengerPrice")) || {
departure: {
adult: 0,
child: 0,
services: 0,
},
arrival: {
adult: 0,
child: 0,
services: 0,
},
},
passengers: JSON.parse(localStorage.getItem("passengers")) || [],
};

const passengersSlice = createSlice({
name: "passengers",
initialState,
reducers: {

setPassengerCount: (state, action) => {
const { type, count } = action.payload;
state.passengerCount[type] = count;
localStorage.setItem("passengerCount", JSON.stringify(state.passengerCount));
},
updateNewPassengerPrice: (state, action) => {
const { type, price, ticketType } = action.payload;
state.passengerPrice[ticketType][type] = price;
localStorage.setItem("passengerPrice", JSON.stringify(state.passengerPrice));
},
cleanPassengerPrice: (state) => {
state.passengerPrice = {
departure: { adult: 0, child: 0, services: 0 },
arrival: { adult: 0, child: 0, services: 0 },
};
localStorage.removeItem("passengerPrice");
},
updatePassengerData: (state, action) => {
const { number, data } = action.payload;
const existingPassenger = state.passengers.find((p) => p.number === number);
if (existingPassenger) {
Object.assign(existingPassenger, data);
} else {
state.passengers.push(data);
}
localStorage.setItem("passengers", JSON.stringify(state.passengers));
},
cleanPassengerData: (state) => {
state.passengers = [];
localStorage.removeItem("passengers");
},
},
});


export const {
setPassengerCount,
updateNewPassengerPrice,
cleanPassengerPrice,
updatePassengerData,
cleanPassengerData,
} = passengersSlice.actions;

export default passengersSlice.reducer;
