import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { FaUserCircle, FaThLarge, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const BASE_URL = "https://tuition-bd-backend.vercel.app";

  useEffect(() => {
    if (user?.email) {
      axios.get(`${BASE_URL}/users/${user.email}`)
        .then(res => {
          setDbUser(res.data);
          setRole(res.data.role);
        })
        .catch(err => console.error("Navbar DB error:", err));
    }
  }, [user]);

  const getDashboardPath = () => {
    if (!role) return "/dashboard";
    if (role === "Admin") return "/dashboard/admin-home";
    if (role === "Tutor") return "/dashboard/tutor-home";
    return "/dashboard/student-home";
  };

  const navLinks = (
    <>
      {[
        { name: "Home", path: "/" },
        { name: "Tuitions", path: "/tuitions" },
        { name: "Tutors", path: "/tutors" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ].map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `relative pb-1 font-bold transition-all duration-300 hover:text-primary ${
                isActive ? "text-primary" : "text-slate-600"
              } group`
            }
          >
            {link.name}
            <span
              className={({ isActive }) =>
                `absolute left-0 bottom-0 h-[3px] bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`
              }
            >
                {({ isActive }) => (
                   <span className={`absolute left-0 bottom-0 h-[3px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                )}
            </span>
            
            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-primary transition-all duration-300 group-[.active]:w-full group-hover:w-full"></span>
          </NavLink>
        </li>
      ))}
    </>
  );

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow px-4 md:px-10 h-20">
        <div className="flex-1 animate-pulse bg-gray-200 h-8 rounded-md w-32"></div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-[100] px-2 md:px-10 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars className="text-xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-xl bg-base-100 rounded-box w-60 border border-base-200 gap-2"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-black text-primary tracking-tighter">
          E-TUITION<span className="text-slate-700">BD</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 items-center">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={dbUser?.photo || user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[100] p-4 shadow-2xl bg-base-100 rounded-[24px] w-72 border border-slate-100"
            >
              <div className="px-3 pb-3 mb-3 border-b border-slate-100">
                <p className="font-black text-slate-800 text-lg truncate">
                  {dbUser?.name || user?.displayName}
                </p>
                <div className="mt-2 text-[10px] badge badge-primary font-bold uppercase tracking-widest p-2">
                    {role || "Student"}
                </div>
              </div>
              <li>
                <Link to={getDashboardPath()} className="flex items-center gap-3 py-3 px-4 hover:bg-primary hover:text-white transition-all rounded-xl group">
                  <FaThLarge className="text-lg" />
                  <span className="font-bold">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile-settings" className="flex items-center gap-3 py-3 px-4 hover:bg-primary hover:text-white transition-all rounded-xl group">
                  <FaUserCircle className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Settings</span>
                </Link>
              </li>

              <div className="divider my-1 before:bg-slate-500 after:bg-slate-500"></div>
              <li>
                <button onClick={logOut} className="flex items-center gap-3 py-3 px-4 text-error hover:bg-error hover:text-white transition-all rounded-xl">
                  <FaSignOutAlt className="text-lg" />
                  <span className="font-bold">Logout Account</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-outline btn-primary btn-sm rounded-xl font-bold">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm rounded-xl text-white font-bold hidden md:flex shadow-lg shadow-blue-100">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;