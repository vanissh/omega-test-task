import { configureStore } from '@reduxjs/toolkit';
import { reducer as productReducer } from "../slices/productSlice"

export const store = configureStore({
    reducer: { productReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch