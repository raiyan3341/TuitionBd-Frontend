import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaComments, FaPaperPlane, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for reaching out. We will get back to you shortly.',
            icon: 'success',
            background: '#fff',
            color: '#1f2937',
            confirmButtonColor: '#3b82f6',
            confirmButtonText: 'Great!'
        });
        e.target.reset();
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 py-20 px-6 rounded-b-[60px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
                        <circle cx="10" cy="20" r="2" />
                        <circle cx="90" cy="80" r="3" />
                        <circle cx="50" cy="50" r="1" />
                    </svg>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto text-center relative z-10" >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Get In <span className="text-yellow-400">Touch</span></h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        Have questions about hiring a tutor or posting a tuition? 
                        Our team is ready to support your educational journey.
                    </p>
                </motion.div>
            </section>

            <div className="container mx-auto p-6 lg:p-12 -mt-20 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-white">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <span className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><FaComments /></span> 
                                Send a Message
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-bold text-gray-500 uppercase text-xs tracking-widest">Full Name</label>
                                    <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full rounded-2xl bg-gray-50 focus:border-blue-500 h-14" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold text-gray-500 uppercase text-xs tracking-widest">Email Address</label>
                                    <input type="email" name="email" placeholder="john@example.com" className="input input-bordered w-full rounded-2xl bg-gray-50 focus:border-blue-500 h-14" required />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label font-bold text-gray-500 uppercase text-xs tracking-widest">Subject</label>
                                <input type="text" name="subject" placeholder="How can we help?" className="input input-bordered w-full rounded-2xl bg-gray-50 focus:border-blue-500 h-14" required />
                            </div>

                            <div className="form-control">
                                <label className="label font-bold text-gray-500 uppercase text-xs tracking-widest">Message</label>
                                <textarea name="message" placeholder="Type your message here..." className="textarea textarea-bordered h-40 w-full rounded-2xl bg-gray-50 focus:border-blue-500 p-4" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full h-16 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Quick Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white rounded-3xl shadow-lg border-b-4 border-blue-500 group hover:bg-blue-500 transition-all duration-300">
                                <FaPhoneAlt className="text-3xl text-blue-500 mb-4 group-hover:text-white" />
                                <h3 className="font-bold text-gray-800 group-hover:text-white">Call Us</h3>
                                <p className="text-gray-500 group-hover:text-blue-50">+880 1XXXXXXXXX</p>
                            </div>

                            <div className="p-6 bg-white rounded-3xl shadow-lg border-b-4 border-purple-500 group hover:bg-purple-500 transition-all duration-300">
                                <FaEnvelope className="text-3xl text-purple-500 mb-4 group-hover:text-white" />
                                <h3 className="font-bold text-gray-800 group-hover:text-white">Email Us</h3>
                                <p className="text-gray-500 group-hover:text-purple-50">support@etuitionbd.com</p>
                            </div>

                            <div className="p-6 bg-white rounded-3xl shadow-lg border-b-4 border-teal-500 group hover:bg-teal-500 transition-all duration-300">
                                <FaMapMarkerAlt className="text-3xl text-teal-500 mb-4 group-hover:text-white" />
                                <h3 className="font-bold text-gray-800 group-hover:text-white">Our Office</h3>
                                <p className="text-gray-500 group-hover:text-teal-50">Dhaka, Bangladesh</p>
                            </div>

                            <div className="p-6 bg-white rounded-3xl shadow-lg border-b-4 border-orange-500 group hover:bg-orange-500 transition-all duration-300">
                                <FaClock className="text-3xl text-orange-500 mb-4 group-hover:text-white" />
                                <h3 className="font-bold text-gray-800 group-hover:text-white">Office Hours</h3>
                                <p className="text-gray-500 group-hover:text-orange-50">Sat - Thu: 10AM - 8PM</p>
                            </div>
                        </div>
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl h-64 border-8 border-white">
                            <iframe 
                                title="Map"
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.2729518163!2d90.375862!3d23.744146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b1e4a646d5%3A0x7e84179377464a!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;