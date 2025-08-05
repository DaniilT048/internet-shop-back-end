import express from "express";
import {getUserCart} from "../../controllers/cartController.js";
import {requireAuth} from "../../controllers/userController.js";

const cartRoutes = express.Router();

cartRoutes.get('/', requireAuth, getUserCart)