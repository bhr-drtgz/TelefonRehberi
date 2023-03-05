import React from 'react'
import "../assets/styles/Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <div className='headerContainer'>
            <div className='headerRow'>
                <div className='headerTitle'>
                    <div>
                        <i className="fa-solid fa-phone-flip"></i>
                    </div>
                    <div>
                        <Link to={"/"}>TELEFON REHBERİ</Link>
                    </div>
                </div>
                <div className='headerIcon'>
                    <div>
                        <Link title='KATEGORİLER' to={"/list-categories"}>
                            <i className="fa-solid fa-folder"></i>
                        </Link>
                    </div>
                    <di>
                        <Link title='KATEGORİ EKLE' to={"/add-category"}>
                            <i className="fa-regular fa-folder-open"></i>
                        </Link>
                    </di>
                    <div>
                        <Link title='KİŞİ EKLE' to={"/add-Phone"}>
                            <i className="fa-solid fa-user-plus"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header