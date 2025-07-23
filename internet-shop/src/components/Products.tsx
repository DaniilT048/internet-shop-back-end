import {type ChangeEvent, type ReactElement, useState} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import products from "../data/products.ts";
import ItemsList from "./ItemsList.tsx";
import {Category} from "../types/Category.ts";
import {useLocation, useNavigate} from "react-router";


const Products = ():ReactElement => {
    document.title = "Shop";

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = (queryParams.get("category") as Category) || Category.ALL;
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>(categoryFromUrl);

    const handleCategoryChange= (event: ChangeEvent<HTMLSelectElement>)=> {
        const selectedCategory = event.target.value as Category;
        setCategory(selectedCategory);
        navigate(`/products?category=${selectedCategory}`);
    }
    const filteredProducts = category === Category.ALL ? products : products.filter(product => product.category === category);
    return(
        <Container>
            <h4>Chose category: {category}</h4>
            <Form.Select className="mb-4" onChange={handleCategoryChange} value={category}>
                <option value={Category.ALL}>All products</option>
                <option value={Category.BALLS}>Balls</option>
                <option value={Category.DUMBBELLS}>Dumbbells</option>
                <option value={Category.MATS}>Mats</option>
                <option value={Category.ACCESSORIES}>Accessories</option>
            </Form.Select>
            <ItemsList products={filteredProducts}/>
        </Container>
    )

}

export default Products;