// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import LoadingPage from '../../../components/LoadingPage';
import { FaUserShield, FaUserGraduate, FaUser, FaUserEdit, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ManageUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'http://localhost:3000';

    const fetchUsers = () => {
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        axios.get(`${BASE_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setUsers(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            Swal.fire('Error', 'Failed to fetch user list.', 'error');
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateRole = (id, role) => {
        Swal.fire({
            title: 'Change User Role?',
            text: `Confirming this will grant ${role} permissions to this user.`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: role === 'Admin' ? '#ef4444' : '#3b82f6',
            cancelButtonColor: '#64748b',
            confirmButtonText: `Yes, Promote to ${role}`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    const res = await axios.patch(`${BASE_URL}/users/role/${id}`, { role: role }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Success!', `User is now an ${role}.`, 'success');
                        fetchUsers();
                    }
                } catch (error) {
                    Swal.fire('Failed!', 'Error updating user role.', 'error');
                }
            }
        });
    };

    const getRoleStyles = (role) => {
        if (role === 'Admin') return 'bg-rose-100 text-rose-600 border-rose-200';
        if (role === 'Tutor') return 'bg-blue-100 text-blue-600 border-blue-200';
        return 'bg-slate-100 text-slate-500 border-slate-200';
    };

    const getRoleIcon = (role) => {
        if (role === 'Admin') return <FaUserShield />;
        if (role === 'Tutor') return <FaUserGraduate />;
        return <FaUser />;
    };

    if (loading) return <LoadingPage />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header section with Stats Highlight */}
            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">
                        User <span className="text-blue-600">Registry</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">
                        Active Database: {users.length} Profiles
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-blue-50 px-5 py-2 rounded-2xl border border-blue-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Live Monitoring</span>
                    </div>
                </div>
            </div>

            {/* User List Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-4 px-8">
                        <thead className="text-slate-400 font-black uppercase text-[10px] tracking-[2px]">
                            <tr className="border-none">
                                <th className="bg-transparent pl-8">Identity</th>
                                <th className="bg-transparent">Contact Details</th>
                                <th className="bg-transparent">Privilege Level</th>
                                <th className="bg-transparent text-right pr-8">Account Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((userItem) => (
                                <tr key={userItem._id} className="group bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all duration-300">
                                    {/* User Identity Column */}
                                    <td className="rounded-l-[25px] border-none py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-2xl ring-2 ring-slate-100 ring-offset-2">
                                                    <img 
                                                        src={userItem?.photo || `https://ui-avatars.com/api/?name=${userItem.name}&background=random`} 
                                                        alt={userItem.name} 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800 text-base">{userItem.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">UID: {userItem._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contact Details Column */}
                                    <td className="border-none">
                                        <div className="flex items-center gap-2 text-slate-600 font-bold">
                                            <FaEnvelope className="text-blue-400" size={12} />
                                            <span className="text-sm">{userItem.email}</span>
                                        </div>
                                    </td>

                                    {/* Role Badge Column */}
                                    <td className="border-none">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getRoleStyles(userItem.role)}`}>
                                            {getRoleIcon(userItem.role)}
                                            {userItem.role}
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="rounded-r-[25px] border-none pr-8">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleUpdateRole(userItem._id, 'Admin')}
                                                disabled={userItem.role === 'Admin'}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all shadow-sm
                                                    ${userItem.role === 'Admin' 
                                                        ? 'bg-slate-50 text-slate-300 border border-slate-100' 
                                                        : 'bg-white text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white hover:shadow-rose-200'
                                                    }`}
                                            >
                                                <FaUserShield /> Promote Admin
                                            </button>

                                            <button 
                                                onClick={() => handleUpdateRole(userItem._id, 'Tutor')}
                                                disabled={userItem.role === 'Tutor'}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-tighter transition-all shadow-sm
                                                    ${userItem.role === 'Tutor' 
                                                        ? 'bg-slate-50 text-slate-300 border border-slate-100' 
                                                        : 'bg-white text-blue-500 border border-blue-100 hover:bg-blue-500 hover:text-white hover:shadow-blue-200'
                                                    }`}
                                            >
                                                <FaUserGraduate /> Make Tutor
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default ManageUsers;