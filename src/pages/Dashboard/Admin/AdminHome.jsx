// src/pages/Dashboard/Admin/AdminHome.jsx
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { motion } from 'framer-motion';
import { 
    FaUsers, FaGraduationCap, FaDollarSign, FaChartBar, 
    FaClock, FaArrowRight, FaShieldAlt, FaBriefcase 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const { user } = useAuth();
    
    // Statistics logic (আগের মতোই রাখা হয়েছে)
    const stats = [
        { 
            title: 'Total Users', 
            count: 150, 
            icon: <FaUsers />, 
            gradient: 'from-[#4F46E5] to-[#3B82F6]',
            shadow: 'shadow-blue-200'
        },
        { 
            title: 'Total Tuitions', 
            count: 75, 
            icon: <FaGraduationCap />, 
            gradient: 'from-[#10B981] to-[#059669]',
            shadow: 'shadow-emerald-200'
        },
        { 
            title: 'Pending Approval', 
            count: 12, 
            icon: <FaClock />, 
            gradient: 'from-[#F59E0B] to-[#D97706]',
            shadow: 'shadow-amber-200'
        },
        { 
            title: 'Total Revenue', 
            count: '15,000 TK', 
            icon: <FaDollarSign />, 
            gradient: 'from-[#8B5CF6] to-[#7C3AED]',
            shadow: 'shadow-purple-200'
        },
    ];

    return (
        <div className="space-y-10">
            {/* 1. Welcoming Banner with Glassmorphism */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div className="relative z-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                        Welcome back, <span className="text-blue-600">Admin {user?.displayName}!</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-[3px]">
                        System Status: <span className="text-emerald-500">All Systems Operational</span>
                    </p>
                </div>
                <div className="hidden lg:block relative z-10">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                {i}
                            </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            +15
                        </div>
                    </div>
                </div>
                {/* Decorative Background Circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
            </motion.div>

            {/* 2. Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white p-1 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="bg-white rounded-[34px] p-7 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center text-2xl mb-6 shadow-xl ${stat.shadow} group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tighter mb-1">{stat.count}</h2>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[2px]">{stat.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Quick Actions with Modern Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[45px] p-10 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <FaChartBar size={150} />
                     </div>
                     <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-2">Management Insights</h3>
                        <p className="text-slate-400 font-medium max-w-sm mb-10">Monitor all activities, approve tuition posts, and manage your users with ease from one central hub.</p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/dashboard/manage-users" className="btn bg-white hover:bg-blue-600 text-slate-900 hover:text-white border-none rounded-2xl px-8 h-14 font-black transition-all">
                                <FaUsers /> Manage Users
                            </Link>
                            <Link to="/dashboard/manage-tuitions" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl px-8 h-14 font-black transition-all">
                                <FaShieldAlt /> Tuition Hub
                            </Link>
                        </div>
                     </div>
                </div>

                {/* Right Side Stats/Help */}
                <div className="bg-white rounded-[45px] border border-slate-100 p-10 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                            <FaBriefcase />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Platform Health</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Your platform currently has no pending critical issues. All server response times are normal.</p>
                    </div>
                    <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Admins: 01</span>
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">A</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;