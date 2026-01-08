import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, 
    FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane,
    FaGraduationCap
} from 'react-icons/fa';

const Footer = () => {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email) {
            alert(`Thank you! ${email} has been subscribed to our tuition alerts.`);
            e.target.reset();
        }
    };

    return (
        <footer className="relative bg-[#0f172a] text-slate-300 pt-20 pb-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                                <FaGraduationCap />
                            </div>
                            <span className="text-3xl font-black text-white tracking-tighter">
                                Tuition<span className="text-blue-500">Bd</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            The most trusted ecosystem for personalized education in Bangladesh. We connect expert tutors with passionate learners to build a brighter future.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaFacebookF />, link: "https://facebook.com", color: "hover:bg-blue-600" },
                                { icon: <FaTwitter />, link: "https://twitter.com", color: "hover:bg-sky-500" },
                                { icon: <FaLinkedinIn />, link: "https://linkedin.com", color: "hover:bg-blue-700" },
                                { icon: <FaInstagram />, link: "https://instagram.com", color: "hover:bg-pink-600" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.link} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white border border-white/10 shadow-lg`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Navigation
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">Home Page</Link></li>
                            <li><Link to="/tuitions" className="hover:text-blue-400 transition-colors flex items-center gap-2">Available Tuitions</Link></li>
                            <li><Link to="/register" className="hover:text-blue-400 transition-colors flex items-center gap-2">Join as a Tutor</Link></li>
                            <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-2">User Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Support Center
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex gap-4 items-start group">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <FaMapMarkerAlt />
                                </div>
                                <span className="group-hover:text-white transition-colors">Gulshan 2, Dhaka 1212, <br /> Bangladesh</span>
                            </li>
                            <li className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <FaPhoneAlt />
                                </div>
                                <span className="group-hover:text-white transition-colors">+880 1871093089</span>
                            </li>
                            <li className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                    <FaEnvelope />
                                </div>
                                <span className="group-hover:text-white transition-colors">rayanbin13@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Tuition Alerts
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-pink-500 rounded-full"></span>
                        </h4>
                        <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
                            Subscribe to get instant notifications about premium tuition posts in your area.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="relative">
                            <input 
                                required
                                name="email"
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 focus:bg-white/10"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-95"
                            >
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
                    <p className="text-xs font-medium text-slate-500">
                        Copyright © {new Date().getFullYear()} - <span className="text-blue-500/80">TuitionBd Management</span>. Built with ❤️ in Bangladesh.
                    </p>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                        <Link to="/" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/" className="hover:text-white transition-colors">Policies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;