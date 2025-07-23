import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShopCard from "./ShopCard";
import type { Product } from '../types/Product';
import type {ReactElement} from "react";

type ItemListProps = {
    products: Product[];
};

const ItemsList = ({ products }: ItemListProps): ReactElement => {
    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id} sm={6} md={4} lg={3}>
                    <ShopCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ItemsList;
