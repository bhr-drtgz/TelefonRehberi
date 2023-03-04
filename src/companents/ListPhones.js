import React, { useState, useEffect } from 'react'
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
    const [searchText, setSearchText] = useState("")
    const [filteredPhones, setFilteredPhones] = useState(phonesState.phones);

    useEffect(() => {
        console.log(searchText);
        const temp=phonesState.phones.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) === true)
        setFilteredPhones(temp)
    }, [searchText, phonesState.phones]);

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
            <div className='searchWrap'>
              <div>
                <span>ARA :</span>
              </div>
                <div className='searchInput'>
                    <input
                        className=''
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder='Aramak istediginiz KİŞİ İsmini Giriniz' />
                </div>
            </div>
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
                            filteredPhones.map((phone, index) => {
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
                                                <Link title='SİL' onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setWillDeletePhone(phone.id)
                                                }}><i className="fa-solid fa-trash"></i></Link>
                                                <Link title='DÜZENLE' to={`/edit-phone/${phone.id}`}><i className="fa-solid fa-user-pen"></i></Link>
                                                <Link title='AYRINTILAR' to={`/info-detail/${phone.id}`}><i className="fa-solid fa-circle-info"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
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
    )
}
export default ListPhones