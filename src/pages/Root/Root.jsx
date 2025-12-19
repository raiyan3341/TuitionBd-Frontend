// src/pages/Root/Root.jsx (FIXED)
import React from 'react';
import { Outlet } from 'react-router-dom'; // 👈 Needed for rendering child routes
import Navbar from '../../components/Navbar'; // 👈 Import Navbar
import Footer from '../../components/Footer'; // 👈 Import Footer

const Root = () => {
    return (
        <div>
            <Navbar></Navbar> 
            <div className="min-h-[calc(100vh-300px)]"> 
                {/* Added min-height to ensure content fills the screen */}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;