import express from 'express';
import { getProducts } from '../../controllers/productController.js';

const router = express.Router();

router.get('/api/products', getProducts);
// router.get('/api/products/:id', getProduct);

export default router;