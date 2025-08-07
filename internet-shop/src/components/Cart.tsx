import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState} from "../store/store";
// import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from '../utils/axiosInstance';
import {useEffect} from "react";

import {addItem, clearCart, fetchCart} from "../store/cartSlice.ts";
import axios from "axios";
import Button from "react-bootstrap/Button";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const products = useSelector((state: RootState) => state.products.items);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCart())
    }, [dispatch, products]);



    // useEffect(() => {
    //     if (products.length === 0) {
    //         // @ts-ignore
    //         dispatch(fetchProducts());
    //     }
    // }, [dispatch, products.length]);

    console.log('cart items', cartItems)

    const getProduct = (_id: number) => products.find(p => p._id === _id);

    const total = cartItems.reduce((sum, item) => {
        const product = getProduct(item._id);
        if (!product) return sum;
        return sum + item.quantity * product.price;
    }, 0);

    const handleBuy = async () => {
        const productsForOrder = cartItems.map(item => ({
            product: item._id.toString(),
            quantity: item.quantity
        }));

        const orderData = {
            products: productsForOrder,
            totalPrice: Number(total.toFixed(2))
        };
        try {
            await axios.post('api/orders', orderData);
            alert("Order placed!");
            dispatch(clearCart());
        } catch (err) {
            console.error(err);
            alert("Error placing order.");
        }
    };

    return (
        <Container>
            <Row>
                <h1 className="text-center">Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(({ _id, quantity }) => {
                            const product = getProduct(_id);
                            if (!product) return null;

                            return (
                                <Col key={product._id} className="m-3">
                                    <Link to={`/products/${product._id}`}>
                                        <img src={`http://localhost:4000/${product.image}`} alt={product.description} height="250" />
                                        <h4>{product.name}</h4>
                                    </Link>
                                    <p>Quantity: {quantity}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Subtotal: ${(quantity * product.price).toFixed(2)}</p>
                                    {/*<Button className="m-3" variant="danger" onClick={() => dispatch(decrementQty(_id))}>-</Button>*/}
                                    {/*<Button className="m-3" variant="success" onClick={() => dispatch(incrementQty(_id))}>+</Button>*/}
                                    {/*<Button className="m-3" variant="warning" onClick={() => dispatch(removeFromCart(_id))}>Remove</Button>*/}
                                </Col>
                            );
                        })}
                        <hr />
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <Button variant="success" onClick={handleBuy}>Buy</Button>
                        <Button variant="danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    </>
                )}
            </Row>
        </Container>
    );
};

export default Cart;
