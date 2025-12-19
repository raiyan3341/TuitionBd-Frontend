// src/components/Shared/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, 
    FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane 
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[#0f172a] text-slate-300 pt-20 pb-10 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400"></div>
            
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* 1. Brand & Description */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-4xl font-black text-white tracking-tighter">
                                T<span className="text-blue-500">M</span>S
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Leading the way in personalized education. We connect expert tutors with passionate learners to build a brighter future through quality mentorship.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaFacebookF />, link: "#", color: "hover:bg-blue-600" },
                                { icon: <FaTwitter />, link: "#", color: "hover:bg-sky-500" },
                                { icon: <FaLinkedinIn />, link: "#", color: "hover:bg-blue-700" },
                                { icon: <FaInstagram />, link: "#", color: "hover:bg-pink-600" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.link} 
                                    className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white border border-white/10 shadow-lg`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Useful Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">Home</Link></li>
                            <li><Link to="/tuitions" className="hover:text-blue-400 transition-colors flex items-center gap-2">Browse Tuitions</Link></li>
                            <li><Link to="/tutors" className="hover:text-blue-400 transition-colors flex items-center gap-2">Find Tutors</Link></li>
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2">Success Stories</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* 3. Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Get In Touch
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/20">
                                    <FaMapMarkerAlt />
                                </div>
                                <span>Gulshan 2, Dhaka 1212, <br /> Bangladesh</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
                                    <FaPhoneAlt />
                                </div>
                                <span>+880 1700 000000</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20">
                                    <FaEnvelope />
                                </div>
                                <span>support@tms.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Newsletter
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-pink-500 rounded-full"></span>
                        </h4>
                        <p className="text-sm text-slate-400 mb-6 font-medium">Get the latest tuition updates & tips.</p>
                        <form className="relative">
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all flex items-center justify-center">
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-medium text-slate-500">
                        Copyright © {new Date().getFullYear()} - <span className="text-blue-500/80">Tuition Management System</span>. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;