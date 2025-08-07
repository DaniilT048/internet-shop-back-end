import { useSelector, useDispatch } from "react-redux";
import type {AppDispatch, RootState} from "../store/store";
import {
    clearCart,
    deleteOneItem,
    addItem,
    deleteItem
} from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import { Modal, type ModalProps } from "react-bootstrap";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";

interface CartProps extends ModalProps {
    children?: ReactNode;
}

const Cart = (props: CartProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const cartItems = useSelector((state: RootState) => state.cart.items);
    const products = useSelector((state: RootState) => state.products.items);


    const getProduct = (_id: string) => products.find((p) => p._id === _id);

    const total = cartItems.reduce((sum, item) => {
        const product = getProduct(item.productId);
        if (!product) return sum;
        return sum + item.quantity * product.price;
    }, 0);

    const handleClickGoCart = () => {
        navigate("/cart");
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cartItems.length === 0 && <p>Your cart is empty</p>}

                {cartItems.map(({ productId, quantity }) => {
                    const product = getProduct(productId);
                    if (!product) return null;

                    return (
                        <div key={productId}>
                            <h4>{product.name}</h4>
                            <p>Quantity: {quantity}</p>
                            <p>Price: ${product.price}</p>
                            <p>Subtotal: ${(quantity * product.price).toFixed(2)}</p>
                            <Button
                                className="m-3"
                                variant="danger"
                                onClick={() => dispatch(deleteOneItem(productId))}
                            >
                                -
                            </Button>
                            <Button
                                className="m-3"
                                variant="success"
                                onClick={() => dispatch(addItem(productId))}
                            >
                                +
                            </Button>
                            <Button
                                className="m-3"
                                variant="warning"
                                onClick={() => dispatch(deleteItem(productId))}
                            >
                                Remove
                            </Button>
                        </div>
                    );
                })}
                {cartItems.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </Button>
                <Button onClick={props.onHide}>Continue shopping</Button>
                <Button variant="success" onClick={handleClickGoCart}>
                    Place an order
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Cart;
