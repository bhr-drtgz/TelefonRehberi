import React from 'react'
import "../assets/styles/ListPhones.css"
import { Link } from 'react-router-dom'

const ListPhones = () => {
    return (
        <div className='listConteiner'>
            <div className='listWrap'>
                <table>
                    <tr>
                        <th>Sıra No:</th>
                        <th>İsim:</th>
                        <th>Soy İsim:</th>
                        <th>Telefon No:</th>
                        <th>Email:</th>
                        <th>Kategorisi:</th>
                        <th>İŞLEMLER</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Bahri</td>
                        <td>Dörtgöz</td>
                        <td>5556667788</td>
                        <td>123@gmail.com</td>
                        <td>Kendim</td>
                        <td>
                            <div className='tableIcon'>
                                <Link to={"/delete-phone"}><i class="fa-solid fa-trash"></i></Link>
                                <Link to={"/edit-phone"}><i class="fa-solid fa-user-pen"></i></Link>
                                <Link to={"/info-phone"}><i class="fa-solid fa-circle-info"></i></Link>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default ListPhones