import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { FaUserCircle, FaThLarge, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const BASE_URL = "http://localhost:3000";

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
      <li>
        <NavLink to="/" className="flex items-center"> Home</NavLink>
      </li>
      <li>
        <NavLink to="/tuitions" className="flex items-center">Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/tutors" className="flex items-center">Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/about" className="flex items-center"> About</NavLink>
      </li>
      <li>
   <NavLink to="/contact" className="flex items-center">Contact  </NavLink>
      </li>
    </>
  );

  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow">
        <div className="container mx-auto text-center">
          Loading Navigation...
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 flex items-center">
      <div className="container mx-auto flex items-center">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden flex items-center">
              ☰
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold text-primary flex items-center">E-TuitionBD</Link>
        </div>

        <div className="navbar-center hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1 flex items-center">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
  {user ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar online transition-all hover:scale-105"
      >
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            alt="User Profile"
            src={
              dbUser?.photo || user?.photoURL || "https://ui-avatars.com/api/?name=User"
            }
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-4 z-[10] p-3 shadow-2xl bg-base-100 rounded-xl w-64 border border-base-200">

        <div className="px-4 py-3 mb-2 border-b border-base-200">
          <p className="text-sm font-bold text-gray-800 truncate">
            {dbUser?.name || user?.displayName || "User Name"}
          </p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          <div className="mt-2">
             <span className="badge badge-primary badge-sm text-xs font-semibold py-2">
                {role || "Guest"}
             </span>
          </div>
        </div>
        <li>
          <Link
            to={getDashboardPath()}
            className="flex items-center gap-3 py-3 px-4 hover:bg-primary hover:text-white transition-colors rounded-lg group"
          >
            <FaThLarge className="text-lg group-hover:text-white" />
            <span className="font-medium">Dashboard Overview</span>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/profile-settings"
            className="flex items-center gap-3 py-3 px-4 hover:bg-primary hover:text-white transition-colors rounded-lg group"
          >
            <FaUserCircle className="text-lg group-hover:text-white" />
            <span className="font-medium">Profile Settings</span>
          </Link>
        </li>

        <div className="divider my-1"></div>

        <li>
          <button 
            onClick={logOut}
            className="flex items-center gap-3 py-3 px-4 text-error hover:bg-error hover:text-white transition-colors rounded-lg group"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout Account</span>
          </button>
        </li>
      </ul>
    </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-outline btn-primary flex items-center">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary hidden md:flex items-center">
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
