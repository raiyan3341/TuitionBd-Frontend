// src/pages/Dashboard/Student/PostNewTuition.jsx
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaBook, FaUserGraduate, FaMapMarkerAlt, FaWallet, FaCalendarAlt, FaPenNib, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PostNewTuition = () => {
    const { user } = useAuth();
    const BASE_URL = 'http://localhost:3000';
    
    const subjects = ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "ICT", "General Science"];
    const classes = ["Class 1", "Class 5", "Class 8", "SSC", "HSC", "University"];
    const locations = ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Mohammadpur", "Other"];
    const schedules = ["3 days/week", "5 days/week", "Daily"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const tuitionData = {
            subject: form.subject.value,
            classLevel: form.classLevel.value,
            location: form.location.value,
            budget: parseFloat(form.budget.value),
            schedule: form.schedule.value,
            tuitionDetails: form.details.value,
            studentEmail: user?.email,
            studentName: user?.displayName,
            status: 'Pending',
            postedAt: new Date()
        };

        try {
            const token = localStorage.getItem('tuition-access-token');
            const res = await axios.post(`${BASE_URL}/tuitions`, tuitionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Tuition requirement posted. Awaiting admin approval.',
                    icon: 'success',
                    confirmButtonColor: '#2563eb',
                    customClass: { popup: 'rounded-[30px]' }
                });
                form.reset();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to post tuition.',
                icon: 'error',
                confirmButtonColor: '#e11d48'
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 pb-10"
        >
            {/* Header */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">
                    Post New <span className="text-blue-600">Tuition</span>
                </h1>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">Find the best tutor for your needs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Read-Only User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Your Name</label>
                        <div className="relative">
                            <input type="text" defaultValue={user?.displayName} readOnly className="w-full h-14 pl-5 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold focus:outline-none cursor-not-allowed shadow-sm" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                        <input type="email" defaultValue={user?.email} readOnly className="w-full h-14 pl-5 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold focus:outline-none cursor-not-allowed shadow-sm" />
                    </div>
                </div>

                {/* Section 2: Core Details */}
                <div className="bg-white p-8 md:p-10 rounded-[45px] shadow-sm border border-slate-100 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaBook className="text-blue-500" /> Subject
                            </label>
                            <select name="subject" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer" required>
                                <option value="">Select Subject</option>
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>

                        {/* Class */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaUserGraduate className="text-purple-500" /> Class/Level
                            </label>
                            <select name="classLevel" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none appearance-none cursor-pointer" required>
                                <option value="">Select Class</option>
                                {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaMapMarkerAlt className="text-rose-500" /> Area
                            </label>
                            <select name="location" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none appearance-none cursor-pointer" required>
                                <option value="">Select Location</option>
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaWallet className="text-emerald-500" /> Monthly Budget (TK)
                            </label>
                            <input type="number" name="budget" placeholder="5000" min="1000" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-inner" required />
                        </div>

                        {/* Schedule */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaCalendarAlt className="text-amber-500" /> Teaching Schedule
                            </label>
                            <select name="schedule" className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none appearance-none cursor-pointer" required>
                                <option value="">How many days per week?</option>
                                {schedules.map(sch => <option key={sch} value={sch}>{sch}</option>)}
                            </select>
                        </div>

                        {/* Detailed Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                                <FaPenNib className="text-indigo-500" /> Requirement Details
                            </label>
                            <textarea name="details" placeholder="Describe any specific requirements ( Tutor should be from BUET/DU, prefer female tutor, etc.)" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[30px] font-medium text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none h-40 resize-none shadow-inner" required></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full h-16 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200"
                    >
                        <FaPaperPlane /> Publish Requirement
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostNewTuition;