import React, { useState } from 'react'
import Header from '../companents/Header'
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/actions/actionTypes"
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const EditCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const { categoriesState } = useSelector((state) => state);

    const myCategory = categoriesState.categories.find(
        (item) => item.id === categoryId);

    const [form, setForm] = useState(myCategory)

    const handleSubmit = (event) => {
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
            .put(`${urls.categories}/${categoryId}`, form)
            .then((res) => {
                dispatch({ type: actionTypes.categoryActions.EDIT_CATEGORY, payload: form })
                navigate("/list-categories")
            })
            .catch((err) => { });
    };

    return (
        <div>
            <Header />
            <div className='newPhoneTitle'>
                <div>KATEGORİYİ GÜNCELLE</div>
            </div>
            <div className="formWrapper">
                <form onSubmit={handleSubmit} >
                    <div className="formElement">
                        <label htmlFor="name">KATEGORİ:</label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })
                            }
                        />
                    </div>
                    <div className="submitBtnWrapper">
                        <button
                            disabled={
                                form.name.toLocaleLowerCase("tr-TR") ===
                                    myCategory.name.toLocaleLowerCase("tr-TR")
                                    ? true
                                    : false
                            }
                            className="submitBtn" type="submit">
                            GÜNCELLE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory