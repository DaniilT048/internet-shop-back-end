import Cart from "../models/Cart.js";


export const getUserCart = async (req, res) => {
    try {
        console.log(req.user)
        let cart = await Cart.findOne({userId: req.user._id.toString()})

        if (!cart) {
            cart = new Cart({userId: req.user._id.toString(), items: []});
        }
        await cart.save()
        res.json(cart);

    } catch (err) {
        res.status(500).json({error: 'Failed to fetch cart'});
    }
}

export const addItemToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({userId: req.user._id.toString()})
        if (!cart) {
            cart = new Cart({userId: req.user._id.toString(), items: [{productId: req.body.productId, quantity: 1}]});
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.body.productId.toString());
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({productId: req.body.productId, quantity: 1});
            }
        }
        await cart.save()
        res.json(cart)
    } catch (err) {
        res.status(500).json({error: 'Failed to add cart', err});
    }
}

export const deleteItemFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({userId: req.user._id.toString()})
        if (!cart) {
            res.status(404).json({error: 'Cart is not found'})
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== req.body.productId.toString())
        await cart.save()
        res.json(cart)
    } catch (err) {
        res.status(500).json({error: 'failed to delete item'})
    }
}

export const deleteOneItemFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({userId: req.user._id.toString()})
        if (!cart) {
            res.status(404).json({error: 'Cart is not found'})
        }
        const deleteIndex = cart.items.findIndex(item => item.productId.toString() === req.body.productId.toString())
        if (deleteIndex === -1) {
            res.status(404).json('product not found in cart')
        }
        if (cart.items[deleteIndex].quantity === 1) {
            cart.items.splice(deleteIndex, 1)
        } else {
            cart.items[deleteIndex].quantity -= 1
        }
        await cart.save()
        res.json(cart)
    } catch (err) {
        res.status(500).json({error: 'failed to delete one item'})
    }
}

export const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({userId: req.user._id.toString()})
        if (!cart) {
            res.status(404).json({error: 'Cart is not found'})
        }
        cart.items = []
        await cart.save()
        res.json(cart)
    } catch (err) {
        res.status(500).json({error: 'failed to delete one item'})
    }
}


