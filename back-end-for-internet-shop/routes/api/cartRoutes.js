import express from "express";
import {addItemToCart, deleteItemFromCart, getUserCart} from "../../controllers/cartController.js";
import {requireAuth} from "../../controllers/userController.js";

const cartRoutes = express.Router();

cartRoutes.get('/', requireAuth, getUserCart)
cartRoutes.put('/', requireAuth, addItemToCart)
cartRoutes.delete('/', requireAuth, deleteItemFromCart)