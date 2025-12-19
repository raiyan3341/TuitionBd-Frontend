import React from 'react';
import { FaBookOpen, FaMapMarkerAlt, FaHistory, FaUserCircle, FaAward, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TutorCard = ({ tutor }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.3)] transition-all duration-500 border border-slate-100 h-full flex flex-col"
        >
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        <FaStar className="text-yellow-300" /> Top Rated
                    </span>
                </div>
            </div>
            <div className="px-6 -mt-12 relative flex-grow">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-full p-1.5 shadow-xl transition-transform group-hover:scale-105 duration-500">
                        {tutor.photoURL ? (
                            <img src={tutor.photoURL} alt={tutor.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-blue-500 text-4xl">
                                <FaUserCircle />
                            </div>
                        )}
                    </div>
                    
                    <h2 className="mt-4 text-xl font-black text-slate-800 text-center leading-tight">
                        {tutor.name}
                    </h2>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-tighter mt-1">
                        {tutor.education || 'Academic Expert'}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap justify-center gap-1.5 min-h-[50px]">
                        {tutor.subjects?.slice(0, 3).map((sub, idx) => (
                            <span key={idx} className="bg-slate-50 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-100 capitalize">
                                {sub}
                            </span>
                        ))}
                        {tutor.subjects?.length > 3 && (
                            <span className="text-[10px] text-slate-400 self-center ml-1">+{tutor.subjects.length - 3} more</span>
                        )}
                    </div>

                    <div className="divider opacity-30 my-0"></div>
                    <div className="grid grid-cols-2 gap-4 py-2">
                        <div className="flex flex-col gap-1 items-center border-r border-slate-100">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
                                <FaMapMarkerAlt className="text-blue-500" /> Location
                            </div>
                            <span className="text-xs font-bold text-slate-700 truncate w-full text-center">
                                {tutor.area || 'Online'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
                                <FaHistory className="text-orange-500" /> Experience
                            </div>
                            <span className="text-xs font-bold text-slate-700">
                                {tutor.experience || 'Entry'} Level
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pt-2">
                <div className="group/btn relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover/btn:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <button 
                        className="relative w-full bg-white border-2 border-slate-100 text-slate-400 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest cursor-not-allowed group-hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        disabled
                    >
                        <FaAward className="text-slate-300" /> Hiring via post only
                    </button>
                </div>
                <p className="text-[9px] text-center text-slate-400 mt-3 font-medium uppercase tracking-tighter">
                    Verified Profile • E-Tuition BD Member
                </p>
            </div>
        </motion.div>
    );
};

export default TutorCard;