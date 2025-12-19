// src/Context/Authprovider.jsx (COMPLETE IMPLEMENTATION)
import React, { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile // To save Name and PhotoURL
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init'; // Import auth from init
import axios from 'axios'; // For sending user data to backend

// 1. Create the Auth Context (as defined in AuthContext.jsx)
export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Providers
    const googleProvider = new GoogleAuthProvider();
    const BASE_URL = 'http://localhost:3000'; // Assume backend runs on port 3000

    // 1. Register/Create User with Email/Password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Login User with Email/Password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Update User Profile (Name/PhotoURL) after Registration
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        });
    };

    // 4. Social Login (Google)
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 5. Logout
    const logOut = () => {
        setLoading(true);
        // Remove token from storage on logout
        localStorage.removeItem('tuition-access-token');
        return signOut(auth);
    };

    // ** JWT & State Management Logic **
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            // Crucial: Get and Set JWT Token on Login/Register
            if (currentUser) {
                // Get token from backend
                axios.post(`${BASE_URL}/jwt`, { email: currentUser.email })
                    .then(res => {
                        console.log('JWT Response:', res.data.token);
                        // Store the token securely
                        localStorage.setItem('tuition-access-token', res.data.token);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Failed to fetch JWT:', error);
                        setLoading(false);
                    });
            } else {
                // If user logs out or is null, remove the token
                localStorage.removeItem('tuition-access-token');
                setLoading(false);
            }

        });
        return () => unsubscribe();
    }, []);

    // Auth Context Value
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        googleSignIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;