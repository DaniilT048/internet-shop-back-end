import express from 'express';
import { createOrder, getUserOrders } from '../../controllers/orderController.js';
import { requireAuth } from '../../controllers/userController.js';

const router = express.Router();

router.post('/api/orders', requireAuth, createOrder);
router.get('/api/orders', requireAuth, getUserOrders);

export default router;
