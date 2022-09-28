import CardList from './components/cardList/CardList';
import Modal from './components/modal/Modal';
import Alert from './components/alert/Alert';
import SideBar from './components/sidebar/SideBar';
import { productsUrl, categoriesUrl, purchasesUrl } from './consts'
import { fetchProducts, fetchCategories, setFilteredProducts, fetchPurchase } from './slices/productSlice';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { useEffect } from 'react'

function App() {

  const dispatch = useAppDispatch()
  const { products } = useAppSelector(state => state.productReducer)

  useEffect(() => {
    dispatch(fetchProducts(productsUrl))
    dispatch(fetchPurchase(purchasesUrl))
    dispatch(fetchCategories(categoriesUrl))
  }, [])

  useEffect(() => {
    dispatch(setFilteredProducts())
  }, [products])

  return (
    <div className="container">
      <SideBar />
      <CardList />
      <Modal />
      <Alert />
    </div>
  );
}

export default App;
