import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', {
                email,
                password,
                username,
            });

            if (res.data.user && res.data.token) {
                localStorage.setItem('token', res.data.token);
                dispatch(setUser(res.data.user));
                navigate('/');
            } else {
                setMessage('Unexpected response from server');
            }
        } catch (err: any) {
            console.error('Register error', err.response?.data || err.message);
            setMessage(err.response?.data?.message || 'Register error');
        }
    };

    return (
        <Container>
            <form onSubmit={handleRegister} className="m-5">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </Container>
    );
};

export default Register;
