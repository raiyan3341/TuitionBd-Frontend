// src/pages/Tutors/Tutors.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserCheck, FaStar, FaFilter, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import TutorCard from '../components/TutorCard';
import LoadingPage from '../components/LoadingPage';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/tutors`)
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tutors:", error);
                Swal.fire('Error', 'Failed to load tutor list.', 'error');
                setLoading(false);
            });
    }, []);

    // ফিল্টারিং লজিক (নাম বা সাবজেক্ট দিয়ে সার্চ)
    const filteredTutors = tutors.filter(tutor => 
        tutor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <LoadingPage />;

    return (
        <div className="bg-[#fcfcfd] min-h-screen">
            
            {/* 1. Hero Section - Branding & Context */}
            <section className="bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] pt-32 pb-24 px-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                            Find the Perfect <span className="text-blue-400">Expert Mentor</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with {tutors.length}+ verified educators dedicated to your academic success. 
                            Browse profiles, check qualifications, and start learning.
                        </p>
                    </motion.div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
                        <div className="flex items-center gap-3 text-white/80 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                            <FaUserCheck className="text-blue-400 text-xl" />
                            <span className="font-bold">{tutors.length} Verified Tutors</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                            <FaStar className="text-yellow-400 text-xl" />
                            <span className="font-bold">4.9/5 Average Rating</span>
                        </div>
                    </div>

                    {/* Advanced Search Bar */}
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <FaSearch className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search by name, subject, or expertise..." 
                            className="w-full h-16 pl-14 pr-32 rounded-[25px] bg-white text-slate-900 text-lg shadow-2xl focus:ring-4 focus:ring-blue-500/20 border-none transition-all outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-3 top-3 bottom-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[18px] transition-all flex items-center gap-2">
                            <FaFilter className="hidden sm:inline" /> Search
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Main Content Grid */}
            <div className="container mx-auto px-6 py-16">
                
                {/* Header for the List */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-slate-200 pb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                            <FaChalkboardTeacher className="text-blue-600" /> 
                            Available Educators
                        </h2>
                        <p className="text-slate-500 text-sm">Showing {filteredTutors.length} experts matching your criteria</p>
                    </div>
                    <div className="flex gap-2">
                        <select className="select select-bordered rounded-xl bg-white border-slate-200 text-slate-600">
                            <option disabled selected>Sort By</option>
                            <option>Highest Rated</option>
                            <option>Experience</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                {/* Tutor Grid */}
                <AnimatePresence>
                    {filteredTutors.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-slate-200"
                        >
                            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="text-3xl text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700">No Tutors Found</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your search terms or filters.</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredTutors.map((tutor, index) => (
                                <motion.div
                                    key={tutor.email || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TutorCard tutor={tutor} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* 3. Bottom CTA - Become a Tutor */}
                <section className="mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[50px] p-10 md:p-16 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-4 mx-auto md:mx-0">
                            <FaGraduationCap className="text-3xl text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Are you an expert?</h2>
                        <p className="text-slate-500 text-lg">Join our community of elite tutors and help students reach their goals.</p>
                    </div>
                    <button className="btn btn-primary btn-lg rounded-2xl px-12 h-16 shadow-xl shadow-blue-200 border-none transition-transform hover:scale-105">
                        Start Teaching Today
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Tutors;