import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchSeats } from "../Slice/seatsSlice";
import { cleanPassengerPrice } from "../Slice/passengersSlice";
import SeatsMap from "./seats/SeatsMap";

export default function SeatsPage() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { train } = useSelector((state) => state.seats.train);
const seatsDeparture = useSelector(
(state) => state.seats.departure.seatsCount
);
const seatsArrival = useSelector((state) => state.seats.arrival.seatsCount);
const { passengersCount } = useSelector((state) => state.passengers);

useEffect(() => {
dispatch(cleanPassengerPrice());
dispatch(fetchSeats('departure'));
// Добавлено train.arrival в зависимости
if (train.arrival) dispatch(fetchSeats('arrival'));
}, [dispatch, train.arrival]); // Здесь добавлено train.arrival

const [disabled, setDisabled] = useState(true);
const passengersCountAll =
Number(passengersCount.adult) + Number(passengersCount.child);

useEffect(() => {
setDisabled(true);
if (
train.arrival &&
(seatsArrival === 0 || Number(seatsArrival) !== passengersCountAll)
)
return;
if (seatsDeparture === 0 || Number(seatsDeparture) !== passengersCountAll)
return;
setDisabled(false);
}, [passengersCount, seatsArrival, seatsDeparture, passengersCountAll, train.arrival]); // Добавлено train.arrival

const handleClick = () => {
navigate("/passengers/passengers");
};

  return (
      <section className="seats order_options content__block">
        <h3 className="title seats_title">Выбор мест</h3>
        {train.departure && (
          <SeatsMap type="departure" className="ticket_header-train" />
        )}
        {train.arrival && (
          <SeatsMap type="arrival" className="ticket_header-train" />
        )}
        <div className="seats_buttons">
          <button
            type="button"
            className="button seats_button"
            onClick={handleClick}
            disabled={disabled}
          >
            Далее
          </button>
        </div>
      </section>
    
  );
}
