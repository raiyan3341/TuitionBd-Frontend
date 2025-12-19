// src/pages/Dashboard/Student/AppliedTutors.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Requires: npm install sweetalert2
import Swal from 'sweetalert2'; 

import LoadingPage from '../components/LoadingPage';
// NEW Icons: FaPhone and FaEnvelope added for contact info modal
import { FaUserGraduate, FaCheckCircle, FaTimesCircle, FaDollarSign, FaPhone, FaEnvelope } from 'react-icons/fa'; 
import PaymentPage from './PaymentPage'; // Import PaymentPage component
import useAuth from '../hooks/useAuth';

const AppliedTutors = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    // State to hold the application data for the payment modal
    const [selectedApplicationForPayment, setSelectedApplicationForPayment] = useState(null); 
    // State to hold contact details fetched after payment
    const [contactInfo, setContactInfo] = useState(null); 
    const BASE_URL = 'http://localhost:3000';

    // Function to fetch applications for the student's posts
    const fetchAppliedTutors = () => {
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        
        axios.get(`${BASE_URL}/applications/by-student-posts?email=${user?.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setApplications(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching applied tutors:', error);
            setLoading(false);
            if (error.response?.status === 403 || error.response?.status === 401) {
                Swal.fire('Session Expired', 'Please log in again.', 'error');
            }
        });
    };

    useEffect(() => {
        if (user?.email) {
            fetchAppliedTutors();
        }
    }, [user]);
    
    // R: Fetch Contact Info of the Hired Tutor
    const fetchContactInfo = async (tuitionId) => {
        setLoading(true);
        const token = localStorage.getItem('tuition-access-token');
        try {
            const res = await axios.get(`${BASE_URL}/contact-details/${tuitionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setContactInfo(res.data);
            document.getElementById('contact_modal').showModal();
        } catch (error) {
            Swal.fire('Failed!', error.response?.data?.message || 'Error fetching contact.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle decision for REJECT (Direct update, no payment needed)
    const handleDecision = (id, newStatus) => {
        Swal.fire({
            title: `Confirm ${newStatus}?`,
            text: `Are you sure you want to ${newStatus.toLowerCase()} this tutor?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f87171',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${newStatus.toLowerCase()}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    const res = await axios.patch(`${BASE_URL}/applications/status/${id}`, { status: newStatus }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Success!', `Tutor has been ${newStatus.toLowerCase()}.`, 'success');
                        fetchAppliedTutors(); // Refresh the list
                    }
                } catch (error) {
                    Swal.fire('Failed!', error.response?.data?.message || 'Error updating status.', 'error');
                }
            }
        });
    };

    // Handle ACCEPT decision (Includes pre-confirmation and payment modal trigger)
    const handleAcceptClick = (application) => {
        
        Swal.fire({
            title: 'Confirm Tutor Acceptance?',
            text: `You are about to accept ${application.tutorName} for ${application.tuitionSubject}. You must pay a service fee now to finalize the hire.`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept & Pay',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const token = localStorage.getItem('tuition-access-token');
                try {
                    // Temporarily set application status to 'Accepted' in DB
                    const res = await axios.patch(`${BASE_URL}/applications/status/${application._id}`, { status: 'Accepted' }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (res.data.modifiedCount > 0) {
                        return true; // If successful, proceed to payment
                    }
                    return false;
                } catch (error) {
                    Swal.showValidationMessage(`Acceptance failed: ${error.response?.data?.message || 'Server error'}`);
                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                // Open payment modal if temporary acceptance succeeded
                setSelectedApplicationForPayment(application);
                document.getElementById('payment_modal').showModal();
            }
        });
    };

    // Status Badge Component
    const StatusBadge = ({ status }) => {
        let badgeClass = 'badge-info';
        let text = status;
        
        if (status === 'Accepted') {
            badgeClass = 'badge-success';
        } else if (status === 'Rejected') {
            badgeClass = 'badge-error';
        } else if (status === 'Applied') {
            badgeClass = 'badge-warning';
        } else if (status === 'Paid-Confirmed') {
            badgeClass = 'badge-success';
            text = 'Hired & Paid';
        }
        
        return <span className={`badge ${badgeClass} text-white font-semibold`}>{text}</span>;
    };


    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-primary border-b pb-2">Applied Tutors for My Posts ({applications.length})</h1>
            
            {applications.length === 0 ? (
                <div className="text-center p-10 bg-base-200 rounded-lg">
                    <p className="text-xl text-gray-600 mb-4">No tutors have applied to your tuition posts yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tuition Post</th>
                                <th>Tutor Info</th>
                                <th>Expected Salary</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{app.tuitionSubject} - {app.tuitionClass}</div>
                                        <div className="text-sm opacity-50">Post Status: {app.tuitionStatus}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{app.tutorName || 'N/A'}</div>
                                        <div className="text-sm opacity-50">{app.tutorEmail}</div>
                                    </td>
                                    <td><FaDollarSign className="inline-block mr-1"/> {app.expectedSalary.toLocaleString()} TK</td>
                                    <td><StatusBadge status={app.status} /></td>
                                    <td className="flex gap-2">
                                        {/* Show buttons only if tuition is Approved and application status is 'Applied' */}
                                        {app.tuitionStatus === 'Approved' && app.status === 'Applied' && (
                                            <>
                                                <button 
                                                    className="btn btn-success btn-sm text-white" 
                                                    onClick={() => handleAcceptClick(app)} // Use the new function
                                                    title="Accept Tutor"
                                                >
                                                    <FaCheckCircle /> Accept & Pay
                                                </button>
                                                <button 
                                                    className="btn btn-error btn-sm text-white" 
                                                    onClick={() => handleDecision(app._id, 'Rejected')}
                                                    title="Reject Tutor"
                                                >
                                                    <FaTimesCircle /> Reject
                                                </button>
                                            </>
                                        )}
                                        {/* If the tuition post itself is already Hired/Paid, show appropriate status */}
                                        {app.tuitionStatus === 'Hired' && app.status === 'Accepted' && (
                                            <span className="badge badge-warning">Accepted (Awaiting Payment)</span>
                                        )}
                                        {app.tuitionStatus === 'Paid' && app.status === 'Paid-Confirmed' && (
                                            <button 
                                                className="btn btn-info btn-sm text-white" 
                                                onClick={() => fetchContactInfo(app.tuitionId)}
                                                title="View Tutor Contact Details"
                                            >
                                                <FaUserGraduate /> View Contact
                                            </button>
                                        )}
                                        {(app.tuitionStatus !== 'Approved' && app.tuitionStatus !== 'Hired' && app.tuitionStatus !== 'Paid') && (
                                            <span className="badge badge-warning">Post Not Live Yet</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- Payment Modal --- */}
            <dialog id="payment_modal" className="modal">
                <div className="modal-box w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg mb-4">Finalize Hiring and Pay Service Fee</h3>
                    
                    {selectedApplicationForPayment ? (
                        <PaymentPage 
                            tuition={{
                                applicationId: selectedApplicationForPayment._id,
                                tutorName: selectedApplicationForPayment.tutorName,
                                expectedSalary: selectedApplicationForPayment.expectedSalary,
                                tuitionSubject: selectedApplicationForPayment.tuitionSubject,
                                tuitionClass: selectedApplicationForPayment.tuitionClass
                            }}
                            // Callback to close modal and refresh list
                            onClose={(success) => {
                                document.getElementById('payment_modal').close();
                                setSelectedApplicationForPayment(null);
                                if(success) {
                                    fetchAppliedTutors(); // Refresh the list if payment was successful
                                }
                            }}
                        />
                    ) : (
                        <LoadingPage /> 
                    )}
                    
                    {/* Close button for outside click */}
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedApplicationForPayment(null)}>close</button>
                    </form>
                </div>
            </dialog>

            {/* --- Contact Info Modal --- */}
            <dialog id="contact_modal" className="modal">
                <div className="modal-box w-11/12 max-w-sm">
                    <h3 className="font-bold text-lg text-success mb-4">🎉 Hired Tutor Contact Info</h3>
                    
                    {contactInfo ? (
                        <div className="space-y-3 p-4 border rounded-lg bg-base-100">
                            <p className="text-xl font-bold">{contactInfo.name}</p>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-primary"/> 
                                <span className="font-medium">{contactInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-primary"/> 
                                <span className="font-medium">{contactInfo.phone || 'N/A'}</span>
                            </div>
                            <p className="text-sm mt-3 text-gray-600">Please contact the tutor immediately to finalize the details.</p>
                        </div>
                    ) : (
                        <LoadingPage /> 
                    )}
                    
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AppliedTutors;