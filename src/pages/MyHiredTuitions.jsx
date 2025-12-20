import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 

import { FaGraduationCap, FaMapMarkerAlt, FaDollarSign, FaPhone, FaEnvelope, FaUserCircle, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingPage from '../components/LoadingPage';
import useAuth from '../hooks/useAuth';

const MyHiredTuitions = () => {
    const { user } = useAuth();
    const [hiredApplications, setHiredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contactInfo, setContactInfo] = useState(null); 
    const [modalLoading, setModalLoading] = useState(false);
    const BASE_URL = 'https://tuition-bd-backend.vercel.app';

    const fetchHiredApplications = async () => {
        if (!user?.email) return;
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        
        try {
            const res = await axios.get(`${BASE_URL}/applications/my-applications?email=${user?.email}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const hired = res.data.filter(app => app.status === 'Paid-Confirmed');
            setHiredApplications(hired);
        } catch (error) {
            console.error('Error fetching hired tuitions:', error);
            Swal.fire('Error', 'Failed to fetch hired tuitions list.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHiredApplications();
    }, [user]);

    const fetchContactInfo = async (tuitionId) => {
        setModalLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        try {
            const res = await axios.get(`${BASE_URL}/contact-details/${tuitionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setContactInfo(res.data);
            document.getElementById('tutor_contact_modal').showModal();
        } catch (error) {
            Swal.fire('Restricted', error.response?.data?.message || 'Contact details not available yet.', 'warning');
        } finally {
            setModalLoading(false);
        }
    };
    
    if (loading) return <LoadingPage />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-10" >
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">
                        My <span className="text-emerald-500">Hired</span> List
                    </h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">
                        Active Assignments: {hiredApplications.length}
                    </p>
                </div>
                <div className="bg-emerald-50 px-5 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">Confirmed Tuitions Only</span>
                </div>
            </div>
            {hiredApplications.length === 0 ? (
                <div className="bg-white rounded-[45px] p-20 text-center border-2 border-dashed border-slate-200">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaGraduationCap className="text-slate-300 text-4xl" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-400">No Hired Tuitions Found</h2>
                    <p className="text-slate-400 mt-2">Apply for more tuitions to see them here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {hiredApplications.map((app) => (
                        <motion.div 
                            whileHover={{ y: -5 }}
                            key={app._id} 
                            className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-emerald-50 p-4 rounded-3xl text-emerald-600 text-2xl">
                                        <FaGraduationCap />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                                            <FaCheckCircle /> Paid & Confirmed
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-300 mt-2 uppercase">ID: {app.tuitionId.slice(-6)}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-black text-slate-800 tracking-tighter mb-4">
                                    {app.tuitionDetails?.subject} <span className="text-slate-400 font-medium">({app.tuitionDetails?.classLevel})</span>
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaMapMarkerAlt className="text-blue-500" />
                                        <span className="text-xs font-bold text-slate-600">{app.tuitionDetails?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                        <FaDollarSign className="text-emerald-500" />
                                        <span className="text-xs font-black text-slate-800">৳ {app.expectedSalary?.toLocaleString()} / month</span>
                                    </div>
                                </div>

                                <button 
                                    className="w-full group bg-slate-900 hover:bg-emerald-600 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[2px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                    onClick={() => fetchContactInfo(app.tuitionId)}
                                    disabled={modalLoading}
                                >
                                    {modalLoading ? <span className="loading loading-spinner"></span> : <><FaUserCircle /> Unlock Student Details</>}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <dialog id="tutor_contact_modal" className="modal">
                <div className="modal-box p-0 rounded-[40px] bg-white overflow-hidden max-w-md border-none shadow-2xl">
                    <div className="bg-emerald-600 p-8 text-white relative">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center text-3xl">
                                🎉
                            </div>
                            <div>
                                <h3 className="font-black text-2xl tracking-tight">Assignment Unlocked!</h3>
                                <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Student Contact Details</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        {contactInfo ? (
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Student Name</p>
                                    <p className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">{contactInfo.name}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-colors group">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                            <p className="text-sm font-bold text-slate-700">{contactInfo.email}</p>
                                        </div>
                                    </a>

                                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-colors group">
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="text-sm font-bold text-slate-700">{contactInfo.phone || 'N/A'}</p>
                                        </div>
                                    </a>
                                </div>

                                <p className="text-[10px] text-center font-bold text-slate-400 italic px-6 mt-4">
                                    Tip: Please call the student as soon as possible to discuss schedules!
                                </p>
                            </div>
                        ) : (
                            <div className="py-10 text-center"><span className="loading loading-dots loading-lg text-emerald-600"></span></div>
                        )}
                        
                        <div className="modal-action mt-6">
                            <form method="dialog" className="w-full">
                                <button className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Got it, Close</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-slate-900/40 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        </motion.div>
    );
};

export default MyHiredTuitions;