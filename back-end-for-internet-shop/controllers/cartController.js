import Cart from '../models/Cart';

export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.userId})
        res.json(cart || {items: [] });
    }catch (err){
        res.status(500).json({error: 'Failed to get fetch cart'});
    }
}
