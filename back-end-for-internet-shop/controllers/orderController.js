export const createOrder = async (req, res) => {
    const { products, totalPrice } = req.body;

    if (!req.session?.user?._id) {
        return res.status(401).json({ message: "Unauthorized: user not logged in" });
    }

    try {
        const newOrder = new Order({
            user: req.session.user._id,
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
    if (!req.session?.user?._id) {
        return res.status(401).json({ message: "Unauthorized: user not logged in" });
    }

    try {
        const orders = await Order.find({ user: req.session.user._id }).populate("products.productId");
        res.json(orders);
    } catch (err) {
        console.error("Fetching orders error:", err);
        res.status(500).json({ message: "Failed to fetch orders", error: err.message });
    }
};
