import express from 'express';
import {getProduct, getProducts} from '../../controllers/productController.js';

const products = express.Router();

products.get('/api/products', getProducts);
products.get('/api/products/:id', getProduct);

export default products;