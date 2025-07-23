import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: number;
    quantity: number;
}

type CartState = {
    items: CartItem[];
}

const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

const initialState: CartState = {
    items: initialCart,
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            const existingCart = state.items.find(item => item.id === action.payload);
            if (existingCart) {
                existingCart.quantity++
                console.log(existingCart.quantity);

            }else{
                state.items.push({id: action.payload, quantity: 1});
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                localStorage.setItem("cart", JSON.stringify(state.items));
        },
        incrementQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
        decrementQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
        clearCart(state){
            state.items =[];
            localStorage.removeItem("cart");
        }
    }
})
export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;