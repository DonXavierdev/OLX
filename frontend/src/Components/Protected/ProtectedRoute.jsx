import React from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        // Redirect to login page or any other appropriate page
        navigate('/');
    };

    return isLoggedIn === 'true' ? (
        <>
            <Outlet />
            <button onClick={handleLogout}>Logout</button>
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
