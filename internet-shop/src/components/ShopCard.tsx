import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Product } from '../types/Product';
import {type JSX, useState} from "react";
import {Link} from "react-router-dom";
import {addItem} from "../store/cartSlice.ts";
import {useDispatch} from "react-redux";
import ModalCart from "./ModalCart.tsx";
import type {AppDispatch} from "../store/store.ts";

export type ProductProps = {
    product: Product;
};



function ShopCard({ product }: ProductProps): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [modalShow, setModalShow] = useState(false);

     const handleAddEvent = () =>{
      dispatch(addItem(product._id));
      setModalShow(true)
}

    return (
        <Card className="shopCard">
            <Link to={`/products/${product._id}`}>
            <Card.Img variant="top" src={`http://localhost:4000/${product.image}`} alt={product.name} style={{ height: '200px', objectFit: 'contain' }}  />
            </Link>
            <Card.Body className="text-center">
                <Link to={`/products/${product._id}`}>
                <Card.Title style={{whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'}}>
                    {product.name}
                </Card.Title>
                </Link>
                <Card.Text >${product.price.toFixed(2)}</Card.Text>
                <Button variant="success" onClick={handleAddEvent}>Add to Cart</Button>
                <ModalCart
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Card.Body>
        </Card>
    );
}

export default ShopCard;
