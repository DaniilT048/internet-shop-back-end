import {type ChangeEvent, type ReactElement, useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ItemsList from "./ItemsList.tsx";
import {Category} from "../types/Category.ts";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

const Products = (): ReactElement => {
    document.title = "Shop";

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = (queryParams.get("category") as Category) || Category.ALL;
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>(categoryFromUrl);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value as Category;
        setCategory(selectedCategory);
        navigate(`/products?category=${selectedCategory}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:4000/api/products");
                setProducts(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = category === Category.ALL
        ? products
        : products.filter(product => product.category === category);

    return (
        <Container>
            <h4>Choose category: {category}</h4>
            <Form.Select className="mb-4" onChange={handleCategoryChange} value={category}>
                <option value={Category.ALL}>All products</option>
                <option value={Category.BALLS}>Balls</option>
                <option value={Category.DUMBBELLS}>Dumbbells</option>
                <option value={Category.MATS}>Mats</option>
                <option value={Category.ACCESSORIES}>Accessories</option>
            </Form.Select>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && <ItemsList products={filteredProducts} />}
        </Container>
    );
};

export default Products;
