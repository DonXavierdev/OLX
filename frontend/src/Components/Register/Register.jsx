import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Login/axiosInstance'; // Import axiosInstance for authentication

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            // Register the user
            await axios.post('http://localhost:8000/api/register/', {
                username: username,
                email: email,
                password: password
            });
            console.log('User registered successfully');

            // After successful registration, automatically log in the user
            const response = await axiosInstance.post('login/', {
                username: username,
                password: password
            });

            // If login is successful, store the token in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', 'true'); // Set a flag to indicate that the user is logged in

            console.log('User logged in successfully after registration');
            // Redirect the user to the dashboard or any other appropriate page
            navigate('/dashboard');
        } catch (error) {
            console.error('Error registering user:', error.response.data.error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
