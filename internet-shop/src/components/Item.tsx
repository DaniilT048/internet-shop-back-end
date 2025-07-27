import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {addToCart} from "../store/cartSlice.ts";
import Button from "react-bootstrap/Button";
import ModalCart from "./ModalCart.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

const Item = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams<{ id: string }>();
    const products = useSelector((state: RootState) => state.products.items);


    const product = products.find(p => p._id === id);

    useEffect(() => {
        if (product) {
            document.title = product.name;
        }
    }, [product]);


    if (!product) return <h2>Product not found</h2>;

    return (
        <Container className="text-center">
            <div className="card bg-info">
                <div>
                    <img src={`.${product.image}`} className="card-img-top" alt={product.description}  style={{width: '300px', }}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">About product: {product.description}</p>
                    <p className="card-text text-body-secondary">${product.price}</p>
                    <Button variant="success" onClick={() => dispatch(addToCart(product.id)) && setModalShow(true)}>Add to Cart</Button>
                    <ModalCart
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Item;