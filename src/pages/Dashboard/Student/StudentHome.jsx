// src/pages/Dashboard/Student/StudentHome.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import LoadingPage from '../../../components/LoadingPage';
import { FaGraduationCap, FaClipboardList, FaUsers, FaPlusCircle, FaArrowRight, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalPosts: 0, totalApplications: 0, hiredTutor: 0 });
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        const fetchStudentStats = async () => {
            if (!user?.email) return;
            const token = localStorage.getItem('tuition-access-token');
            setLoading(true);
            try {
                // 1. Fetch Student's Posts
                const postsRes = await axios.get(`${BASE_URL}/tuitions?email=${user.email}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const studentPosts = postsRes.data;
                const totalPosts = studentPosts.length;
                const hiredCount = studentPosts.filter(post => post.status === 'Paid').length;
                
                // 2. Fetch Applications for those posts
                const applicationsRes = await axios.get(`${BASE_URL}/applications/by-student-posts?email=${user.email}`, {
                     headers: { 'Authorization': `Bearer ${token}` }
                });
                const totalApplications = applicationsRes.data.length;

                setStats({ totalPosts, totalApplications, hiredTutor: hiredCount });
            } catch (error) {
                console.error("Failed to fetch student dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentStats();
    }, [user]);

    if (loading) return <LoadingPage />;

    const cardData = [
        { 
            title: 'Tuition Posts', 
            count: stats.totalPosts, 
            icon: <FaClipboardList />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50' 
        },
        { 
            title: 'Tutor Requests', 
            count: stats.totalApplications, 
            icon: <FaUsers />, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50' 
        },
        { 
            title: 'Hired Tutors', 
            count: stats.hiredTutor, 
            icon: <FaGraduationCap />, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50' 
        },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10 pb-10"
        >
            {/* 1. Welcome Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[45px] p-10 md:p-16 text-white overflow-hidden shadow-2xl shadow-blue-200">
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="text-center lg:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                            <FaLightbulb className="text-yellow-300" /> Education Portal
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                            Hi, <span className="text-blue-200">{user?.displayName?.split(' ')[0]}!</span>
                        </h1>
                        <p className="text-blue-100 font-medium text-lg max-w-md opacity-90">
                            Manage your learning journey. Find the perfect tutor to achieve your academic goals.
                        </p>
                        <div className="pt-4">
                            <Link to="/dashboard/post-tuition" className="btn bg-white hover:bg-blue-50 text-blue-800 border-none rounded-2xl px-8 font-black uppercase text-xs tracking-widest shadow-xl">
                                <FaPlusCircle /> Post New Requirement
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:block relative">
                         <div className="w-48 h-48 bg-white/10 rounded-[60px] backdrop-blur-3xl flex items-center justify-center border border-white/20 animate-pulse">
                            <FaGraduationCap size={100} className="text-blue-200" />
                         </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cardData.map((card, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white p-2 rounded-[40px] border border-slate-100 shadow-sm"
                    >
                        <div className="bg-white rounded-[38px] p-8 flex flex-col items-center text-center group">
                            <div className={`w-16 h-16 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center text-2xl mb-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                                {card.icon}
                            </div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{card.count}</h2>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] mt-1">{card.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Quick Actions Grid */}
            <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">Quick Actions</h2>
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Action Item 1 */}
                    <Link to="/dashboard/applied-tutors" className="group p-8 bg-slate-50 hover:bg-purple-600 rounded-[35px] transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <FaUsers size={20} />
                        </div>
                        <h4 className="text-slate-800 group-hover:text-white font-black uppercase text-xs tracking-widest mb-2">View Applications</h4>
                        <p className="text-slate-400 group-hover:text-purple-100 text-[10px] font-bold">Check who wants to teach you</p>
                        <div className="mt-6 text-slate-300 group-hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Go Now <FaArrowRight />
                        </div>
                    </Link>

                    {/* Action Item 2 */}
                    <Link to="/dashboard/my-tuition-posts" className="group p-8 bg-slate-50 hover:bg-blue-600 rounded-[35px] transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <FaClipboardList size={20} />
                        </div>
                        <h4 className="text-slate-800 group-hover:text-white font-black uppercase text-xs tracking-widest mb-2">Manage Posts</h4>
                        <p className="text-slate-400 group-hover:text-blue-100 text-[10px] font-bold">Edit or delete your tuition posts</p>
                        <div className="mt-6 text-slate-300 group-hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Manage <FaArrowRight />
                        </div>
                    </Link>

                    {/* Action Item 3 */}
                    <Link to="/dashboard/post-tuition" className="group p-8 bg-slate-50 hover:bg-emerald-600 rounded-[35px] transition-all duration-300">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <FaPlusCircle size={20} />
                        </div>
                        <h4 className="text-slate-800 group-hover:text-white font-black uppercase text-xs tracking-widest mb-2">New Post</h4>
                        <p className="text-slate-400 group-hover:text-emerald-100 text-[10px] font-bold">Need another tutor? Post here</p>
                        <div className="mt-6 text-slate-300 group-hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Create <FaArrowRight />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default StudentHome;