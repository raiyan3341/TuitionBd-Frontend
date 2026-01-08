import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight, FaCheckCircle, FaUserShield, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn, googleSignIn, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const BASE_URL = "https://tuition-bd-backend.vercel.app";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectUserByRole = (role) => {
        if (role === "Admin") navigate('/dashboard/admin-home');
        else if (role === "Tutor") navigate('/dashboard/tutor-home');
        else navigate(from, { replace: true });
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            await signIn(email, password);
            const res = await axios.get(`${BASE_URL}/users/${email}`);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                showConfirmButton: false,
                timer: 1500,
                background: '#fff',
                color: '#1e293b'
            });
            redirectUserByRole(res.data.role);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
                confirmButtonColor: '#3b82f6'
            });
        }
    };

    const handleDemoLogin = (role) => {
        if (role === 'tutor') {
            setEmail('tutor@demo.com');
            setPassword('123456');
        } else {
            setEmail('student@demo.com');
            setPassword('123456');
        }
        setTimeout(() => {
            Swal.fire({
                title: 'Demo credentials loaded!',
                text: 'Click Login to proceed',
                icon: 'info',
                timer: 1000,
                showConfirmButton: false
            });
        }, 100);
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
                className="container max-w-5xl mx-auto flex flex-col lg:flex-row items-center bg-white/10 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/20 overflow-hidden"
            >
                <div className="w-full lg:w-1/2 p-12 text-white hidden lg:block">
                    <motion.div initial={{ x: -50 }} animate={{ x: 0 }}>
                        <h1 className="text-6xl font-black mb-6 leading-tight">Welcome <br /> <span className="text-yellow-300">Back!</span></h1>
                        
                        <div className="space-y-4 mt-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Test the platform as:</p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => handleDemoLogin('tutor')}
                                    className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group"
                                >
                                    <div className="bg-yellow-400 p-2 rounded-lg text-gray-900 group-hover:scale-110 transition-transform"><FaUserShield /></div>
                                    <span className="font-bold">Demo Tutor</span>
                                </button>
                                <button 
                                    onClick={() => handleDemoLogin('student')}
                                    className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10 group"
                                >
                                    <div className="bg-blue-400 p-2 rounded-lg text-white group-hover:scale-110 transition-transform"><FaUserGraduate /></div>
                                    <span className="font-bold">Demo Student</span>
                                </button>
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
                            <label className="label text-gray-700 font-bold uppercase text-xs">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50" 
                                    required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-gray-700 font-bold uppercase text-xs">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-4 text-gray-400" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50" 
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full h-14 rounded-2xl text-white font-bold text-lg shadow-lg">
                            Login <FaArrowRight />
                        </button>
                    </form>

                    <div className="divider text-gray-400 my-8 uppercase text-[10px] font-bold">Or sign in with</div>
                    <button onClick={googleSignIn} className="btn btn-outline border-gray-200 w-full h-14 rounded-2xl gap-3 text-gray-600 font-bold hover:bg-gray-50">
                        <FaGoogle className="text-red-500 text-xl" /> Sign in with Google
                    </button>

                    <p className="text-center mt-10 text-gray-500">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;