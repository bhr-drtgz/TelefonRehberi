import React, { useState } from 'react'
import "../assets/styles/ListPhones.css"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../redux/actions/actionTypes';
import api from '../api/api';
import urls from '../api/urls';
import GeneralModal from './../assets/modal/GeneralModal';



const ListPhones = () => {
    const dispatch = useDispatch()
    const { phonesState, categoriesState } = useSelector((state) => state)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [willDeletePhone, setWillDeletePhone] = useState("")

    const DeletePhone = (id) => {
        dispatch({ type: actionTypes.phoneActions.DELETE_PHONE_START });
        api
            .delete(`${urls.phones}/${id}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.phoneActions.DELETE_PHONE_SUCCESS,
                    payload: id,
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.phoneActions.DELETE_PHONE_FAIL,
                    payload: "Kitap silerken hata oluştu",
                });
            });
    };
     return (
        <div className='listConteiner'>
            <div className='listWrap'>
                <table>
                    <thead>
                        <tr>
                            <th>Sıra No:</th>
                            <th>İsim:</th>
                            <th>Soy İsim:</th>
                            <th>Telefon No:</th>
                            <th>Email:</th>
                            <th>Kategorisi:</th>
                            <th>İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            phonesState.phones.map((phone, index) => {
                                const myCategory = categoriesState.categories.find(
                                    (item) => item.id === phone.categoryId
                                );
                                return (
                                    <tr key={phone.id}>
                                        <td>{index + 1}</td>
                                        <td>{phone.name}</td>
                                        <td>{phone.surname}</td>
                                        <td>{phone.phoneNumber}</td>
                                        <td>{phone.email}</td>
                                        <td>{myCategory.name}</td>
                                        <td>
                                            <div className='tableIcon'>
                                                <Link onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setWillDeletePhone(phone.id)
                                                }}><i className="fa-solid fa-trash"></i></Link>
                                                <Link to={"/edit-phone"}><i className="fa-solid fa-user-pen"></i></Link>
                                                <Link to={`/info-detail/${phone.id}`}><i className="fa-solid fa-circle-info"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                 )})}
                     </tbody>
                </table>
            </div>
            {
                showDeleteModal === true && (
                    <GeneralModal
                        title="SİL"
                        content="Silmek İstediğinize Eminmisiniz?"
                        closeButtonText="Vazgeç"
                        hasConfirm={true}
                        confirmButtonText="Sil"
                        closeButtonClick={() => setShowDeleteModal(false)}
                        confirmButtonClick={() => {
                            DeletePhone(willDeletePhone);
                            setShowDeleteModal(false)
                            }}
                    />
                )}
        </div>
    )}
export default ListPhones