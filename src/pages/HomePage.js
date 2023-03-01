import React from 'react'
import Header from './../companents/Header';
import ListPhones from '../companents/ListPhones';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const {phonesState, categoriesState}=useSelector(state=>state)
    console.log("phones",phonesState)
    console.log("categorys",categoriesState)
    return (
        <div>
            <Header />
            <ListPhones />
        </div>
    )
}

export default HomePage