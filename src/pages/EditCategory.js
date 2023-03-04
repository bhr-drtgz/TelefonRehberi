import React from 'react'
import Header from '../companents/Header'

const AddCategory = () => {
    return (
        <div>
            <Header />
            <div className='newPhoneTitle'>
                <div> GÜNCELLE</div>
            </div>
            <div className="formWrapper">
                <form >
                    <div className="formElement">
                        <label htmlFor="name">KATEGORİ:</label>
                        <input
                            id="name"
                            type="text"
                            onChange={() => ({})
                            }
                        />
                    </div>
                    <div className="submitBtnWrapper">
                        <button className="submitBtn" type="submit">
                            GÜNCELLE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory