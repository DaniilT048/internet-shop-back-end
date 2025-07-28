import {type ChangeEvent, type ReactElement, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ShopCard from "./ShopCard";
import { Category } from "../types/Category";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import type { Product } from "../types/Product";
import type { RootState } from "../store/store";

const Products = (): ReactElement => {
    document.title = "Shop";

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: products, loading, error } = useSelector((state: RootState) => state.products);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        const params = new URLSearchParams(location.search);
        params.set('category', selectedCategory);
        navigate(`/products/?${params.toString()}`);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const sort = event.target.value;
        const params = new URLSearchParams(location.search);
        if (sort) {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }
        navigate(`/products/?${params.toString()}`);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = (queryParams.get("category") as Category) || Category.ALL;
        const sortFromUrl = queryParams.get("sort") as 'asc' | 'desc' | undefined;

        // @ts-ignore
        dispatch(fetchProducts({
            category: categoryFromUrl === Category.ALL ? undefined : categoryFromUrl,
            sort: sortFromUrl
        }));
    }, [dispatch, location.search]);

    return (
        <Container>
            <h4>Choose category:</h4>
            <Form.Select className="mb-4" onChange={handleCategoryChange} value={new URLSearchParams(location.search).get('category') || Category.ALL}>
                <option value={Category.ALL}>All products</option>
                <option value={Category.BALLS}>Balls</option>
                <option value={Category.DUMBBELLS}>Dumbbells</option>
                <option value={Category.MATS}>Mats</option>
                <option value={Category.ACCESSORIES}>Accessories</option>
            </Form.Select>

            <Form.Select className="mb-4" onChange={handleSortChange} value={new URLSearchParams(location.search).get('sort') || ''}>
                <option value="">Sort by</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </Form.Select>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {products.map((product: Product) => (
                        <ShopCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Products;
