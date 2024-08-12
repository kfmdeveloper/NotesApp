import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This component is used to protect routes based on authentication status
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // Conditionally render the protected component or redirect based on authentication status
    return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
