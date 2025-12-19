import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useAuth from '../hooks/useAuth';
import LoadingPage from '../components/LoadingPage';

const RevenueHistory = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ইউজার ডাটা না আসা পর্যন্ত অপেক্ষা করবে
        if (user?.email) {
            setLoading(true); // লোডিং শুরু
            axios.get(`http://localhost:3000/revenue-history?email=${user.email}`)
                .then(res => {
                    setHistory(res.data);
                })
                .catch(err => {
                    console.error("Fetch Error:", err);
                })
                .finally(() => {
                    // ডাটা আসুক বা এরর হোক, লোডিং বন্ধ হবেই
                    setLoading(false); 
                });
        } else if (!user) {
            // যদি ইউজার লগইন না থাকে
            setLoading(false);
        }
    }, [user]);

    // লোডিং চেক
    if (loading) return <LoadingPage />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Revenue History</h2>
            {history.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>${item.price}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No revenue data found.</p>
            )}
        </div>
    );
};

export default RevenueHistory;