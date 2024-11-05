/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";

export default function Label(props){
    
    return(
        <label className="form__lable">{props.children}</label>
    )
}