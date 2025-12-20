import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
    const { signIn, googleSignIn, loading } = useAuth();
    const navigate = useNavigate();
    const BASE_URL = "https://tuition-bd-backend.vercel.app";

    const redirectUserByRole = (role) => {
        if (role === "Admin") navigate('/dashboard/admin-home');
        else if (role === "Tutor") navigate('/dashboard/tutor-home');
        else navigate('/dashboard/student-home');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signIn(email, password);
            const res = await axios.get(`${BASE_URL}/users/${email}`);
            const userRole = res.data.role;
            redirectUserByRole(userRole);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: 'Student'
            };
            const res = await axios.post(`${BASE_URL}/users`, userInfo);
            const currentRole = res.data.role || 'Student';
            redirectUserByRole(currentRole);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <span className="loading loading-infinity loading-lg text-primary"></span>
            </div>
        ); 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#6B8DD6] p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="container max-w-5xl mx-auto flex flex-col lg:flex-row items-center bg-white/10 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/20 overflow-hidden"
            >
                
                <div className="w-full lg:w-1/2 p-12 text-white hidden lg:block">
                    <motion.div
                        initial={{ x: -50 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.2 }}>
                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Welcome <br /> <span className="text-yellow-300">Back!</span>
                        </h1>
                        <p className="text-lg text-white/80 mb-8">
                            Join thousands of students and tutors today. Access your profile, track applications, and manage payments with ease.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                                <div className="bg-yellow-400 p-3 rounded-xl text-gray-900"><FaCheckCircle /></div>
                                <p className="font-medium">Verified Tutor Profiles</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                                <div className="bg-blue-400 p-3 rounded-xl text-white"><FaLock /></div>
                                <p className="font-medium">Secure Payment System</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="w-full lg:w-1/2 bg-white p-8 md:p-16">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">Login to Account</h2>
                        <p className="text-gray-500 mt-2">Please enter your details to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="label text-gray-700 font-bold uppercase text-xs tracking-wider">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary transition-all" 
                                    required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-gray-700 font-bold uppercase text-xs tracking-wider">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-4 text-gray-400" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="••••••••" 
                                    className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary transition-all" 
                                    required 
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full h-14 rounded-2xl text-white font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                            Login <FaArrowRight />
                        </button>
                    </form>

                    <div className="divider text-gray-400 my-8 uppercase text-[10px] font-bold tracking-[2px]">Or sign in with</div>
                    
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline border-gray-200 w-full h-14 rounded-2xl gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all font-bold"
                    >
                        <FaGoogle className="text-red-500 text-xl" />
                        Sign in with Google
                    </button>

                    <p className="text-center mt-10 text-gray-500 font-medium">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};


const FaCheckCircle = () => (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
);

export default Login;