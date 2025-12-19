import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingPage from '../../components/LoadingPage'; 
import axios from 'axios';

const RoleBasedHome = () => {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000';
    useEffect(() => {
        if (user?.email) {
            setRoleLoading(true);
            axios.get(`${BASE_URL}/users/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setRoleLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch user role:", error);
                    setRole(null);
                    setRoleLoading(false);
                });
        } else if (!authLoading) {
            setRole(null); 
            setRoleLoading(false);
        }
    }, [user, authLoading]);


    if (authLoading || roleLoading) {
        return <LoadingPage />; 
    }

    if (user && role) {
        switch (role) {
            case 'Admin':
                return <Navigate to="/dashboard/admin-home" replace />;
            case 'Student':
                return <Navigate to="/dashboard/student-home" replace />;
            case 'Tutor':
                return <Navigate to="/dashboard/tutor-home" replace />;
            default:
                return <Navigate to="/" replace />; 
        }
    }
    return <Navigate to="/" replace />; 
};

export default RoleBasedHome;