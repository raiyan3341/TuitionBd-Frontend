import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaPhone, FaUserTag, FaRocket } from 'react-icons/fa';

const Register = () => {
    const { createUser, googleSignIn, updateUserProfile, loading } = useAuth();
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:3000';

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        const phone = form.phone.value;

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        try {
            const result = await createUser(email, password);
            const defaultPhotoURL = 'https://i.ibb.co/0QZCvL7/user-placeholder.png'; 
            await updateUserProfile(name, defaultPhotoURL);

            const userInfo = { name, email, role, phone };
            await axios.post(`${BASE_URL}/users`, userInfo);
            
            alert('Registration successful!');
            navigate('/login');
            
        } catch (error) {
            console.error(error);
            alert(`Registration failed: ${error.message}`);
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
            const response = await axios.post(`${BASE_URL}/users`, userInfo);
            const currentRole = response.data.role || 'Student';

            if (currentRole === 'Tutor') navigate('/dashboard/tutor-home');
            else if (currentRole === 'Admin') navigate('/dashboard/admin-home');
            else navigate('/dashboard/student-home');

        } catch (error) {
            console.error("Google Registration Error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <span className="loading loading-bars loading-lg text-secondary"></span>
            </div>
        ); 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#00d2ff] via-[#3a7bd5] to-[#923cb5] p-4 relative overflow-hidden">
            <div className="absolute top-[-5%] right-[-5%] w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container max-w-5xl mx-auto flex flex-col lg:flex-row bg-white/10 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/20 overflow-hidden"     >

                <div className="w-full lg:w-2/5 p-10 text-white flex flex-col justify-center bg-black/10">
                    <motion.div
                        initial={{ x: -30 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.3 }} >
                        <h1 className="text-5xl font-black mb-6">Join Our <br/><span className="text-yellow-300">Community</span></h1>
                        <p className="text-white/80 mb-8 text-lg">
                            Create an account to unlock personalized features. Find the best tutors or get the best tuition posts in minutes.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                                <FaRocket className="text-yellow-300"/> <span>Fast & Easy Application</span>
                            </li>
                            <li className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                                <FaLock className="text-blue-300"/> <span>Data Privacy Guaranteed</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
                <div className="w-full lg:w-3/5 bg-white p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-500">Fill in the details to get started.</p>
                    </div>

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase text-gray-400">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-4 text-gray-300" />
                                <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase text-gray-400">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-4 text-gray-300" />
                                <input type="email" name="email" placeholder="example@mail.com" className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase text-gray-400">Phone Number</label>
                            <div className="relative">
                                <FaPhone className="absolute left-4 top-4 text-gray-300" />
                                <input type="tel" name="phone" placeholder="017XXXXXXXX" className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-xs uppercase text-gray-400">I am a</label>
                            <div className="relative">
                                <FaUserTag className="absolute left-4 top-4 text-gray-300" />
                                <select name="role" className="select select-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary" defaultValue="Student">
                                    <option value="Student">Student</option>
                                    <option value="Tutor">Tutor</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label font-bold text-xs uppercase text-gray-400">Secure Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-4 text-gray-300" />
                                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:border-primary" required />
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button type="submit" className="btn btn-primary w-full h-14 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="divider my-8 text-gray-300 text-xs font-bold tracking-widest">OR REGISTER WITH</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-gray-200 w-full h-14 rounded-2xl gap-3 text-gray-600 hover:bg-gray-50 transition-all font-bold">
                        <FaGoogle className="text-red-500 text-xl" />
                        Sign up with Google
                    </button>

                    <p className="text-center mt-8 text-gray-500 font-medium">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;