import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Product } from '../types/Product';
import {type JSX, useState} from "react";
import {Link} from "react-router-dom";
import {addToCart} from "../store/cartSlice.ts";
import {useDispatch} from "react-redux";
import ModalCart from "./ModalCart.tsx";

export type ProductProps = {
    product: Product;
};

function ShopCard({ product }: ProductProps): JSX.Element {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    return (
        <Card className="shopCard">
            <Link to={`/products/${product.id}`}>
            <Card.Img variant="top" src={product.image} alt={product.name} />
            </Link>
            <Card.Body className="text-center">
                <Link to={`/products/${product.id}`}>
                <Card.Title style={{whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'}}>
                    {product.name}
                </Card.Title>
                </Link>
                <Card.Text >${product.price.toFixed(2)}</Card.Text>
                <Button variant="success" onClick={() => dispatch(addToCart(product.id)) && setModalShow(true)}>Add to Cart</Button>
                <ModalCart
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Card.Body>
        </Card>
    );
}

export default ShopCard;
