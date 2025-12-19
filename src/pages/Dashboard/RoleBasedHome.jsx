// src/pages/Dashboard/RoleBasedHome.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // useAuth হুক ইম্পোর্ট করুন
import LoadingPage from '../../components/LoadingPage'; 
import axios from 'axios';

const RoleBasedHome = () => {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000'; // আপনার ব্যাকএন্ডের URL

    // 1. ব্যবহারকারীর Role ফেচ করুন
    useEffect(() => {
        if (user?.email) {
            setRoleLoading(true);
            axios.get(`${BASE_URL}/users/${user.email}`)
                .then(res => {
                    setRole(res.data.role); // Role: 'Admin', 'Tutor', বা 'Student'
                    setRoleLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch user role:", error);
                    setRole(null);
                    setRoleLoading(false);
                });
        } else if (!authLoading) {
            // যদি user না থাকে (কিন্তু PrivateRoute এটিকে আগেই ব্লক করবে)
            setRole(null); 
            setRoleLoading(false);
        }
    }, [user, authLoading]);

    // 2. লোডিং স্টেট দেখান
    if (authLoading || roleLoading) {
        return <LoadingPage />; 
    }

    // 3. Role অনুযায়ী রিডাইরেক্ট করুন
    if (user && role) {
        switch (role) {
            case 'Admin':
                // Admin হলে AdminHome এ রিডাইরেক্ট করুন
                return <Navigate to="/dashboard/admin-home" replace />;
            case 'Student':
                // Student হলে StudentHome এ রিডাইরেক্ট করুন
                return <Navigate to="/dashboard/student-home" replace />;
            case 'Tutor':
                // Tutor হলে TutorHome এ রিডাইরেক্ট করুন
                return <Navigate to="/dashboard/tutor-home" replace />;
            default:
                // কোনো Role খুঁজে না পেলে, একটি ডিফল্ট বা এরর পেজে রিডাইরেক্ট করুন
                return <Navigate to="/" replace />; 
        }
    }

    // লগআউট করা থাকলে, এটি প্রাইভেট রুট দ্বারা হ্যান্ডেল করা উচিত। তবুও ফলব্যাক হিসেবে হোমে পাঠানো হলো।
    return <Navigate to="/" replace />; 
};

export default RoleBasedHome;