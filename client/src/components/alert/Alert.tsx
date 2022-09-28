import './Alert.sass'
import Button from '../button/Button'
import { setAlertStatus } from '../../slices/productSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'

const Alert = () => {

    const dispatch = useAppDispatch()
    const { alertStatus, alertMessage } = useAppSelector(state => state.productReducer)

    return (
        <div className={`alert-wrapper ${alertStatus ? 'alert-wrapper-open fade-in' : ''}`}>
            <div className='alert'>
                <span>{alertMessage}</span>
                <Button btnType={'colored'} onSomething={() => dispatch(setAlertStatus(false))}>Ок</Button>
            </div>
            <div className="overlay" onClick={() => dispatch(setAlertStatus(false))}></div>
        </div>
    )
}

export default Alert