import { Routes, Route, useLocation } from 'react-router-dom';
import "./styles/Dashboard.css"

import MainNavbar from './components/Main_Navbar/MainNavbar';
import DashboardNav from './components/Dash_Navbar/DashboardNav';
import DashboardHome from './components/Dash_Home/DashboardHome';
import DashboardProfile from './components/Dash_Profile/DashboardProfile';
import DashboardPatients from './components/Dash_Patients/DashboardPatients';

import WindowContainer from './components/Window_Container/WindowContainer';
import { useState } from 'react';

function Dashboard() {
    const currentPage = useLocation()
    const isProfilePage = currentPage.pathname === "/Dashboard/Profile"

    const [windowVisibility, setWindowVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState ({
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      day : null
    })

    return (
        <>
            <MainNavbar/>
            <div className="main-container">
                <DashboardNav />
                <div id="dashboard-content" className={isProfilePage ? 'dash-no-padding' : ''}>
                    <Routes>
                        <Route path="/" element={<DashboardHome
                            setWindowVisibility={setWindowVisibility}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                         />} />
                        <Route path="Profile" element={<DashboardProfile />} />
                        <Route path="Patients" element={<DashboardPatients />} />
                    </Routes>
                </div>

                <WindowContainer windowTitle={`Appointments - ${selectedDate.day}/${selectedDate.month+1}/${selectedDate.year}`}
                  showWindow={[windowVisibility, setWindowVisibility]}
                  styleContainer='appointment-dashboard-window'
                >
                  <div className='dashboard-window'>
                    <div className='dashboard-window-entries'>
                      hello
                    </div>

                    <div className='basic-container appointment-hours-cont'>

                    </div>
                  </div>

                </WindowContainer>
            </div>


        </>
    )
}

export default Dashboard