import { useSelector } from 'react-redux';
import type {RootState} from '../store/store';
import Container from "react-bootstrap/Container";

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return <p>You are not a user</p>;

    return (
        <Container style={{ padding: '2rem' }}>
            <h1>Profile</h1>
            <h2><strong>Name:</strong> {user.username}</h2>
            <h2><strong>Email:</strong> {user.email}</h2>
            <h1> Your bought: </h1>
        </Container>
    );
};

export default Profile;
