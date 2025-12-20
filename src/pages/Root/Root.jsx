import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollToTopOnPathChange from '../../components/ScrollToTop';

const Root = () => {
    return (
        <div>
            <ScrollToTopOnPathChange></ScrollToTopOnPathChange>
            <Navbar></Navbar> 
            <div className="min-h-[calc(100vh-300px)]"> 
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;