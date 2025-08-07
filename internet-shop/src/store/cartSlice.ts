import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import axios from '../utils/axiosInstance';

export const fetchCart = createAsyncThunk(
    'cart/get',
    async () => {
        const res = await axios.get('api/cart/get')
        return res.data
    }
)

export const addItem = createAsyncThunk(
    'cart/add',
    async (productId: string) => {
        const res = await axios.put('api/cart/add', {productId})
        console.log({productId})
        return res.data

    }
)

export const deleteOneItem = createAsyncThunk(
    '/api/cart/deleteOneItem',
    async (productId: string) => {
        const res = await axios.delete('api/cart/deleteOneItem', {data: {productId}})
        return res.data
    }
)

export const deleteItem = createAsyncThunk(
    '/api/cart/deleteItem',
    async (productId: string) => {
        const res = await axios.delete('api/cart/deleteItem', {data: {productId}})
        return res.data
    }
)

export const clearCart = createAsyncThunk(
    '/api/cart/clear',
    async () => {
        const res = await axios.delete('api/cart/clear')
        return res.data
    }
)

type CartItem = {
    productId: string;
    quantity: number;
}

type CartState = {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState: CartState = {
    items: initialCart,
    loading: false,
    error: null
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                console.log('items,', state)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error download cart';
            })
            .addCase(addItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                console.log('items,', state)
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error added to cart';
            })
            .addMatcher(isPending(fetchCart, addItem, deleteItem, deleteOneItem, clearCart), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isFulfilled(fetchCart, addItem, deleteItem, deleteOneItem, clearCart), (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                console.log('items,', state)
            })
            .addMatcher(isRejected(fetchCart, addItem, deleteItem, deleteOneItem, clearCart), (state, action) =>{
                state.loading = false;
                state.error = action.error.message || 'went wrong';
            })
    }
})
export const {addToCart, removeFromCart, incrementQty, decrementQty,} = cartSlice.actions;
export default cartSlice.reducer;