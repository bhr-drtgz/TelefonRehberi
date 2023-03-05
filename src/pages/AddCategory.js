import React, { useState } from 'react'
import Header from '../companents/Header'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actionTypes from './../redux/actions/actionTypes';
import api from "../api/api"
import urls from "../api/urls"

const AddCategory = () => {
    const dispatch = useDispatch()
    const { categoriesState } = useSelector(state => state)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: "",
    })

    const HandleSubmit = (event) => {
        event.preventDefault();

        if (form.name === "") {
            alert("Kategori adı boş bırakılamaz");
            return;
        }
        const hasCategory = categoriesState.categories.find(
            (item) => item.name.toLocaleLowerCase() === form.name.toLocaleLowerCase()
        );
        if (hasCategory !== undefined) {
            alert("Böyle bir kategori zaten mevcut");
            return;
        }
        api
            .post(urls.categories, form)
            .then((res) => {
                dispatch({ type: actionTypes.categoryActions.ADD_CATEGORY, payload: form })
                navigate("/list-categories")
            })
            .catch((err) => { });
    };

    return (
        <div>
            <Header />
            <div className='newPhoneTitle'>
                <div> KATEGORİ EKLE</div>
            </div>
            <div className="formWrapper">
                <form onSubmit={HandleSubmit} >
                    <div className="formElement">
                        <label htmlFor="name">KATEGORİ:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder='İş Arkadaşlarım'
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })
                            }
                        />
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

export default AddCategory