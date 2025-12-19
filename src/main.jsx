// src/main.jsx (Your project's entry point file)
import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. App.css বা index.css ইমপোর্ট করুন
import './index.css'; 
// 2. React Router থেকে RouterProvider ইমপোর্ট করুন
import { RouterProvider } from 'react-router-dom';
// 3. Routes.jsx ফাইল থেকে router অবজেক্টটি ইমপোর্ট করুন
import { router } from './Routes/Routes.jsx'; 
import Authprovider from './components/context/Authprovider.jsx';

// 4. AuthProvider ইমপোর্ট করুন (যদি আপনি useAuth ব্যবহার করে থাকেন)



ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode রেন্ডারিং এর জন্য
  <React.StrictMode>
    {/* 5. AuthProvider দিয়ে পুরো অ্যাপ্লিকেশন র‍্যাপ করুন */}
    <Authprovider>
        {/* 6. RouterProvider এর মাধ্যমে রাউটিং কনফিগারেশন সরবরাহ করুন */}
        <RouterProvider router={router} /> 
    </Authprovider>
  </React.StrictMode>,
);


//admin@tms.com
//Admin@123
