import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";
import PhoneDetail from "./pages/PhoneDetail";
import AddPhones from "./pages/AddPhones";

function App() {

  const dispatch = useDispatch()
  const { phonesState, categoriesState } = useSelector((state) => state)

  useEffect(() => {
    dispatch({ type: actionTypes.phoneActions.GET_PHONES_START });
    api
      .get(urls.phones)
      .then((res) => {
        dispatch({
          type: actionTypes.phoneActions.GET_PHONES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.phoneActions.GET_PHONES_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
  }, []);

  if (phonesState.success === false || categoriesState.success === false)
    return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info-phone/:phoneId" element={<PhoneDetail />} />
        <Route path="/add-phone" element={<AddPhones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
