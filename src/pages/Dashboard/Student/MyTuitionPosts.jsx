// src/pages/Dashboard/Student/MyTuitions.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 এই লাইনটি যোগ করুন

import axios from 'axios';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import LoadingPage from '../../../components/LoadingPage';
// You will need to install sweetalert2 for better confirmation dialogs: npm install sweetalert2
import Swal from 'sweetalert2'; 
import useAuth from '../../../hooks/useAuth';

const MyTuitions = () => {
    const { user } = useAuth();
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTuition, setSelectedTuition] = useState(null); // For update modal
    const BASE_URL = 'https://tuition-bd-backend.vercel.app';

    // Hardcoded options (must match PostNewTuition.jsx)
    const subjects = ["Bangla", "English", "Math", "Physics", "Chemistry", "Biology", "ICT", "General Science"];
    const classes = ["Class 1", "Class 5", "Class 8", "SSC", "HSC", "University"];
    const locations = ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Mohammadpur", "Other"];
    const schedules = ["3 days/week", "5 days/week", "Daily"];

    // Function to fetch the student's tuitions
    const fetchMyTuitions = () => {
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        
        axios.get(`${BASE_URL}/tuitions/my-posts?email=${user?.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setTuitions(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching my tuitions:', error);
            setLoading(false);
            // Handle 403 or 401 errors specifically
            if (error.response?.status === 403 || error.response?.status === 401) {
                Swal.fire('Session Expired', 'Please log in again.', 'error');
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            fetchMyTuitions();
        }
    }, [user]);

    // --- DELETE Functionality ---
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    const res = await axios.delete(`${BASE_URL}/tuitions/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your tuition post has been deleted.', 'success');
                        fetchMyTuitions(); // Refresh the list
                    }
                } catch (error) {
                    Swal.fire('Failed!', error.response?.data?.message || 'Error deleting post.', 'error');
                }
            }
        });
    };

    // --- UPDATE Functionality ---
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const id = selectedTuition._id;

        const updatedData = {
            subject: form.subject.value,
            classLevel: form.classLevel.value,
            location: form.location.value,
            budget: parseFloat(form.budget.value),
            schedule: form.schedule.value,
            tuitionDetails: form.details.value,
        };

        const token = localStorage.getItem('tuition-access-token');
        try {
            const res = await axios.patch(`${BASE_URL}/tuitions/${id}`, updatedData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Your tuition post has been updated.', 'success');
                // Close modal
                document.getElementById('update_modal').close();
                setSelectedTuition(null); 
                fetchMyTuitions(); // Refresh the list
            }
        } catch (error) {
            Swal.fire('Failed!', error.response?.data?.message || 'Error updating post.', 'error');
        }
    };
    
    // Status Badge Component
    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'Approved':
                return <span className="badge badge-success gap-2"><FaCheckCircle /> Approved</span>;
            case 'Rejected':
                return <span className="badge badge-error gap-2"><FaTimesCircle /> Rejected</span>;
            case 'Pending':
            default:
                return <span className="badge badge-warning gap-2"><FaClock /> Pending</span>;
        }
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-primary border-b pb-2">My Posted Tuitions ({tuitions.length})</h1>
            
            {tuitions.length === 0 ? (
                <div className="text-center p-10 bg-base-200 rounded-lg">
                    <p className="text-xl text-gray-600 mb-4">You have not posted any tuitions yet.</p>
                    <Link to="/dashboard/post-new-tuition" className="btn btn-primary">Post New Tuition</Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject/Class</th>
                                <th>Location</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitions.map((t, index) => (
                                <tr key={t._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{t.subject}</div>
                                        <div className="text-sm opacity-50">{t.classLevel}</div>
                                    </td>
                                    <td>{t.location}</td>
                                    <td>৳ {t.budget.toLocaleString()}</td>
                                    <td><StatusBadge status={t.status} /></td>
                                    <td className="flex gap-2">
                                        <button 
                                            className="btn btn-info btn-sm text-white" 
                                            onClick={() => {
                                                setSelectedTuition(t);
                                                document.getElementById('update_modal').showModal();
                                            }}
                                            title="Edit Post"
                                            disabled={t.status === 'Approved'} // Cannot edit if already approved
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="btn btn-error btn-sm text-white" 
                                            onClick={() => handleDelete(t._id)}
                                            title="Delete Post"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- Update Modal --- */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">Update Tuition Post</h3>
                    
                    {selectedTuition && (
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            {/* Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Subject</span></label>
                                    <select name="subject" className="select select-bordered" required defaultValue={selectedTuition.subject}>
                                        {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </select>
                                </div>
                                {/* Class Level */}
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Class/Level</span></label>
                                    <select name="classLevel" className="select select-bordered" required defaultValue={selectedTuition.classLevel}>
                                        {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                                    </select>
                                </div>
                                {/* Location */}
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Location/Area</span></label>
                                    <select name="location" className="select select-bordered" required defaultValue={selectedTuition.location}>
                                        {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                                {/* Budget */}
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Expected Monthly Budget (TK)</span></label>
                                    <input type="number" name="budget" placeholder="e.g., 5000" className="input input-bordered" min="1000" required defaultValue={selectedTuition.budget} />
                                </div>
                                {/* Schedule */}
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Schedule</span></label>
                                    <select name="schedule" className="select select-bordered" required defaultValue={selectedTuition.schedule}>
                                        {schedules.map(sch => <option key={sch} value={sch}>{sch}</option>)}
                                    </select>
                                </div>
                            </div>
                            {/* Details */}
                            <div className="form-control">
                                <label className="label"><span className="label-text">Detailed Requirement/Note</span></label>
                                <textarea name="details" placeholder="Details..." className="textarea textarea-bordered h-24" required defaultValue={selectedTuition.tuitionDetails}></textarea>
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={() => document.getElementById('update_modal').close()} className="btn">Close</button>
                            </div>
                        </form>
                    )}
                </div>
                {/* Close button for outside click */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyTuitions;