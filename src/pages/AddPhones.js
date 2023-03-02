import React, { useState } from 'react'
import Header from '../companents/Header'
import "../assets/styles/AddPhone.css"
import { useSelector, useDispatch } from 'react-redux'
import actionTypes from '../redux/actions/actionTypes'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import urls from '../api/urls'

const AddPhones = () => {
  const { categoriesState } = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({

    id: String(new Date().getTime()),
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    categoryId: categoriesState.categories[0].id,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.name === "" || form.surname === "" || form.phoneNumber === "") {
      alert("İSİM , SOYiSİM ve TELEFON MUMARASI ZORUNLUDUR");
      return;
    }
    api
      .post(urls.phones, form)
      .then((res) => {
        dispatch({
          type: actionTypes.phoneActions.ADD_PHONE,
          payload: form,
        });
        navigate("/")
      })
      .catch((err) => { });
  };
  return (
    <div>
      <Header />
      <div className='newPhoneTitle'>
        <div> YENİ KİŞİ EKLE</div>
      </div>
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <div className="formElement">
            <label htmlFor="name">İsim :</label>
            <input
              id="name"
              type={"text"}
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="surname">Soyİsim :</label>
            <input
              id="surname"
              type={"text"}
              value={form.surname}
              onChange={(event) => setForm({ ...form, surname: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="title">Telefon Numarası :</label>
            <input
              id="phoneNumber"
              type={"number"}
              value={form.phoneNumber}
              onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })
              }
            />
          </div>
          <div className="formElement">
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              type={"email"}
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })
              }
            />
          </div>
          <div className="formElement">

            <label htmlFor="date">Kategori :</label>
            <select
              value={form.categoryId}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}>
              {
                categoriesState.categories.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div className="submitBtnWrapper">
            <button className="submitBtn" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPhones
