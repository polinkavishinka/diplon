import { configureStore } from "@reduxjs/toolkit";
import {updateSearchCriteria} from "./SearchSlice";
import {clearRoutes} from "./routeSlice";
import {addTrain} from "./seatsSlice";
import {setPassengerCount} from "./passengersSlice";
import {updatePayerData} from "./paySlice";
import {resetReservationStatus} from "./bookingSlice";
import {updateFilter} from "./filterSlice";
import {changeStage} from "./stageSlice";

export default configureStore({
  reducer: {
    updateSearchCriteria,
    clearRoutes,
    addTrain,
    setPassengerCount,
    updatePayerData,
    resetReservationStatus,
    updateFilter,
    changeStage,
  },
});

