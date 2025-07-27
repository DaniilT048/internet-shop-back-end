import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {addToCart} from "../store/cartSlice.ts";
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
        <div className="container my-5">
            <div className="row g-5">
                <div className="col-md-6">
                    <div className="position-relative">
                        <img
                            src={`http://localhost:4000/${product.image}`}
                            alt={product.name}
                            className="img-fluid rounded shadow-lg"
                            style={{ transition: "transform 0.3s", height: '500px', objectFit: 'contain' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            data-bs-toggle="modal"
                            data-bs-target="#imageModal"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h1 className="display-5 fw-bold">{product.name}</h1>
                    <p className="text-muted">{product.category}</p>
                    <p className="fs-4 fw-semibold text-success">${product.price}</p>
                    <p className="lead">{product.description}</p>

                    <div className="d-flex gap-3 mt-4">
                        <button className="btn btn-dark btn-lg shadow-sm" onClick={() => dispatch(addToCart(product._id)) && setModalShow(true)}>
                            <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="imageModal"
                tabIndex={-1}
                aria-labelledby="imageModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark">
                        <div className="modal-body p-0">
                            <img src={`.${product.image}`} className="img-fluid w-100" alt="Zoom" />
                        </div>
                    </div>
                </div>
            </div>
            <ModalCart
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>

    );
};

export default Item;