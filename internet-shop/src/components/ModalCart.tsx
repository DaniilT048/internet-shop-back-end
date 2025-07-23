import {useSelector, useDispatch} from "react-redux";
import type {RootState} from "../store/store";
import products from "../data/products";
import {incrementQty, decrementQty, removeFromCart, clearCart} from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import {Modal, type ModalProps} from "react-bootstrap";
import {useNavigate} from "react-router";
import type {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import type {Omit, BsPrefixProps} from "react-bootstrap/esm/helpers";
import type {JSX} from "react/jsx-runtime";

const Cart = (props: JSX.IntrinsicAttributes & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: ReactNode | undefined; }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();

    const getProduct = (id: number) => products.find(p => p.id === id)!;

    const total = cartItems.reduce((sum, item) => {
        const product = getProduct(item.id);
        return sum + item.quantity * product.price;
    }, 0);

    const handleClickGoCart = () => {
        navigate("/cart");
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.map(({id, quantity}) => {
                        const product = getProduct(id);
                        return (
                            <div key={id}>
                                <h4>{product.name}</h4>
                                <p>Quantity: {quantity}</p>
                                <p>Price: ${product.price}</p>
                                <p>Subtotal: ${(quantity * product.price).toFixed(2)}</p>
                                <Button className="m-3" variant="danger" onClick={() => dispatch(decrementQty(id))}>-</Button>
                                <Button className="m-3" variant="success" onClick={() => dispatch(incrementQty(id))}>+</Button>
                                <Button className="m-3" variant="warning" onClick={() => dispatch(removeFromCart(id))}>Remove</Button>
                            </div>
                        );
                    })}
                    <h3>Total: ${total.toFixed(2)}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                    <Button onClick={props.onHide}>Continue shopping</Button>
                    <Button variant="success" onClick={handleClickGoCart}>Place an order</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cart;


