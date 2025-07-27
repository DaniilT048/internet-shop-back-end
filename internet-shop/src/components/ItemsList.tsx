import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShopCard from "./ShopCard";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { ReactElement } from "react";

const ItemsList = (): ReactElement => {
    const products = useSelector((state: RootState) => state.products.items);

    return (
        <Row>
            {products.map((product) => (
                <Col key={products._id} sm={6} md={4} lg={3}>
                    <ShopCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ItemsList;
