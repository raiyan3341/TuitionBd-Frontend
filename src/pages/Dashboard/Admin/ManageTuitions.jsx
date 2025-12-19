import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../../components/LoadingPage';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt, FaMapMarkerAlt, FaWallet, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ManageTuitions = () => {
    const { user } = useAuth();
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000';

    const fetchTuitions = () => {
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        axios.get(`${BASE_URL}/tuitions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setTuitions(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching tuitions:', error);
            Swal.fire('Error', 'Failed to fetch tuition posts.', 'error');
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchTuitions();
    }, []);

    const handleStatusUpdate = (id, status) => {
        const action = status === 'Approved' ? 'Approve' : 'Reject';
        Swal.fire({
            title: `Confirm ${action}?`,
            text: `You are about to ${action.toLowerCase()} this tuition post.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'Approved' ? '#10b981' : '#f87171',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${action}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    const res = await axios.patch(`${BASE_URL}/tuitions/status/${id}`, { status: status }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Success!', `Post ${action.toLowerCase()}d.`, 'success');
                        fetchTuitions(); 
                    }
                } catch (error) {
                    Swal.fire('Failed!', 'Error updating status.', 'error');
                }
            }
        });
    };
    
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete post'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    const res = await axios.delete(`${BASE_URL}/tuitions/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Post has been removed.', 'success');
                        fetchTuitions();
                    }
                } catch (error) {
                    Swal.fire('Failed!', 'Error deleting tuition post.', 'error');
                }
            }
        });
    };
    
    const StatusBadge = ({ status }) => {
        const colors = {
            'Approved': 'bg-emerald-100 text-emerald-600 border-emerald-200',
            'Rejected': 'bg-rose-100 text-rose-600 border-rose-200',
            'Pending': 'bg-amber-100 text-amber-600 border-amber-200',
            'Hired': 'bg-blue-100 text-blue-600 border-blue-200',
            'Paid': 'bg-purple-100 text-purple-600 border-purple-200'
        };
        const currentStyle = colors[status] || colors['Pending'];
        
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentStyle}`}>
                {status || 'Pending'}
            </span>
        );
    };

    if (loading) return <LoadingPage />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8">

            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tuition <span className="text-blue-600">Management</span></h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">Total Posts: {tuitions.length}</p>
                </div>
                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Admin Control Panel</span>
                </div>
            </div>
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-4 px-8">
                        <thead className="text-slate-400 font-black uppercase text-[10px] tracking-[2px]">
                            <tr className="border-none">
                                <th className="bg-transparent pl-8">Subject & Class</th>
                                <th className="bg-transparent">Financials</th>
                                <th className="bg-transparent">Client</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-4">
                            {tuitions.map((tuition) => (
                                <tr key={tuition._id} className="group bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all duration-300">
                                    <td className="rounded-l-[25px] border-none py-6 pl-8">
                                        <div>
                                            <div className="font-black text-slate-800 text-base">{tuition?.subject}</div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">{tuition?.classLevel}</span>
                                                <span className="flex items-center gap-1"><FaMapMarkerAlt size={10}/> {tuition?.location || 'Remote'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-none">
                                        <div className="flex items-center gap-2 text-emerald-600 font-black">
                                            <FaWallet className="opacity-50" />
                                            <span>৳ {tuition?.salary ? Number(tuition.salary).toLocaleString() : 'Negotiable'}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Medium: {tuition?.medium}</div>
                                    </td>
                                    <td className="border-none">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                                                <FaEnvelope />
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 lowercase">{tuition?.studentEmail}</span>
                                        </div>
                                    </td>
                                    <td className="border-none text-center">
                                        <StatusBadge status={tuition?.status} />
                                    </td>
                                    <td className="rounded-r-[25px] border-none pr-8">
                                        <div className="flex justify-end gap-2">
                                        
                                            <button 
                                                onClick={() => handleStatusUpdate(tuition._id, 'Approved')}
                                                disabled={['Approved', 'Hired', 'Paid'].includes(tuition.status)}
                                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-emerald-500"
                                            >
                                                <FaCheckCircle size={18} />
                                            </button>
                                            
                                           
                                            <button 
                                                onClick={() => handleStatusUpdate(tuition._id, 'Rejected')}
                                                disabled={['Rejected', 'Hired', 'Paid'].includes(tuition.status)}
                                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-amber-500"
                                            >
                                                <FaTimesCircle size={18} />
                                            </button>

                                            
                                            <button 
                                                onClick={() => handleDelete(tuition._id)}
                                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {tuitions.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-slate-300 mb-4 flex justify-center"><FaGraduationCap size={60}/></div>
                            <h3 className="text-xl font-black text-slate-400 italic">No tuition posts found in the records.</h3>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ManageTuitions;