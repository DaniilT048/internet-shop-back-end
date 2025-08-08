import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number, required: true},
        },
    ],
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending', 'processing', 'out for delivery', 'delivered', 'completed', 'cancelled'],
            message: '{VALUE} is not supported',
            default: 'Pending'
        }
    },
    totalPrice: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model("Order", orderSchema);
