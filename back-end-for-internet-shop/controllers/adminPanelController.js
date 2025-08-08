import adminPanelSchema from '../models/AdminPanel.js'
import User from "../models/User.js";
import Order from "../models/Order.js";

export const getUsersOrders = async (req, res) => {
    try{
        const usersList = await User.find({}) && await Order.find({});
        res.json(usersList);
    }catch(err){
        console.error(err)
    }
}