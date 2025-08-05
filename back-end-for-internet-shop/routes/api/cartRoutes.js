import express from "express";
import {
    addItemToCart, clearCart,
    deleteItemFromCart,
    deleteOneItemFromCart,
    getUserCart
} from "../../controllers/cartController.js";
import {requireAuth} from "../../controllers/userController.js";

const cartRoutes = express.Router();

cartRoutes.get('/api/cart/get', requireAuth, getUserCart)
cartRoutes.put('/api/cart/add', requireAuth, addItemToCart)
cartRoutes.delete('/api/cart/deleteItem', requireAuth, deleteItemFromCart)
cartRoutes.delete('/api/cart/deleteOneItem', requireAuth, deleteOneItemFromCart)
cartRoutes.delete('/api/cart/clear', requireAuth, clearCart)


export default cartRoutes;