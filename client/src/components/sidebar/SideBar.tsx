import './SideBar.sass'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { setActiveCategory, setModalStatus } from '../../slices/productSlice'

const SideBar = () => {

    const { categories, activeCategory, purchases } = useAppSelector(state => state.productReducer)
    const dispatch = useAppDispatch()

    return (
        <aside className="sidebar">
            <Button
                btnType={'transparent'}
                onSomething={() => dispatch(setActiveCategory(''))}
            >
                <span className="icon icon-playlist_add sidebar-icon"></span>
                Весь список
            </Button>
            <Button
                btnType={'transparent'}
                onSomething={() => { }}
            >
                <span className="icon icon-local_grocery_store sidebar-icon"></span>
                Покупки ({purchases.length})
            </Button>
            <div className='sidebar-categories'>
                <ul className='sidebar-categories-list'>
                    {categories && categories.map(item =>
                        <li
                            className={`sidebar-categories-list-item 
                                ${item.label === activeCategory ? 'sidebar-active' : ''}`}
                            onClick={() => dispatch(setActiveCategory(item.label))}
                            key={item.id}
                        >
                            <span
                                className="icon icon-circle sidebar-categories-icon"
                                style={{ color: `${item.color}` }}>
                            </span>
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
            <Button btnType={'transparent'} onSomething={() => dispatch(setModalStatus(true))}>
                <span className="icon icon-add_circle_outline sidebar-icon"></span>
                Создать товар
            </Button>
        </aside>
    )
}

export default SideBar