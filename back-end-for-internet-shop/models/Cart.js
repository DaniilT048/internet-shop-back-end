import mongoose from "mongoose";

const cartItemSchema  = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    quantity: { type: Number, required: true },
})

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
})

export default mongoose.model("Cart", cartSchema);