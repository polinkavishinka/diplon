/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSeatSelection } from '../../Slice/seatsSlice';

export default function Services({ service, type, id, disabled }) {
   const { services } = useSelector((state) => state.seats[type]);
   const dispatch = useDispatch();

   const handleClick = () => {
      const isActive = services[id]?.includes(service);
      dispatch(updateSeatSelection({ id, service, type }));
   };

   return (
      <button
         type="button"
         className={`service ${service}__item ${
            services[id] && services[id].includes(service)
               ? `service-active ${service}__item-active`
               : ''
         }`}
         onClick={handleClick}
         disabled={disabled}
      >
         <span className="services-help-hidden">{service}</span>
      </button>
   );
}
