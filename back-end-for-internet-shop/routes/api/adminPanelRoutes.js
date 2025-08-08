import express from "express";
import {getUsersOrders} from "../../controllers/adminPanelController.js";


const adminPanelRoutes = express.Router();

adminPanelRoutes.get("/api/adminPanel/usersList", getUsersOrders);


export default adminPanelRoutes;