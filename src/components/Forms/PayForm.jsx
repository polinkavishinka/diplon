import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { updatePayerData } from '../../Slice/paySlice';
import { changeStage } from '../../Slice/stageSlice';
import './Pay-form.scss';

export default function PayForm() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [form, setForm] = useState({
      surname: '',
      name: '',
      lastname: '',
      phone: '',
      email: '',
      pay: '',
   });
   const [disabled, setDisabled] = useState(true);

   useEffect(() => {
      dispatch(changeStage({ stage: 3 }));
   }, []);

   useEffect(() => {
      setDisabled(true);
      if (
         !(
            form.surname &&
            form.name &&
            form.lastname &&
            form.phone &&
            form.email &&
            form.pay
         )
      )
         return;
      setDisabled(false);
   }, [form]);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };
   const handleRadio = (event) => {
      setForm((prev) => ({ ...prev, pay: event.target.id }));
   };

   const handleClick = (event) => {
      event.preventDefault();
      dispatch(updatePayerData({ data: form }));
      navigate('/passengers/verification');
   };

   return (
      <section className="pay-form order_pay-form content__block">
         <form className="pay-form_form">
            <h4 className="pay-form_title">Персональные данные</h4>
            <div className="pay-form_wrapper">
               <div className="pay-form-controls pay-form-controls--name">
                  <label className="pay-form_label" htmlFor="surname">
                     Фамилия
                     <input
                        className="pay-form_field"
                        id="surname"
                        name="surname"
                        type="text"
                        value={form.surname}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="pay-form_label" htmlFor="name">
                     Имя
                     <input
                        className="pay-form_field"
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="pay-form_label" htmlFor="last-name">
                     Отчество
                     <input
                        className="pay-form_field"
                        id="last-name"
                        name="lastname"
                        type="text"
                        value={form.lastname}
                        onChange={handleChange}
                     />
                  </label>
               </div>
               <div className="pay-form-controls pay-form-controls-contacts">
                  <label
                     className="pay-form_label pay-form_label-contact"
                     htmlFor="phone"
                  >
                     Контактный телефон
                     <input
                        className="pay-form_field pay-form_field-tel"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+7 ___ ___ __ __"
                        value={form.phone}
                        onChange={handleChange}
                        // maxLength="11"
                        pattern="[\d]{1} ([\d]{2,3}) [\d]{2,3}[\d]{2,3}[\d]{2,3}"
                     />
                  </label>
                  <label
                     className="pay-form_label pay-form_label-contact"
                     htmlFor="email"
                  >
                     E-mail
                     <input
                        className="pay-form_field pay-form_field-contact"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="inbox@gmail.ru"
                        value={form.email}
                        onChange={handleChange}
                     />
                  </label>
               </div>
            </div>
            <section className="pay-form_payment">
               <h4 className="pay-form_title pay-form_title-repeat">
                  Способ оплаты
               </h4>
               <div className="pay-form_controls-group">
                  <input
                     className="pay-form_field-control"
                     type="radio"
                     name="payment"
                     id="online"
                     checked={form.pay === 'online'}
                     onChange={handleRadio}
                  />

                  <label
                     className="pay-form_label pay-form_label-radio"
                     htmlFor="online"
                  >
                     Онлайн
                  </label>
                  <ul className="pay-form_paylist">
                     <li className="pay-form_pay-item">
                        Банковской
                        <br />
                        картой
                     </li>
                     <li className="pay-form_pay-item">PayPal</li>
                     <li className="pay-form_pay-item">Visa QIWI Wallet</li>
                  </ul>
               </div>
               <div className="pay-form_controls-group">
                  <input
                     className="pay-form_field-control"
                     type="radio"
                     name="payment"
                     id="cash"
                     checked={form.pay === 'cash'}
                     onChange={handleRadio}
                  />

                  <label
                     className="pay-form_label pay-form_label-radio"
                     htmlFor="cash"
                  >
                     Наличными
                  </label>
               </div>
            </section>
         </form>

         <div className="pay-form_buttons">
            <button
               type="button"
               className="button pay-form_button"
               onClick={handleClick}
               disabled={disabled}
            >
               Купить билеты
            </button>
         </div>
      </section>
   );
}
