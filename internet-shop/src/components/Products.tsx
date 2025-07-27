import { type ChangeEvent, type ReactElement, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ShopCard  from "./ShopCard";
import { Category } from "../types/Category";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import type {Product} from "../types/Product.ts";
import type {RootState} from "../store/store.ts";


const Products = (): ReactElement => {
    document.title = "Shop";

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = (queryParams.get("category") as Category) || Category.ALL;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state: RootState) => state.products);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value as Category;
        navigate(`/products?category=${selectedCategory}`);
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProducts({ category: categoryFromUrl }));
    }, [dispatch, categoryFromUrl]);

    const filteredProducts = categoryFromUrl === Category.ALL
        ? products
        : products.filter(product => product.category === categoryFromUrl);

    return (
        <Container>
            <h4>Choose category: {categoryFromUrl}</h4>
            <Form.Select className="mb-4" onChange={handleCategoryChange} value={categoryFromUrl}>
                <option value={Category.ALL}>All products</option>
                <option value={Category.BALLS}>Balls</option>
                <option value={Category.DUMBBELLS}>Dumbbells</option>
                <option value={Category.MATS}>Mats</option>
                <option value={Category.ACCESSORIES}>Accessories</option>
            </Form.Select>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {filteredProducts.map((product: Product) => (
                        <ShopCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Products;
