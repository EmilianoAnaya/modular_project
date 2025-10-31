import { Routes, Route, useLocation } from 'react-router-dom';
import "./styles/Dashboard.css"
import { useState } from 'react';

import MainNavbar from './components/Main_Navbar/MainNavbar';
import PatientDashboardNav from './components/Patient_Dashboard_Nav/PatientDashboardNav';
import PatientDashboardHome from './components/Patient_Dashboard/PatientDashboardHome';
import PatientDashboardProfile from './components/Patient_Dashboard/PatientDashboardProfile';
import PatientDashboardHistory from './components/Patient_Dashboard/PatientDashboardHistory';
import { PatientProvider } from './context/PatientProvider';

function PatientDashboard() {
    const currentPage = useLocation()
    const isProfilePage = currentPage.pathname === "/PatientDashboard/Profile"

    return (
        <PatientProvider>
            <MainNavbar/>
            <div className="main-container">
                <PatientDashboardNav />
                <div id="dashboard-content" className={isProfilePage ? 'dash-no-padding' : ''}>
                    <Routes>
                        <Route path="/" element={<PatientDashboardHome />} />
                        <Route path="Profile" element={<PatientDashboardProfile />} />
                        <Route path="History/*" element={<PatientDashboardHistory />} />
                    </Routes>
                </div>
            </div>
        </PatientProvider>
    )
}

export default PatientDashboard