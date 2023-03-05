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
  console.log(categoriesState)
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [willDeleteCategory, setWillDeleteCategory] = useState("")

  const DeleteCategory = (id) => {
    const phones = phonesState.phones.filter((item) => item.categoryId === id)
    console.log(phones)
    api
      .delete(`${urls.categories}/${id}`)
      .then((resCat) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CATEGORY,
          payload: id,
        });
        dispatch({
          type: actionTypes.phoneActions.DELETE_PHONES_AFTER_DELETE_CATEGORY,
          payload: id,
        });
      })
      .catch((err) => { });
    setShowDeleteModal(false);
  };


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
            {
              categoriesState.categories.length === 0 && (
                <tr>
                  <td colSpan={4}>Kayıtlı kategori yok</td>
                </tr>
              )
            }
            {
              categoriesState.categories.length > 0 && (
                <>
                  {
                    categoriesState.categories.map((category, index) => {
                      const phones = phonesState.phones.filter((item) => item.categoryId === category.id)
                      return (
                        <tr key={category.id}>
                          <td>{index + 1}</td>
                          <td>{category.name}</td>
                          <td>{phones.length}</td>
                          <td>
                            <div className='tableIcon'>
                              <Link title='SİL' onClick={() => {
                                setShowDeleteModal(true);
                                setWillDeleteCategory(category.id)
                              }}><i className="fa-solid fa-trash"></i></Link>
                              <Link title='DÜZENLE' to={`/edit-category/${category.id}`}><i className="fa-solid fa-user-pen"></i></Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </>
              )
            }
          </tbody>
        </table>
      </div>
      {
        showDeleteModal === true && (
          <GeneralModal
            title='KATEGORİ SİLME '
            content='Bütün Kişi Bilgileride Silinecektir. Silmek İstediginize EminMisiz'
            closeButtonText='VAZGEÇ'
            confirmButtonText='SİL'
            hasConfirm={true}
            closeButtonClick={setShowDeleteModal(false)}
            confirmButtonClick={() => {
              DeleteCategory(willDeleteCategory);
              setShowDeleteModal(false)
            }}
          />
        )}
    </div>
  )
}

export default ListCategories