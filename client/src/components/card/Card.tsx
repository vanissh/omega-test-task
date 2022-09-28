import './Card.sass'
import Button from '../button/Button'
import { useAppDispatch } from '../../hooks/hook'
import { createPurchase, Product } from '../../slices/productSlice'
import { deleteProduct } from '../../slices/productSlice'
import { productsUrl, purchasesUrl } from '../../consts/index'

interface CardProps {
    product: Product
}

const Card = ({ product }: CardProps) => {

    const dispatch = useAppDispatch()

    return (
        <div className='card'>
            <div className='card-img'>
                <img src={product.img} alt={product.name} />
            </div>
            <div className='card-main-info'>
                <div className='card-title'>{product.name}</div>
                <div className='card-price'><span>{product.price}</span> ₽</div>
            </div>
            <div className='card-description'>
                <p>{product.info.length > 50 ? product.info.slice(0, 35) + '...' : product.info}</p>
            </div>
            <Button
                btnType={'colored'}
                onSomething={() => dispatch(createPurchase({ url: purchasesUrl, id: product.id }))}
            >
                Купить
            </Button>
            <Button
                btnType={'delete'}
                onSomething={() => dispatch(deleteProduct(productsUrl + product.id))}
            >
                <span className="icon icon-delete"></span>
            </Button>
        </div>
    )
}

export default Card