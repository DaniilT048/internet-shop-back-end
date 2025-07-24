import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    imageUrl: String,
    description: String,
    category: String,
}, {
    timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
