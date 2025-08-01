import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/orders/me", {
                    withCredentials: true,
                });
                console.log(res.data);
                setOrders(res.data);
            } catch (err: any) {
                console.error("Error fetching orders:", err);
                setError("Failed to load your orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (!user) return <p>You are not a user</p>;
    if (loading) return <p>Loading your orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container style={{ padding: "2rem" }}>
            <h1>Profile</h1>
            <h2><strong>Name:</strong> {user.username}</h2>
            <h2><strong>Email:</strong> {user.email}</h2>
            <h1>Your purchases:</h1>
            {orders.length === 0 ? (
                <p>You haven’t bought anything yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
                        <h4>Order on: {new Date(order.createdAt).toLocaleString()}</h4>
                        <p><strong>Total price:</strong> ${order.totalPrice}</p>
                        <ul>
                            {order.products.map((p: any, idx: number) => (
                                <li key={idx}>
                                    {p.product?.name} — ${p.product?.price} × {p.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </Container>
    );
};

export default Profile;
