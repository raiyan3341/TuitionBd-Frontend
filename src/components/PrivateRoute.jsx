// src/Routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../components/LoadingPage'; // Import the new Loading component

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 1. Show Loading state
    if (loading) {
        return <LoadingPage />; 
    }

    // 2. Check if user is logged in
    if (user) {
        return children; // User is logged in, render the child component
    }

    // 3. User is not logged in, redirect to login page
    // state: { from: location } saves the attempted path, so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;