import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelopeOpenText, FaCheckCircle, FaSearch, FaClock, FaRocket, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../components/LoadingPage';

const TutorHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalApplications: 0, hiredCount: 0, pending: 0 });
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://tuition-bd-backend.vercel.app';

    useEffect(() => {
        const fetchTutorStats = async () => {
            if (!user?.email) return;
            const token = localStorage.getItem('tuition-access-token');
            setLoading(true);
            try {
                const applicationsRes = await axios.get(`${BASE_URL}/applications/my-applications?email=${user.email}`, {
                     headers: { 'Authorization': `Bearer ${token}` }
                });

                const applications = applicationsRes.data;
                const totalApplications = applications.length;
                const hiredCount = applications.filter(app => app.status === 'Paid-Confirmed').length;
                const pending = applications.filter(app => app.status === 'Applied').length;

                setStats({ totalApplications, hiredCount, pending });
            } catch (error) {
                console.error("Failed to fetch tutor dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTutorStats();
    }, [user]);

    if (loading) return <LoadingPage />;

    const cardData = [
        { 
            title: 'Applications', 
            count: stats.totalApplications, 
            icon: <FaEnvelopeOpenText />, 
            gradient: 'from-blue-600 to-indigo-600',
            shadow: 'shadow-blue-200'
        },
        { 
            title: 'Hired Jobs', 
            count: stats.hiredCount, 
            icon: <FaCheckCircle />, 
            gradient: 'from-emerald-500 to-teal-600',
            shadow: 'shadow-emerald-200'
        },
        { 
            title: 'Pending', 
            count: stats.pending, 
            icon: <FaClock />, 
            gradient: 'from-amber-400 to-orange-500',
            shadow: 'shadow-amber-200'
        },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10">

            <div className="relative overflow-hidden bg-slate-900 rounded-[45px] p-8 md:p-12 text-white">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <FaRocket /> Tutor Portal Active
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                            Welcome back, <span className="text-blue-400">{user?.displayName}!</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-md">
                            Manage your teaching career, track applications, and find your next student from your personalized dashboard.
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[40px] flex items-center justify-center text-5xl shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-500">
                           <FaUserGraduate />
                        </div>
                    </div>
                </div>
  
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cardData.map((card, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white p-2 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="bg-white rounded-[38px] p-8 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center text-2xl mb-6 shadow-lg ${card.shadow} group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{card.count}</h2>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[2px]">{card.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="bg-white rounded-[45px] border border-slate-100 p-8 md:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Quick Actions</h2>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1 text-center md:text-left">Navigator</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link to="/tuitions" className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-blue-600 rounded-3xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 group-hover:text-blue-600 shadow-sm">
                                <FaSearch size={20} />
                            </div>
                            <span className="font-black text-slate-700 group-hover:text-white uppercase text-xs tracking-widest">Find Tuitions</span>
                        </div>
                        <div className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform">→</div>
                    </Link>

                    <Link to="/dashboard/my-applications" className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-indigo-600 rounded-3xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 group-hover:text-indigo-600 shadow-sm">
                                <FaEnvelopeOpenText size={20} />
                            </div>
                            <span className="font-black text-slate-700 group-hover:text-white uppercase text-xs tracking-widest">Applications</span>
                        </div>
                        <div className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform">→</div>
                    </Link>

                    <Link to="/dashboard/my-hired-tuitions" className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-emerald-600 rounded-3xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 group-hover:text-emerald-600 shadow-sm">
                                <FaCheckCircle size={20} />
                            </div>
                            <span className="font-black text-slate-700 group-hover:text-white uppercase text-xs tracking-widest">Hired List</span>
                        </div>
                        <div className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform">→</div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default TutorHome;