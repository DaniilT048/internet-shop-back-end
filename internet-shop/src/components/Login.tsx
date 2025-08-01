import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import axios from '../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', { email, password });

            localStorage.setItem('token', res.data.token);
            dispatch(setUser(res.data.user));
            setMessage('Login successful');
            navigate('/');
        } catch (err: any) {
            console.error('Login error', err.response?.data || err.message);
            setMessage(err.response?.data?.message || 'Login error');
        }
    };

    return (
        <Container>
            <form onSubmit={handleLogin} className="m-5">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
        </Container>
    );
};

export default Login;
