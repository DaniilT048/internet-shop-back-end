import {configureStore} from "@reduxjs/toolkit";
import cartSlice from './cartSlice.ts'
import productsSlice from "./productsSlice.ts";
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productsSlice,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
