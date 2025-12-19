// src/components/TuitionCard.jsx
import React from 'react';
import { 
    FaMapMarkerAlt, FaMoneyBillWave, FaChalkboardTeacher, 
    FaCalendarAlt, FaArrowRight, FaUserGraduate, 
    FaClock, FaBook, FaCheckCircle 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const TuitionCard = ({ tuition, onApplyClick }) => {
    if (!tuition) return null;

    const { 
        subject, 
        classLevel, 
        tuitionDetails, 
        location, 
        budget, 
        schedule,
        daysPerWeek, // নতুন ডেটা ফিল্ড
        studentGender, // নতুন ডেটা ফিল্ড
        requirements // টিউটরের জন্য বিশেষ রিকোয়ারমেন্ট
    } = tuition;

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[35px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
        >
            {/* ১. টপ সেকশন: সাবজেক্ট এবং ব্যাজ */}
            <div className="p-7 pb-4">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
                            <FaBook size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
                                {subject || "Multiple Subjects"}
                            </h2>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1 mt-1">
                                <FaUserGraduate /> {classLevel || "Academic"}
                            </p>
                        </div>
                    </div>
                    <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-xl border border-orange-100 uppercase tracking-tighter">
                        Urgent
                    </span>
                </div>

                {/* ২. গুরুত্বপূর্ণ হাইলাইটস (Grid) */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                            <FaClock className="text-blue-400"/> Schedule
                        </p>
                        <p className="text-xs font-black text-slate-700">{daysPerWeek || "3 Days"} / Week</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                            <FaUserGraduate className="text-purple-400"/> Gender
                        </p>
                        <p className="text-xs font-black text-slate-700">{studentGender || "Any"}</p>
                    </div>
                </div>
            </div>

            {/* ৩. ডিটেইলস এবং রিকোয়ারমেন্টস */}
            <div className="px-7 flex-grow">
                <div className="mb-6">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <FaChalkboardTeacher /> Description
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                        "{tuitionDetails || "Looking for an experienced tutor who can provide personalized guidance..."}"
                    </p>
                </div>

                {/* বিশেষ রিকোয়ারমেন্ট (যদি থাকে) */}
                <div className="mb-6">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Requirements</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <FaCheckCircle className="text-emerald-500 text-[14px]" /> Verified Background
                        </li>
                        <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <FaCheckCircle className="text-emerald-500 text-[14px]" /> Expert in {subject?.split(' ')[0] || "Subject"}
                        </li>
                    </ul>
                </div>

                {/* লোকেশন পিন */}
                <div className="flex items-center gap-2 text-slate-400 mb-6 bg-slate-50 w-fit px-4 py-2 rounded-full border border-slate-100">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-[11px] font-bold tracking-tight">{location || "Location not provided"}</span>
                </div>
            </div>

            {/* ৪. ফুটার: স্যালারি এবং অ্যাকশন বাটন */}
            <div className="p-7 bg-slate-50/50 border-t border-slate-100 mt-auto">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Monthly Salary</span>
                        <h3 className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
                            <span className="text-blue-600 text-sm italic font-medium">৳</span>
                            {budget ? budget.toLocaleString() : 'Negot.'}
                        </h3>
                    </div>
                    
                    <button 
                        onClick={() => onApplyClick && onApplyClick(tuition)}
                        className="flex-grow md:flex-none bg-blue-600 hover:bg-slate-900 text-white h-14 px-8 rounded-[20px] font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-blue-200 hover:shadow-none active:scale-95"
                    >
                        Apply Now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TuitionCard;