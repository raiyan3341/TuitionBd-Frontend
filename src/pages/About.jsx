import React from 'react';
import { FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaCheckCircle, FaUsers, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const features = [
        { 
            icon: <FaGraduationCap />, 
            title: "Quality Education", 
            desc: "Connecting students with verified, experienced tutors across all subjects.",
            color: "from-blue-500 to-cyan-400"
        },
        { 
            icon: <FaChalkboardTeacher />, 
            title: "Verified Tutors", 
            desc: "Every tutor undergoes a strict background and qualification check.",
            color: "from-purple-500 to-pink-500"
        },
        { 
            icon: <FaUsers />, 
            title: "Easy Matching", 
            desc: "Smart filters to find the perfect tutor based on your budget and location.",
            color: "from-orange-500 to-yellow-500"
        },
        { 
            icon: <FaShieldAlt />, 
            title: "Secure Payments", 
            desc: "100% secure transaction system ensuring transparency for both sides.",
            color: "from-green-500 to-teal-500"
        },
    ];

    return (
        <div className="bg-[#fdfdfd] min-h-screen overflow-hidden">
            <section className="relative py-20 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-100 rounded-full blur-[100px] opacity-50"></div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight"
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">E-Tuition BD</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
                    >
                        We are on a mission to revolutionize how students find guidance, making premium education accessible to every corner of Bangladesh.
                    </motion.p>
                </div>
            </section>
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-blue-600 rounded-[40px] rotate-3 scale-105 opacity-10"></div>
                        <div className="relative bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl"><FaLightbulb /></span> 
                                Our Vision
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                E-Tuition BD was founded on the belief that geography shouldn't limit learning. Every student deserves a mentor who understands their unique needs. 
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We aim to build the most trusted ecosystem where academic excellence meets professional tutoring, powered by transparency and technology.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-blue-600">10k+</h4>
                                    <p className="text-sm text-slate-400">Students</p>
                                </div>
                                <div className="divider divider-horizontal"></div>
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold text-purple-600">5k+</h4>
                                    <p className="text-sm text-slate-400">Verified Tutors</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl font-black text-slate-800">Why the platform <br/><span className="text-blue-600">matters to you?</span></h2>
                        <p className="text-slate-500 text-lg">
                            Traditional tuition finding is broken. We fixed it by bringing trust, security, and variety in one single dashboard.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                                <FaCheckCircle className="text-green-500 text-xl mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-800">Transparent Hiring</h4>
                                    <p className="text-slate-500">View tutor ratings, reviews, and history before you pay.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                                <FaCheckCircle className="text-green-500 text-xl mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-800">Direct Communication</h4>
                                    <p className="text-slate-500">Discuss requirements directly with tutors through our secure platform.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-slate-800 mb-16 underline decoration-blue-500/30 underline-offset-8">Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-[35px] shadow-xl hover:shadow-2xl transition-all border border-slate-100 group"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 px-6">
                <div className="container mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[50px] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                        <FaUserGraduate size={300} />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 relative z-10">Ready to start your journey?</h2>
                    <p className="text-blue-100 mb-10 text-lg relative z-10">Join thousands of students and tutors today.</p>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-slate-100 transition-all">Become a Tutor</button>
                        <button className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-yellow-300 transition-all">Find a Tutor</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;