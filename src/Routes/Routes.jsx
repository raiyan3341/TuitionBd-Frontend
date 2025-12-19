import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../pages/Root/Root"; 

// Public Components
import TuitionListing from "../pages/TuitionListing"; 
import Tutors from "../pages/Tutors"; 

// Layouts & Protection

import PrivateRoute from "../components/PrivateRoute";
import RoleBasedHome from "../pages/Dashboard/RoleBasedHome"; 

// Dashboard Components
// Admin
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTuitions from "../pages/Dashboard/Admin/ManageTuitions";
import RevenueHistory from "../pages/RevenueHistory"; // 💡 NEW: রেভিনিউ হিস্টরি কম্পোনেন্ট
// Student
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import PostTuition from "../pages/Dashboard/Student/PostTuition";
import MyTuitionPosts from "../pages/Dashboard/Student/MyTuitionPosts";
import AppliedTutors from "../pages/AppliedTutors"; 
// Tutor
import TutorHome from "../pages/TutorHome";
import MyApplications from "../pages/MyApplications"; 
import MyHiredTuitions from "../pages/MyHiredTuitions"; 
import DashboardLayout from "../Layout/DashboardLayout";
import AboutUs from "../pages/About";
import ContactUs from "../pages/Contact";
import ProfileSettings from "../pages/Dashboard/ProfileSettings";
import PostNewTuition from "../pages/Dashboard/Student/PostTuition";


export const router = createBrowserRouter([
  // 1. Main Public Layout
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about", // 👈 New Route
        element: <AboutUs />,
      },
      {
        path: "/contact", // 👈 New Route
        element: <ContactUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "tuitions", 
        element: <TuitionListing />,
      },
      {
        path: "tutors", 
        element: <Tutors />
      },
    ]
  },
  
  // 2. Dashboard Layout (Protected)
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      
      // 🎯 ড্যাশবোর্ডের প্রধান পেজ (/dashboard)
      {
            path: "profile-settings", 
            element: <ProfileSettings />
        },
      {
        index: true, 
        element: <RoleBasedHome /> 
      },
      

      // --- Admin Routes ---
      {
        path: 'manage-users',
        element: <ManageUsers /> 
      },
      {
        path: 'manage-tuitions',
        element: <ManageTuitions />
      },
      {
        path: 'revenue-history', // 💡 NEW: Admin Revenue History Route
        element: <RevenueHistory />
      },

      // --- Student Routes ---
      {
        path: 'post-tuition',
        element: <PostTuition />
      },
      {
      path: 'post-new-tuition', // 💡 খেয়াল করুন এখানে শুরুতে / দেওয়ার দরকার নেই
      element: <PostNewTuition /> // আপনার তৈরি করা কম্পোনেন্ট
    },
      {
        path: 'my-tuition-posts',
        element: <MyTuitionPosts />
      },
      {
        path: 'applied-tutors',
        element: <AppliedTutors />
      },
      {
      path: 'student-home', // এটি অ্যাক্সেস করতে হবে /dashboard/student-home লিখে
      element: <StudentHome />
    },
      
      // --- Tutor Routes ---
      {
        path: 'my-applications',
        element: <MyApplications /> 
      },
      {
        path: 'my-hired-tuitions',
        element: <MyHiredTuitions /> 
      },
      
      // Role-specific home routes
      {
        path: 'admin-home',
        element: <AdminHome /> 
      },
      {
        path: 'student-home',
        element: <StudentHome /> 
      },
      {
        path: 'tutor-home',
        element: <TutorHome /> 
      },
    ]
  },
]);