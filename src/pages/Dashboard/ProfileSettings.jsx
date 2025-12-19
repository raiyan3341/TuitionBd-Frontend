// src/pages/Dashboard/Admin/ProfileSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


import { FaCamera, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaSave, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import LoadingPage from '../../components/LoadingPage';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        if (user?.email) {
            axios.get(`${BASE_URL}/users/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                    setImagePreview(res.data?.photo || user?.photoURL);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire('Error', 'File size too large! Keep it under 2MB', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;

        try {
            setUploading(true);
            const updatedUser = { 
                name, phone, address, 
                photo: imagePreview 
            };

            const res = await axios.patch(`${BASE_URL}/users/update/${user.email}`, updatedUser);
            
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated. Refreshing system...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#fff',
                    iconColor: '#3b82f6'
                });
                setTimeout(() => {
                    window.location.reload(); 
                }, 2000);
            }
        } catch (error) {
            Swal.fire('Error!', 'Update failed.', 'error');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <LoadingPage />;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 pb-10"
        >
            {/* Header Section */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Account <span className="text-blue-600">Settings</span></h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[3px] mt-1">Manage your identity and privacy</p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl text-emerald-600 border border-emerald-100">
                    <FaCheckCircle size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Profile</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Avatar Card */}
                <div className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-100 flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-[50px] overflow-hidden ring-4 ring-blue-50 ring-offset-4 bg-slate-100 transition-all group-hover:ring-blue-200">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-300 font-black">NO IMAGE</div>
                            )}
                        </div>
                        <label className="absolute bottom-2 right-2 w-12 h-12 bg-blue-600 hover:bg-slate-900 text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-lg shadow-blue-200 transition-all border-4 border-white">
                            <FaCamera size={18} />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                    <div className="mt-8 text-center">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{userData?.name || 'User Name'}</h3>
                        <p className="text-sm font-bold text-slate-400 mt-1">{user?.email}</p>
                        <div className="mt-4 px-4 py-1 bg-slate-100 rounded-full inline-block">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{userData?.role || 'Member'}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Form Settings */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[45px] shadow-sm border border-slate-100">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <FaUser className="text-blue-500" /> Full Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={userData?.name} 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    required 
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <FaPhoneAlt className="text-blue-500" /> Phone Number
                                </label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    defaultValue={userData?.phone} 
                                    placeholder="+880 1XXX-XXXXXX"
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                                <FaMapMarkerAlt className="text-blue-500" /> Current Address
                            </label>
                            <textarea 
                                name="address" 
                                rows="3"
                                defaultValue={userData?.address} 
                                placeholder="House, Street, City..."
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Save Button */}
                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={uploading} 
                                className={`w-full h-16 rounded-[24px] font-black text-xs uppercase tracking-[3px] transition-all flex items-center justify-center gap-3 shadow-xl
                                    ${uploading 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                        : 'bg-slate-900 hover:bg-blue-600 text-white shadow-blue-900/10 hover:shadow-blue-500/20 active:scale-95'
                                    }`}
                            >
                                {uploading ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> Save Profile Updates
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileSettings;