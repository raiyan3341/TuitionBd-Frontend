// src/layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import LoadingPage from "../components/LoadingPage";
import useAuth from "../hooks/useAuth";

import {
  FaGraduationCap, FaChalkboard, FaUserShield, FaPlusCircle,
  FaCog, FaSignOutAlt, FaHome, FaChartLine, FaBars, FaBell
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const location = useLocation();

  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    if (user?.email) {
      setUserLoading(true);
      axios.get(`${BASE_URL}/users/${user.email}`)
        .then(res => {
          setRole(res.data.role);
          setDbUser(res.data);
          setUserLoading(false);
        })
        .catch(() => {
          setRole(null);
          setUserLoading(false);
        });
    }
  }, [user]);

  if (loading || userLoading) return <LoadingPage />;

  // Dynamic Navigation Generator
  const getNavLinks = () => {
    if (role === "Student") return [
      { to: "student-home", label: "Dashboard", icon: <FaHome /> },
      { to: "post-tuition", label: "Post Tuition", icon: <FaPlusCircle /> },
      { to: "my-tuition-posts", label: "My Posts", icon: <FaGraduationCap /> },
      { to: "applied-tutors", label: "Applied Tutors", icon: <FaChalkboard /> },
    ];
    if (role === "Tutor") return [
      { to: "tutor-home", label: "Dashboard", icon: <FaHome /> },
      { to: "my-applications", label: "Applications", icon: <FaChalkboard /> },
      { to: "my-hired-tuitions", label: "Hired Jobs", icon: <FaGraduationCap /> },
    ];
    if (role === "Admin") return [
      { to: "admin-home", label: "Admin Panel", icon: <FaHome /> },
      { to: "manage-users", label: "Users List", icon: <FaUserShield /> },
      { to: "manage-tuitions", label: "Tuition Hub", icon: <FaChalkboard /> },
      { to: "revenue-history", label: "Analytics", icon: <FaChartLine /> },
    ];
    return [];
  };

  return (
    <div className="drawer lg:drawer-open bg-[#F8FAFC]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content --- */}
      <div className="drawer-content flex flex-col min-h-screen">
        
        {/* Top Navbar for Dashboard */}
        <div className="sticky top-0 z-10 w-full flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 lg:hidden">
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">TMS</Link>
          <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button">
            <FaBars size={20} />
          </label>
        </div>

        {/* Dynamic Page Header (Desktop) */}
        <div className="hidden lg:flex items-center justify-between px-10 py-6 bg-white border-b border-slate-100">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Welcome back, {dbUser?.name?.split(' ')[0] || "User"}!
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Role: {role}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle text-slate-400 hover:text-blue-600 bg-slate-50 border-none">
              <FaBell />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
               <img src={dbUser?.photo || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="" />
            </div>
          </div>
        </div>

        {/* Main Viewport */}
        <main className="p-6 md:p-10 flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={location.pathname}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* --- Sidebar --- */}
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        
        <div className="w-80 min-h-full bg-slate-900 text-slate-300 flex flex-col">
          
          {/* Sidebar Logo */}
          <div className="p-8 pb-4">
            <Link to="/" className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm italic">T</div>
              TMS<span className="text-blue-500">.</span>
            </Link>
          </div>

          {/* Profile Card inside Sidebar */}
          <div className="px-6 py-8">
            <div className="bg-white/5 rounded-[30px] p-6 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
              <div className="flex flex-col items-center relative z-10 text-center">
                <div className="avatar mb-4">
                  <div className="w-20 rounded-2xl ring ring-blue-600/20 ring-offset-slate-900 ring-offset-4 overflow-hidden">
                    <img src={dbUser?.photo || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="Profile" />
                  </div>
                </div>
                <h2 className="text-lg font-black text-white tracking-tight">{dbUser?.name || "Member"}</h2>
                <span className={`mt-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  role === "Admin" ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-400"
                }`}>
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-grow px-4 space-y-2">
            <p className="px-6 text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-4">Main Menu</p>
            {getNavLinks().map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                    isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "hover:bg-white/5 text-slate-400 hover:text-slate-100"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}

            <div className="pt-8 pb-4">
              <p className="px-6 text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-4">Preferences</p>
              <NavLink to="profile-settings" className={({isActive}) => `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5"}`}>
                <FaCog size={18} /> <span className="text-sm font-bold">Settings</span>
              </NavLink>
              <Link to="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 transition-all mt-1">
                <FaHome size={18} /> <span className="text-sm font-bold">Public Home</span>
              </Link>
            </div>
          </nav>

          {/* Logout at Bottom */}
          <div className="p-6 mt-auto">
            <button 
              onClick={logOut}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all duration-300 font-black text-sm uppercase tracking-widest"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;