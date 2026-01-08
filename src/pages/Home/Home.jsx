import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
    FaUserGraduate, FaChalkboardTeacher, FaCheckCircle, FaRocket, 
    FaSearch, FaQuoteLeft, FaQuestionCircle, FaEnvelopeOpenText,
    FaShieldAlt, FaStar, FaLightbulb, FaAward, FaLaptopCode, FaBook
} from 'react-icons/fa';
import TuitionCard from '../../components/TuitionCard';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const Home = () => {
    const navigate = useNavigate();
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
            .catch(() => setLoadingTuitions(false));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
        
            <section className="relative h-[70vh] flex items-center bg-[#0f172a] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="md:w-3/5 text-left">
                        <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm">Empowering Education</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mt-4">
                            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Academic</span> Potential
                        </h1>
                        <p className="text-slate-400 mt-6 text-lg max-w-xl">
                            Connect with verified subject experts for personalized learning. 
                            Whether you're a student seeking excellence or a tutor looking for opportunities.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link to="/tutors" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                                Hire a Tutor <FaSearch />
                            </Link>
                            <Link to="/tuitions" className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
                                Apply as Tutor
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-6 mt-6 sm:-mt-10 relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Active Learners", val: "12k+", color: "bg-blue-600", shadow: "shadow-blue-200" },
                        { label: "Expert Tutors", val: "4.5k+", color: "bg-emerald-500", shadow: "shadow-emerald-200" },
                        { label: "Jobs Posted", val: "8k+", color: "bg-purple-600", shadow: "shadow-purple-200" },
                        { label: "Satisfaction", val: "99%", color: "bg-rose-500", shadow: "shadow-rose-200" }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp} whileHover={{ y: -10 }} className={`${stat.color} p-8 rounded-[32px] text-white shadow-2xl ${stat.shadow}`}>
                            <h4 className="text-4xl font-black">{stat.val}</h4>
                            <p className="opacity-80 font-medium mt-2 uppercase tracking-widest text-[10px]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800">Your Path to <span className="text-blue-600">Success</span></h2>
                    <p className="text-slate-500 mt-2 italic">Get started in three simple steps</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { icon: <FaUserGraduate />, title: "Post Requirements", desc: "List your subjects, location, and budget details.", color: "text-blue-600", bg: "bg-blue-50" },
                        { icon: <FaChalkboardTeacher />, title: "Compare Tutors", desc: "Browse applications from highly qualified specialists.", color: "text-purple-600", bg: "bg-purple-50" },
                        { icon: <FaCheckCircle />, title: "Start Sessions", desc: "Select the perfect match and begin your journey.", color: "text-emerald-600", bg: "bg-emerald-50" }
                    ].map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center group">
                            <div className={`w-24 h-24 ${step.bg} ${step.color} rounded-[35px] flex items-center justify-center text-4xl mx-auto mb-6 group-hover:rotate-12 transition-all duration-500`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                            <p className="text-slate-500">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-24 bg-slate-900 text-white rounded-[60px] mx-4">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12">Popular <span className="text-cyan-400">Categories</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Science & Tech", icon: <FaRocket /> },
                            { name: "Coding & Dev", icon: <FaLaptopCode /> },
                            { name: "Language Arts", icon: <FaBook /> },
                            { name: "Admission Test", icon: <FaAward /> }
                        ].map((cat, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-[2px] rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 cursor-pointer">
                                <div className="bg-slate-800 h-full w-full rounded-[22px] p-8 text-center hover:bg-transparent transition-colors">
                                    <div className="text-cyan-400 text-3xl mb-4 flex justify-center">{cat.icon}</div>
                                    <h4 className="font-bold text-lg">{cat.name}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-4xl font-black text-slate-800">Latest <span className="text-indigo-600">Openings</span></h2>
                    <Link to="/tuitions" className="bg-indigo-50 text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm">Explore All</Link>
                </div>
                {loadingTuitions ? (
                    <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestTuitions.slice(0, 6).map(tuition => (
                            <motion.div key={tuition._id} variants={fadeInUp}>
                                <TuitionCard tuition={tuition} onApplyClick={() => navigate("/tuitions")} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { title: "Background Checks", icon: <FaShieldAlt />, color: "bg-blue-500" },
                            { title: "Smart Matching", icon: <FaLightbulb />, color: "bg-amber-500" },
                            { title: "Verified Badges", icon: <FaAward />, color: "bg-rose-500" },
                            { title: "Secure Portal", icon: <FaCheckCircle />, color: "bg-emerald-500" }
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                                <div className={`${item.color} w-12 h-12 rounded-2xl text-white flex items-center justify-center text-xl mb-4`}>{item.icon}</div>
                                <h5 className="font-bold text-slate-800">{item.title}</h5>
                                <p className="text-slate-400 text-xs mt-2 italic">Trusted Service</p>
                            </motion.div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 leading-tight">We Ensure The Best <br /><span className="text-blue-600">Learning Experience</span></h2>
                        <p className="text-slate-500 mt-6 leading-relaxed">Our platform uses intelligent algorithms to pair learners with the ideal tutor based on location, budget, and learning style.</p>
                        <ul className="mt-8 space-y-3">
                            {["24/7 Priority Support", "Direct Chat System", "Payment Protection"].map((li, i) => (
                                <li key={i} className="flex items-center gap-2 font-bold text-slate-700">
                                    <FaCheckCircle className="text-emerald-500" /> {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-indigo-700 to-purple-800 text-white relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Real Success Stories</h2>
                        <p className="text-indigo-200 uppercase tracking-widest text-xs">Community Feedback</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "John Doe", role: "Physics Expert", text: "Within 48 hours of joining, I secured a long-term tuition with an excellent pay rate. The platform is truly seamless." },
                            { name: "Sarah Miller", role: "College Student", text: "Finding a specialized Calculus tutor was difficult until I used this portal. The verification badge gave me peace of mind." },
                            { name: "David Wilson", role: "Parent", text: "The dashboard allows me to track applications easily. It saved me weeks of manual searching for my daughter's teacher." }
                        ].map((user, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20">
                                <FaQuoteLeft className="text-indigo-300 text-3xl mb-4 opacity-50" />
                                <p className="text-indigo-50 leading-relaxed italic mb-8">"{user.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-400 rounded-full border-2 border-white/30"></div>
                                    <div>
                                        <span className="font-bold block">{user.name}</span>
                                        <span className="text-xs text-indigo-300">{user.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6 max-w-4xl">
                <h2 className="text-center text-3xl font-bold mb-12 text-slate-800">Common Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: "How do I verify my tutor profile?", a: "Go to your dashboard and upload your NID and academic certificates. Our team verifies all documents within 24 hours." },
                        { q: "Is there any registration fee?", a: "Signing up as a student or tutor is completely free. We only charge a small processing fee once a tuition is successfully confirmed." },
                        { q: "How are payments handled?", a: "Parents pay tutors directly. However, using our platform's secure payment system ensures payment protection and session tracking." }
                    ].map((item, i) => (
                        <details key={i} className="group bg-white rounded-3xl border border-slate-200 p-8 cursor-pointer shadow-sm transition-all">
                            <summary className="font-bold text-slate-800 flex justify-between items-center list-none text-lg">
                                {item.q} <span className="text-blue-600 group-open:rotate-45 transition-transform text-2xl">+</span>
                            </summary>
                            <p className="mt-6 text-slate-500 leading-relaxed border-t pt-6">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>


            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-slate-800">Academic Insights</h2>
                    <div className="grid md:grid-cols-2 gap-10 text-left">
                        {[
                            { title: "5 Methods to Boost Memory During Finals", tag: "Study Guide" },
                            { title: "The Rise of Online Learning in 2024", tag: "Tech" }
                        ].map((blog, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white rounded-[40px] p-6 flex flex-col sm:flex-row gap-8 shadow-xl shadow-slate-200/50 border border-white">
                                <div className="sm:w-1/3 h-48 bg-blue-50 rounded-[30px] flex items-center justify-center text-4xl">📚</div>
                                <div className="sm:w-2/3 py-4 flex flex-col justify-between">
                                    <div>
                                        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{blog.tag}</span>
                                        <h4 className="text-2xl font-bold text-slate-800 mt-2">{blog.title}</h4>
                                    </div>
                                    <button className="mt-4 text-blue-600 font-bold text-sm text-left">Read Article →</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 container mx-auto px-6">
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-[50px] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-rose-200">
                    <div className="relative z-10">
                        <FaEnvelopeOpenText className="text-6xl mx-auto mb-6 opacity-30" />
                        <h2 className="text-4xl font-black">Stay Ahead of the Curve</h2>
                        <p className="mt-4 opacity-90 max-w-md mx-auto">Get notified immediately when a new tuition post matches your specific skills.</p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input type="email" placeholder="Your email address" className="flex-1 px-8 py-4 rounded-2xl text-slate-800 focus:outline-none shadow-inner" />
                            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all">Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="container mx-auto px-6">
                    <h2 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">Ready to Master Any Subject?</h2>
                    <p className="text-slate-500 text-lg mb-10">Join thousands of students and tutors today.</p>
                    <Link to="/register" className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-blue-300 hover:scale-105 transition-transform inline-block">
                        Join Our Community
                    </Link>
                </motion.div>
            </section>

        </div>
    );
};

export default Home;