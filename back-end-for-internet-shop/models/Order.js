import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
