import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../pages/Root/Root"; 
import TuitionListing from "../pages/TuitionListing"; 
import Tutors from "../pages/Tutors"; 
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedHome from "../pages/Dashboard/RoleBasedHome"; 
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTuitions from "../pages/Dashboard/Admin/ManageTuitions";
import RevenueHistory from "../pages/RevenueHistory";
import StudentHome from "../pages/Dashboard/Student/StudentHome";
import PostTuition from "../pages/Dashboard/Student/PostTuition";
import MyTuitionPosts from "../pages/Dashboard/Student/MyTuitionPosts";
import AppliedTutors from "../pages/AppliedTutors"; 
import TutorHome from "../pages/TutorHome";
import MyApplications from "../pages/MyApplications"; 
import MyHiredTuitions from "../pages/MyHiredTuitions"; 
import DashboardLayout from "../Layout/DashboardLayout";
import AboutUs from "../pages/About";
import ContactUs from "../pages/Contact";
import ProfileSettings from "../pages/Dashboard/ProfileSettings";
import PostNewTuition from "../pages/Dashboard/Student/PostTuition";


export const router = createBrowserRouter([
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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
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
  

  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
            path: "profile-settings", 
            element: <ProfileSettings />
        },
      {
        index: true, 
        element: <RoleBasedHome /> 
      },
      
      {
        path: 'manage-users',
        element: <ManageUsers /> 
      },
      {
        path: 'manage-tuitions',
        element: <ManageTuitions />
      },
      {
        path: 'revenue-history',
        element: <RevenueHistory />
      },
      {
        path: 'post-tuition',
        element: <PostTuition />
      },
      {
      path: 'post-new-tuition', 
      element: <PostNewTuition />
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
      path: 'student-home',
      element: <StudentHome />
    },
      
      {
        path: 'my-applications',
        element: <MyApplications /> 
      },
      {
        path: 'my-hired-tuitions',
        element: <MyHiredTuitions /> 
      },
      
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