import express from 'express';
import { createOrder, getUserOrders } from '../../controllers/orderController.js';
import { requireAuth } from '../../controllers/userController.js';

const router = express.Router();

router.post('/orders', requireAuth, createOrder);
router.get('/orders', requireAuth, getUserOrders);

export default router;
