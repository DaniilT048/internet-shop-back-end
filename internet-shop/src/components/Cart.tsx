import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { incrementQty, decrementQty, removeFromCart, clearCart } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const products = useSelector((state: RootState) => state.products.items);

    const getProduct = (id: number) => products.find(p => p.id === id);

    const total = cartItems.reduce((sum, item) => {
        const product = getProduct(item.id);
        if (!product) return sum;
        return sum + item.quantity * product.price;
    }, 0);

    return (
        <Container>
            <Row>
                <h2 className="text-center">Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(({ _id, quantity }) => {
                            const product = getProduct(_id);
                            if (!product) return null;

                            return (
                                <Col key={_id} className="m-3">
                                    <Link to={`/products/${product._id}`}>
                                        <img src={product.image} alt={product.description} height="250" />
                                        <h4>{product.name}</h4>
                                    </Link>
                                    <p>Quantity: {quantity}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Subtotal: ${(quantity * product.price).toFixed(2)}</p>
                                    <Button className="m-3" variant="danger" onClick={() => dispatch(decrementQty(id))}>-</Button>
                                    <Button className="m-3" variant="success" onClick={() => dispatch(incrementQty(id))}>+</Button>
                                    <Button className="m-3" variant="warning" onClick={() => dispatch(removeFromCart(id))}>Remove</Button>
                                </Col>
                            );
                        })}
                        <hr />
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <Button variant="success">Buy</Button>
                        <Button variant="danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    </>
                )}
            </Row>
        </Container>
    );
};

export default Cart;
