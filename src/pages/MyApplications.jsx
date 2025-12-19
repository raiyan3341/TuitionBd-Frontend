import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaMapMarkerAlt, FaDollarSign, FaClock, FaCommentDots, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import LoadingPage from '../components/LoadingPage';
import useAuth from '../hooks/useAuth';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000';

    const fetchMyApplications = async () => {
        setLoading(true);
        const token = localStorage.getItem('access-token');
        try {
            const res = await axios.get(`${BASE_URL}/applications/my-applications?email=${user?.email}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setApplications(res.data);
        } catch (error) {
            console.error('Error fetching my applications:', error);
            if (error.response?.status === 403 || error.response?.status === 401) {
                Swal.fire('Unauthorized', 'Please log in again.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchMyApplications();
        }
    }, [user]);

    const StatusBadge = ({ status }) => {
        const statusMap = {
            'Accepted': 'bg-emerald-100 text-emerald-600 border-emerald-200',
            'Paid-Confirmed': 'bg-emerald-100 text-emerald-600 border-emerald-200',
            'Rejected': 'bg-rose-100 text-rose-600 border-rose-200',
            'Applied': 'bg-blue-100 text-blue-600 border-blue-200',
            'pending': 'bg-amber-100 text-amber-600 border-amber-200'
        };
        const colorClass = statusMap[status] || 'bg-slate-100 text-slate-500 border-slate-200';

        return (
            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${colorClass}`}>
                {status || 'Pending'}
            </span>
        );
    };

    if (loading) return <LoadingPage />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-10">

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">
                        Tuition <span className="text-blue-600">Applications</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">
                        Total Submissions: {applications.length}
                    </p>
                </div>
                <div className="bg-blue-50 px-5 py-2 rounded-2xl border border-blue-100 flex items-center gap-2">
                    <FaPaperPlane className="text-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">Track Status</span>
                </div>
            </div>
            {applications.length === 0 ? (
                <div className="bg-white rounded-[45px] p-20 text-center border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <FaPaperPlane size={30} />
                    </div>
                    <h2 className="text-xl font-black text-slate-400 uppercase">No Applications Yet</h2>
                    <p className="text-slate-400 mt-2 mb-8">Start your teaching journey by browsing available tuitions.</p>
                    <Link to="/tuitions" className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-200">
                        Browse Tuitions
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {applications.map((app, index) => (
                        <motion.div 
                            key={app._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-blue-50 p-4 rounded-3xl text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <FaGraduationCap />
                                    </div>
                                    <StatusBadge status={app.status} />
                                </div>

                                <h2 className="text-2xl font-black text-slate-800 tracking-tighter mb-4 italic">
                                    {app?.subject || app?.tuitionDetails?.subject || "Subject N/A"}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaMapMarkerAlt className="text-rose-500" />
                                        <span className="text-xs font-bold text-slate-600 truncate">{app?.location || app?.tuitionDetails?.location || "N/A"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaDollarSign className="text-emerald-500" />
                                        <span className="text-xs font-black text-slate-800">৳{app?.expectedSalary?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaCalendarAlt className="text-blue-500" />
                                        <span className="text-xs font-bold text-slate-600">
                                            {app?.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaClock className="text-amber-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Applied For ID: {app._id.slice(-6)}</span>
                                    </div>
                                </div>
                                <div className="relative p-6 bg-slate-900 rounded-[30px] text-slate-300">
                                    <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[2px] flex items-center gap-1">
                                        <FaCommentDots /> Your Message
                                    </div>
                                    <p className="text-xs font-medium italic leading-relaxed">
                                        "{app?.tutorMessage || "No introduction message provided."}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default MyApplications;