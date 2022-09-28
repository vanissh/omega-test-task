import './CardList.sass'
import Card from '../card/Card'
import { useAppSelector } from '../../hooks/hook'

const CardList = () => {

    const { filteredProducts } = useAppSelector(state => state.productReducer)
    return (
        <div className='card-list'>
            {filteredProducts && filteredProducts.map(item => <Card key={item.id} product={item} />)}
        </div>
    )
}

export default CardList