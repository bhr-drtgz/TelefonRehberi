import React, { useState } from 'react'
import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actionTypes from '../redux/actions/actionTypes'
import api from '../api/api'
import urls from '../api/urls'
import "../assets/styles/AddPhone.css"

const EditPhone = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { phonesState, categoriesState } = useSelector((state) => state);
    const myPhone = phonesState.phones.find((item) => item.id === params.phoneId);

    const [form, setForm] = useState(myPhone);
    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.name === "" || form.surname === "" || form.phoneNumber === "" || form.categoryId === "") {
            alert("İSİM , SOYİSİM VE TELEFON NUMARASI ZORUNLUDUR");
            return;
        }
        api
            .put(`${urls.phones}/${params.phoneId}`, form)
            .then((res) => {
                dispatch({ type: actionTypes.phoneActions.EDIT_PHONE, payload: form });
                navigate("/");
            })
            .catch((err) => { });
    };
    return (
        <div>
            <Header />

            <div className='newPhoneTitle'>
                <div> GÜNCELLE</div>
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
                            GÜNCELLE
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditPhone