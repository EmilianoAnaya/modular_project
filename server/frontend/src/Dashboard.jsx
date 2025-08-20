import { Routes, Route, useLocation } from 'react-router-dom';

import "./styles/Dashboard.css"
import MainNavbar from './components/Main_Navbar/MainNavbar';
import DashboardNav from './components/Dash_Navbar/DashboardNav';
import DashboardHome from './components/Dash_Home/DashboardHome';
import DashboardProfile from './components/Dash_Profile/DashboardProfile';
import DashboardPatients from './components/Dash_Patients/DashboardPatients';

function Dashboard() {
    const currentPage = useLocation()
    const isProfilePage = currentPage.pathname === "/Dashboard/Profile"

    return (
        <>
            <MainNavbar/>
            <div className="main-container">
                <DashboardNav />
                <div id="dashboard-content" className={isProfilePage ? 'dash-no-padding' : ''}>
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="Profile" element={<DashboardProfile />} />
                        <Route path="Patients" element={<DashboardPatients />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashboard