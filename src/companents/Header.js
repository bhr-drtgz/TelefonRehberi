import React from 'react'
import "../assets/styles/Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <div className='headerContainer'>
            <div className='headerRow'>
                <div className='headerTitle'>
                     <div>
                        <i class="fa-solid fa-phone-flip"></i>
                    </div>
                    <div>
                        <Link to={"/"}>TELEFON REHBERİ</Link>
                    </div>
                </div>
                <div className='headerIcon'>
                     <div>
                        <Link to={"/add-Phone"}>
                            <i class="fa-solid fa-user-plus"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header