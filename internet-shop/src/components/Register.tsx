import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {setUser} from "../store/authSlice.ts";
import {useDispatch} from "react-redux";

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
            const res = await axios.post('http://localhost:4000/api/register', {
                email,
                password,
                username
            },{
                withCredentials: true
                }
            );
            setMessage('User registered');

            if (res.data.user) {
                dispatch(setUser(res.data.user));
                navigate('/');
            } else {
                console.warn("res.data.user is undefined", res.data);
            }
            navigate('/');

        } catch (err: any) {
            console.error('Register error', err.response?.data || err.message);
            setMessage(err.response?.data?.message || 'Register error');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
