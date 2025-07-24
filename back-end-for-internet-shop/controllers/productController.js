import { Product } from '../models/Product.js';

export async function getProducts(req, res) {
    try {
        const { category, sort } = req.query;

        const filter = category ? { category } : {};
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const products = await Product.find(filter).sort(sortOption).lean();

        res.json(products);
        console.log('Category:', category);
        console.log('Sort:', sort);
        console.log('Filter:', filter);
        console.log('SortOption:', sortOption);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// export async function getProduct(req, res) {
//     try {
//         const id = req.params.id;
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ message: 'Invalid ID' });
//         }
//
//         const product = await Product.findById(id).lean();
//         if (!product) {
//             return res.status(404).json({ message: 'Not found' });
//         }
//
//         res.json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }
