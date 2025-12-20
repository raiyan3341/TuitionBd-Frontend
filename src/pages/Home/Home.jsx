import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaCheckCircle, FaRocket, FaSearch } from 'react-icons/fa'; 
import TuitionCard from '../../components/TuitionCard';

const Home = () => {
    const [latestTuitions, setLatestTuitions] = useState([]);
    const [loadingTuitions, setLoadingTuitions] = useState(true);
    const BASE_URL = 'https://tuition-bd-backend.vercel.app';

    useEffect(() => {
        setLoadingTuitions(true);
        axios.get(`${BASE_URL}/latest-tuitions`)
            .then(res => {
                setLatestTuitions(res.data);
                setLoadingTuitions(false);
            })
            .catch(error => {
                console.error("Error fetching latest tuitions:", error);
                setLoadingTuitions(false);
            });
    }, []);

    return (
        <div className="bg-[#f3f4f6] min-h-screen font-sans overflow-x-hidden">
            <section className="relative bg-gradient-to-br from-[#00d2ff] via-[#3a7bd5] to-[#923cb5] py-20 px-6 rounded-b-[50px] shadow-2xl overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>

                <div className="container mx-auto flex flex-col items-center text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight" >
                        Find Your Perfect <br />
                        <span className="text-yellow-300">Tutor</span> or <span className="text-orange-400">Tuition</span> Today!
                    </motion.h1>
                    <p className="text-white/90 mt-6 text-lg md:text-xl max-w-2xl">
                        The complete platform for students and tutors to manage classes, applications, and payments with total transparency.
                    </p>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="mt-10" >
                        <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-2">
                            Get Started Now <FaRocket />
                        </Link>
                    </motion.div>
                </div>
            </section>
            <section className="container mx-auto py-20 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-800">2. How It <span className="text-blue-600">Works</span></h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { icon: <FaUserGraduate />, title: "1. Post Requirement", desc: "Students post detailed requirements (Subject, Budget, Location).", color: "from-blue-400 to-blue-600" },
                        { icon: <FaChalkboardTeacher />, title: "2. Tutors Apply", desc: "Verified tutors browse posts and submit applications with qualifications.", color: "from-teal-400 to-teal-600" },
                        { icon: <FaCheckCircle />, title: "3. Accept & Start", desc: "Students review profiles, accept the best tutor and start learning.", color: "from-orange-400 to-red-500" }
                    ].map((step, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ y: -10 }}
                            className="bg-white/80 backdrop-blur-lg p-8 rounded-[30px] shadow-xl border border-white/50 text-center relative overflow-hidden group"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-4xl mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="bg-white py-20 rounded-[50px] shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-800">Latest <span className="text-blue-600">Tuition</span> Posts</h2>
                        <Link to="/tuitions" className="mt-4 md:mt-0 text-blue-600 font-bold hover:underline flex items-center gap-2">
                            View All <FaSearch />
                        </Link>
                    </div>

                    {loadingTuitions ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-dots loading-lg text-blue-600"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestTuitions.map(tuition => (
                                <div key={tuition._id} className="hover:scale-[1.02] transition-transform">
                                    <TuitionCard 
                                        tuition={tuition} 
                                        onApplyClick={() => window.location.href = "/tuitions"} 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="container mx-auto py-24 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-800">3. Why Choose <span className="text-blue-600">Us</span></h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Verified Tutors", val: "100%", icon: <FaRocket />, color: "text-blue-500", bg: "bg-blue-100" },
                        { label: "Active Students", val: "2k+", icon: <FaUserGraduate />, color: "text-purple-500", bg: "bg-purple-100" },
                        { label: "Daily Posts", val: "50+", icon: <FaChalkboardTeacher />, color: "text-teal-500", bg: "bg-teal-100" },
                        { label: "Payment Safety", val: "Secured", icon: <FaCheckCircle />, color: "text-orange-500", bg: "bg-orange-100" }
                    ].map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 rounded-[40px] shadow-lg border-b-8 border-transparent hover:border-blue-500 transition-all text-center">
                            <div className={`w-14 h-14 mx-auto ${stat.bg} ${stat.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                                {stat.icon}
                            </div>
                            <h4 className="text-4xl font-black text-gray-800">{stat.val}</h4>
                            <p className="text-gray-500 font-medium mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;