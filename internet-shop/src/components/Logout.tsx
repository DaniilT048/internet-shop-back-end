import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
