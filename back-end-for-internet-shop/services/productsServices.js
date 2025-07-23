import {db } from '../src/db.js';
import { ObjectId } from 'mongodb';

export async function getAllProductsWithCursor(category, sort) {
    const filter = {};
    if (category) filter.category = category;

    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    if (sort === 'desc') sortOption.price = -1;

    const cursor = db.collection('products')
        .find(filter)
        .sort(sortOption);

    const products = [];
    for await (const product of cursor) {
        products.push(product);
    }

    return products;
}

export async function getProductById(id) {
    const { ObjectId } = await import('mongodb');
    if (!ObjectId.isValid(id)) return null;

    return db.collection('products').findOne({ _id: new ObjectId(id) });
}