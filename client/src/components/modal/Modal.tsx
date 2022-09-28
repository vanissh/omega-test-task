import './Modal.sass'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { setModalStatus, setAlertStatus, setAlertMessage } from '../../slices/productSlice'
import { createProduct } from '../../slices/productSlice'
import { useState } from 'react'
import { productsUrl, validationAlert } from '../../consts'
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../slices/productSlice'

const Modal = () => {

    const dispatch = useAppDispatch()
    const { categories, modalStatus } = useAppSelector(state => state.productReducer)

    const initialState = {
        id: uuidv4(),
        name: '',
        info: '',
        img: '',
        category: 'products',
        price: ''
    }

    const [state, setState] = useState<Product>({ ...initialState })

    const handleSubmit = () => {
        if (state.name && state.img && state.category && state.price) {
            dispatch(createProduct({ url: productsUrl, product: { ...state } }))
            setState({ ...initialState })
        } else {
            dispatch(setAlertMessage(validationAlert))
            dispatch(setAlertStatus(true))
        }
    }

    return (
        <div className={`modal-wrapper ${modalStatus ? 'modal-wrapper-open fade-in' : ''}`}>
            <div className='modal'>
                <p className='title'>Создать товар</p>
                <form noValidate>
                    <div className="row">
                        <label htmlFor="price" className="modal-label">Название *</label>
                        <input
                            type="text"
                            id="price"
                            onChange={e => setState({ ...state, name: e.target.value })}
                            value={state.name}
                            className="modal-input" placeholder="Введите название товара"
                            required
                        />
                    </div>
                    <div className="wrapper">
                        <div className="row">
                            <label htmlFor="price" className="modal-label">Стоимость *</label>
                            <input
                                type="text"
                                id="price"
                                onChange={e => setState({ ...state, price: e.target.value.replace(/\D/, '') })}
                                value={state.price}
                                className="modal-input"
                                placeholder="Введите стоимость товара"
                                required
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="categories" className="modal-label">Выбрать категорию *</label>
                            <select
                                id="categories"
                                onChange={e => setState({ ...state, category: e.target.value })}
                                value={state.category}
                                className="modal-input"
                            >
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.label}>{item.name}</option>
                                )}
                            </select>
                        </div>

                    </div>
                    <div className="row">
                        <label htmlFor="link" className="modal-label">Добавить ссылку на изображение *</label>
                        <input
                            type="text"
                            id="link"
                            onChange={e => setState({ ...state, img: e.target.value })}
                            value={state.img}
                            className="modal-input"
                            placeholder="Ссылка на фото"
                            required
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="description" className="modal-label">Добавить описание</label>
                        <textarea
                            name="description"
                            id="description"
                            value={state.info}
                            onChange={e => setState({ ...state, info: e.target.value })}
                            className="modal-input modal-textarea">
                        </textarea>
                    </div>
                </form>
                <Button btnType={'delete'} onSomething={() => dispatch(setModalStatus(false))}><p>&times;</p></Button>
                <Button btnType={'colored'} onSomething={() => handleSubmit()}>Добавить товар</Button>
            </div>
            <div className="overlay" onClick={() => dispatch(setModalStatus(false))}></div>
        </div>
    )
}

export default Modal