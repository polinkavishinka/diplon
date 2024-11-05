/* eslint-disable react/self-closing-comp */
import React from "react";
import { useDispatch } from "react-redux";
import { swapCities } from "../../Slice/SearchSlice";


export default function Swap() {
  const dispatch = useDispatch();
  const onClick = (e) => {
    e.preventDefault();
    dispatch(swapCities());
  }
  return (<button type="button" className="btn-swap" onClick={onClick}></button>)
}
