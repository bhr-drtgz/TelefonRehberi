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
                    <di>
                        <Link to={"/add-category"}>
                        <i class="fa-regular fa-folder-open"></i>
                        </Link>
                    </di>
                     <div>
                        <Link to={"/add-Phone"}>
                            <i className="fa-solid fa-user-plus"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header