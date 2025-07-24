import { Product } from '../models/Product.js';

export async function getProducts(req, res) {
    const { category, sort } = req.query;

    const filter = category ? { category } : {};
    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const products = await Product.find(filter).sort(sortOption).lean();
    res.json(products);
}

export async function getProduct(req, res) {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ message: 'Invalid ID' });

    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ message: 'Not found' });

    res.json(product);
}
