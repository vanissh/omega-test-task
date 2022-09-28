import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { options, errorAlert, createSuccessAlert, buyAlert, deleteAlert } from '../consts'

export interface Categories {
    id: number,
    name: string,
    label: string,
    color: string
}

export interface Product {
    id: string,
    name: string,
    category: string,
    price: string | number,
    img: string,
    info: string
}

export interface CreateProductProps {
    url: string,
    product: Product
}

export interface PurchasesProps {
    url: string,
    id: string
}

export interface ProductState {
    categories: Categories[],
    products: Product[],
    activeCategory: string,
    productsLoadingStatus: string,
    filteredProducts: Product[],
    purchases: string[],
    modalStatus: boolean,
    alertStatus: boolean,
    alertMessage: string,
}

const initialState: ProductState = {
    products: [],
    categories: [],
    productsLoadingStatus: 'idle',
    activeCategory: '',
    filteredProducts: [],
    purchases: [],
    modalStatus: false,
    alertStatus: false,
    alertMessage: ''
}

export const createPurchase = createAsyncThunk(
    'product/createPurchase',
    async ({ url, id }: PurchasesProps) => {
        return await fetch(url, {
            ...options,
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
    }
)
export const fetchPurchase = createAsyncThunk(
    'product/fetchPurchase',
    async (url: string) => {
        return await fetch(url)
            .then(res => res.json())
    }
)

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (url: string) => {
        return await fetch(url)
            .then(res => res.json())
    }
)

export const fetchCategories = createAsyncThunk(
    'product/fetchCategories',
    async (url: string) => {
        return await fetch(url)
            .then(res => res.json())
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async ({ url, product }: CreateProductProps) => {
        return await fetch(url, {
            ...options,
            body: JSON.stringify(product)
        })
            .then(res => res.json())
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (url: string) => {
        return await fetch(url, {
            ...options,
        })
            .then(res => res.json())
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
            state.filteredProducts = state.products.filter(item =>
                action.payload ? item.category === action.payload : true
            )
        },
        setFilteredProducts: (state) => {
            state.filteredProducts = state.products.filter(item =>
                state.activeCategory ? item.category === state.activeCategory : true
            )
        },
        setPurchases: (state, action) => {
            state.purchases.push(action.payload)
        },
        setAlertStatus: (state, action) => {
            state.alertStatus = action.payload
        },
        setModalStatus: (state, action) => {
            state.modalStatus = action.payload
        },
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, state => { state.productsLoadingStatus = 'loading' })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle'
                state.products = action.payload
                state.filteredProducts = action.payload
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.productsLoadingStatus = 'idle'
                state.products = action.payload
                state.alertMessage = createSuccessAlert
                state.alertStatus = true
                state.modalStatus = false
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = action.payload
                state.alertMessage = deleteAlert
                state.alertStatus = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.alertMessage = errorAlert
                state.alertStatus = true
            })
            .addCase(fetchPurchase.fulfilled, (state, action) => {
                state.purchases = action.payload
            })
            .addCase(createPurchase.fulfilled, (state, action) => {
                state.purchases = action.payload
                state.alertMessage = buyAlert
                state.alertStatus = true
            })
            .addCase(createPurchase.rejected, (state) => {
                state.alertMessage = errorAlert
                state.alertStatus = true
            })
            .addCase(fetchProducts.rejected, state => {
                state.alertMessage = errorAlert
                state.alertStatus = true
            })
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = productSlice

export { reducer }

export const {
    setActiveCategory,
    setFilteredProducts,
    setPurchases,
    setModalStatus,
    setAlertStatus,
    setAlertMessage
} = actions
