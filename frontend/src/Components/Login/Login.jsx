import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: username,
                password: password
            });
            console.log('Login successful');
            // Store token in localStorage or state for future authenticated requests
            // localStorage.setItem('token', response.data.token);
            // Redirect user to home page
            // history.push('/read'); 
            navigate("/");

        } catch (error) {
            console.error('Error logging in:', error.response.data.error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
