import express from "express";
import {
    addItemToCart, clearCart,
    deleteItemFromCart,
    deleteOneItemFromCart,
    getUserCart
} from "../../controllers/cartController.js";
import {requireAuth} from "../../controllers/userController.js";

const cartRoutes = express.Router();

cartRoutes.get('/api/cart', requireAuth, getUserCart)
cartRoutes.put('/api/addToCart', requireAuth, addItemToCart)
cartRoutes.delete('/api/deleteItem', requireAuth, deleteItemFromCart)
cartRoutes.delete('/api/deleteOneItem', requireAuth, deleteOneItemFromCart)
cartRoutes.delete('/api/clearCart', requireAuth, clearCart)


export default cartRoutes;