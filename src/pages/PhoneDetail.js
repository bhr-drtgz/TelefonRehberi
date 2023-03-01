import React, { useEffect, useState } from 'react'
import Header from '../companents/Header'
import api from '../api/api';
import urls from "../api/urls"

import { useParams, Link } from 'react-router-dom';

const PhoneDetail = () => {
  const params = useParams();
  const [myPhone, setMyPhone] = useState(null);
  const [phoneCategory, setPhoneCategory] = useState(null);
  useEffect(() => {
     api
      .get(`${urls.phones}/${params.phoneId}`)
      .then((resPhone) => {
        console.log(resPhone.data);
        setMyPhone(resPhone.data);
        api
          .get(`${urls.categories}/${resPhone.data.categoryId}`)
          .then((resCategory) => {
            console.log(resCategory.data);
            setPhoneCategory(resCategory.data);
          })
          .catch((err) => { });
      })
      .catch((err) => { });
  }, []);
  if (myPhone === null || phoneCategory === null) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <h3>İsim: {myPhone.name}</h3>
        <h3>Soyİsim: {myPhone.surname}</h3>
        <h3>Email: {myPhone.Email}</h3>
        <h3>Telefon No: {myPhone.phoneNuber}</h3>
         <h3>Kategori: {phoneCategory.name}</h3>
        <Link to={"/"}>Geri</Link>
      </div>
    </div>
  );
};

export default PhoneDetail