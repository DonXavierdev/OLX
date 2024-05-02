import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Import axiosInstance

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in, if so, redirect to dashboard
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('login/', {
                username: username,
                password: password
            });
            
            // If login is successful, store the token in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', 'true'); // Set a flag to indicate that the user is logged in

            console.log('Login successful');
            setError('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default LoginForm;
