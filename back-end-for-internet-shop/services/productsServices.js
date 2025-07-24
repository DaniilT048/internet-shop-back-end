import { Product } from '../models/Product.js';

export async function getAllProducts(category, sort) {
    const filter = {};
    if (category) filter.category = category;

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    if (sort === 'desc') sortOption.price = -1;

    return await Product.find(filter).sort(sortOption).lean();
}

export async function getProductById(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return null;
    return await Product.findById(id).lean();
}