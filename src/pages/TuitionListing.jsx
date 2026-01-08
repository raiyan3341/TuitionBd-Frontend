import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaPaperPlane, FaTimes, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import LoadingPage from '../components/LoadingPage';
import TuitionCard from '../components/TuitionCard';
import useAuth from '../hooks/useAuth';

const TuitionListing = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [selectedTuition, setSelectedTuition] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    const BASE_URL = 'https://tuition-bd-backend.vercel.app';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tuitionsRes = await axios.get(`${BASE_URL}/tuitions/approved`);
                const data = Array.isArray(tuitionsRes.data) ? tuitionsRes.data : tuitionsRes.data.tuitions;
                setTuitions(data || []);

                if (user?.email) {
                    const userRes = await axios.get(`${BASE_URL}/users/${user.email}`);
                    setRole(userRes.data?.role || null);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user?.email]);

    const filteredTuitions = useMemo(() => {
        let result = tuitions.filter((t) => {
            const matchesSubject = t.subject?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = selectedClass === "" || t.class?.includes(selectedClass);
            return matchesSubject && matchesClass;
        });


        if (sortBy === "salary") {
            result.sort((a, b) => (b.salary || 0) - (a.salary || 0));
        } else {
            result.sort((a, b) => new Date(b.createdAt || b.appliedAt) - new Date(a.createdAt || a.appliedAt));
        }

        return result;
    }, [tuitions, searchQuery, selectedClass, sortBy]);

    const handleApplyClick = useCallback((tuitionData) => {
        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please login as a Tutor to apply.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        if (role?.toLowerCase() !== 'tutor') {
            Swal.fire({
                title: 'Access Denied',
                text: 'Only registered Tutors can apply for these posts.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
            });
            return;
        }

        setSelectedTuition(tuitionData);
        const modal = document.getElementById('apply_modal');
        if (modal) modal.showModal();
        
    }, [user, role, navigate, location]);

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const applicationData = {
            tuitionId: selectedTuition?._id,
            tutorEmail: user?.email,
            tutorName: user?.displayName,
            studentEmail: selectedTuition?.studentEmail,
            subject: selectedTuition?.subject,
            expectedSalary: form.expectedSalary.value,
            tutorMessage: form.tutorMessage.value,
            status: 'pending',
            appliedAt: new Date()
        };

        try {
            const res = await axios.post(`${BASE_URL}/applications`, applicationData);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Your application has been sent.', 'success');
                document.getElementById('apply_modal').close();
                form.reset();
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to submit application.', 'error');
        }
    };

    if (loading || authLoading) return <LoadingPage />;

    return (
        <div className="bg-[#fcfcfd] min-h-screen">
            <section className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-900 overflow-hidden rounded-b-[60px] md:rounded-b-[100px] shadow-2xl">
                <div className="container mx-auto relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left max-w-2xl">
                            <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 rounded-2xl text-xs font-black uppercase tracking-[3px] mb-6">
                                Marketplace
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                                Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Teaching Job</span>
                            </h1>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full lg:max-w-md bg-white/5 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 shadow-3xl">
                            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                                <FaFilter className="text-blue-400 text-sm" /> Quick Discovery
                            </h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-5 top-5 text-slate-400" />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search Subject (e.g. Physics)" 
                                        className="w-full h-16 pl-14 pr-4 rounded-2xl bg-white text-slate-900 shadow-xl focus:ring-4 focus:ring-blue-500/20 border-none transition-all outline-none font-medium"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <select 
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="select select-bordered rounded-2xl bg-white text-slate-700 h-14 border-none shadow-md font-bold text-xs"
                                    >
                                        <option value="">All Classes</option>
                                        <option value="Class 1-8">Class 1-8</option>
                                        <option value="Class 9-10">Class 9-10</option>
                                        <option value="HSC">HSC</option>
                                        <option value="Admission">Admission</option>
                                    </select>
                                    <button className="btn bg-blue-600 hover:bg-blue-700 border-none rounded-2xl h-14 text-white font-black shadow-lg">
                                        Active Search
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 mt-10 relative pb-20">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-800">Latest <span className="text-blue-600">Postings</span></h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Showing {filteredTuitions.length} results</p>
                    </div>
                    <div className="flex gap-2">
                         <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1">
                            <button 
                                onClick={() => setSortBy("newest")}
                                className={`btn btn-sm rounded-xl font-black ${sortBy === 'newest' ? 'bg-blue-600 text-white' : 'btn-ghost text-slate-400'}`}
                            >Newest</button>
                            <button 
                                onClick={() => setSortBy("salary")}
                                className={`btn btn-sm rounded-xl font-black ${sortBy === 'salary' ? 'bg-blue-600 text-white' : 'btn-ghost text-slate-400'}`}
                            >Salary</button>
                         </div>
                         {(searchQuery || selectedClass) && (
                             <button onClick={() => {setSearchQuery(""); setSelectedClass("")}} className="text-red-500 text-xs font-bold hover:underline">Clear All</button>
                         )}
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    {filteredTuitions.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center bg-white p-24 rounded-[60px] shadow-sm border border-slate-100">
                            <h3 className="text-3xl font-black text-slate-300 tracking-tighter uppercase">No Matching Tuitions Found</h3>
                        </motion.div>
                    ) : (
                        <motion.div key="grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {filteredTuitions.map((item) => (
                                <TuitionCard key={item._id} tuition={item} onApplyClick={handleApplyClick} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <dialog id="apply_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-xl">
                <div className="modal-box bg-white p-0 rounded-[40px] overflow-hidden max-w-xl border-none shadow-3xl">
                    <div className="bg-slate-900 p-10 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <button 
                            onClick={() => document.getElementById('apply_modal').close()}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10">
                            <FaTimes />
                        </button>
                        <div className="relative z-10">
                            <span className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Direct Application</span>
                            <h3 className="text-3xl font-black flex items-center gap-3">
                                <FaPaperPlane className="text-blue-400" /> Apply Now
                            </h3>
                            <p className="text-slate-400 mt-2 font-medium">Position: <span className="text-white">{selectedTuition?.subject}</span></p>
                        </div>
                    </div>
                    <form onSubmit={handleApplySubmit} className="p-10 space-y-8 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Expected Salary</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-4 text-slate-400 font-bold">৳</span>
                                    <input 
                                        type="number" 
                                        name="expectedSalary" 
                                        className="w-full h-14 pl-10 pr-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white transition-all outline-none font-black text-slate-800"
                                        placeholder="5000"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Days / Week</label>
                                <div className="w-full h-14 flex items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-500">
                                    {selectedTuition?.daysPerWeek || "3 Days"}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Letter</label>
                            <textarea 
                                name="tutorMessage" 
                                className="w-full h-40 rounded-3xl bg-slate-50 border-2 border-slate-50 focus:border-blue-500 focus:bg-white transition-all outline-none p-6 font-medium text-slate-700 leading-relaxed"
                                placeholder="Describe your experience and why you're a good fit..."
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="group relative w-full h-16 bg-blue-600 hover:bg-slate-900 rounded-2xl text-white font-black text-lg transition-all overflow-hidden shadow-2xl shadow-blue-200">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Submit Application <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

const FaArrowRight = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
);

export default TuitionListing;