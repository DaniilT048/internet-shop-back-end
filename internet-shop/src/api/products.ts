export async function fetchProducts() {
    const response = await fetch('http://localhost:4000/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}