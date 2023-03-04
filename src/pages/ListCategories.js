import React, { useState } from 'react'
import Header from '../companents/Header'
import { Link } from 'react-router-dom'
import actionTypes from '../redux/actions/actionTypes'
import api from '../api/api'
import urls from '../api/urls'
import { useSelector, useDispatch } from 'react-redux'
import GeneralModal from '../assets/modal/GeneralModal'

const ListCategories = () => {
  const { categoriesState, phonesState } = useSelector(state => state)
  const dispatch = useDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [willDeleteCategory, setWillDeleteCategory] = useState("")

  const deleteCategory = (id) => {

    api.delete(`$(urls.categories)/$(id)`)
      .then((resCat) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CATEGORY,
          payload: id
        });
      })
    dispatch({
      type: actionTypes.phoneActions.DELETE_PHONES_AFTER_DELETE_CATEGORY,
      payload: id
    })

      .catch((err) => {
        setOpenDeleteModal(false)

      })
  }

  return (
    <div className='listConteiner'>
      <Header />
      <div className='newPhoneTitle'>
        <div> KATEGORİLER</div>
      </div>
      <div className='listWrap'>
        <table>
          <thead>
            <tr>
              <th>Sıra No:</th>
              <th>Kategori İsmi:</th>
              <th>Kişi Sayısı</th>
              <th>İŞLEMLER</th>
            </tr>
          </thead>
          <tbody>
             <tr>
              <td>1</td>
              <td>KENDİM</td>
              <td>
                <div className='tableIcon'>
                  <Link title='SİL' onClick={() => { }}><i className="fa-solid fa-trash"></i></Link>
                  <Link title='DÜZENLE' to={"/edit-category"}><i className="fa-solid fa-user-pen"></i></Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCategories