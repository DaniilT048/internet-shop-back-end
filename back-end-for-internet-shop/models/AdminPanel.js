import mongoose from 'mongoose';

const adminPanelSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orders: {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        orderStatus: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Admin', adminPanelSchema);