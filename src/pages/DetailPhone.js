import React, { useState, useEffect } from 'react'
import Header from '../companents/Header'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from "../api/api"
import urls from "../api/urls"
import "../assets/styles/Detail.css"

const DetailPhone = () => {
    const { phonesState } = useSelector((state) => state)
    const params = useParams(null)
    console.log(params)
    const [myPhone, setMyPhone] = useState(null)
    const [phoneCategory, setPhoneCategory] = useState(null)

    useEffect(() => {
        api.get(`${urls.phones}/${params.phoneId}`)
            .then((resPhone) => {
                setMyPhone(resPhone.data)

                api
                    .get(`${urls.categories}/${resPhone.data.categoryId}`)
                    .then((resCategory) => {
                        setPhoneCategory(resCategory.data);
                    })
                    .catch((err) => { });
            })
            .catch((err) => {

            })
    }, [])

    if (myPhone === null || phoneCategory === null) return null

    return (
        <div>
            <Header />
            <div className='DetailListContainer'>
                <div className='DetailConteiner'>
                    <h2> KİŞİ BİLGİLER </h2>
                    <h3>Adı:<span>{myPhone.name}</span></h3>
                    <h3>SoyAdı:<span>{myPhone.surname}</span></h3>
                    <h3>Telefon Numarası:<span>{myPhone.phoneNumber}</span></h3>
                    <h3>Email:<span>{myPhone.email}</span></h3>
                    <h3>Kategorisi:<span>{phoneCategory.name}</span> </h3>
                    <p><Link to={"/"}>GERİ</Link></p>
                </div>
            </div>
        </div>
    )
}

export default DetailPhone