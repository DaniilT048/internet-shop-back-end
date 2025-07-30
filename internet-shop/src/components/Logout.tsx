import { useDispatch } from 'react-redux';
import { clearUser } from '../store/authSlice';
import axios from 'axios';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/logout', {}, {
                withCredentials: true
            });
            dispatch(clearUser());
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
