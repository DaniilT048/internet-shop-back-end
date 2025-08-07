import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import {resetCart} from "../store/cartSlice.ts";

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        dispatch(resetCart());
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
