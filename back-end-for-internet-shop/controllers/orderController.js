import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const { products, totalPrice } = req.body;

    if (!req.user?._id) {
        return res.status(401).json({ message: "Unauthorized: user not logged in" });
    }

    try {
        const newOrder = new Order({
            user: req.user._id,
            products,
            totalPrice,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: "Failed to create order", error: err.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const orders = await Order.find({ user: userId })
            .populate('products.product');
            console.log(orders);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

