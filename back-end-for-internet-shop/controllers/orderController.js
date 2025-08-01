import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const { products, totalPrice } = req.body;

    try {
        const newOrder = new Order({
            user: req.session.user._id,
            products,
            totalPrice,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: "Failed to create order", error: err });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.session.user._id }).populate("products.productId");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders", error: err });
    }
};
