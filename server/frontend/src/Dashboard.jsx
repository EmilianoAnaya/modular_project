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

    const [hourSelected, setHourSelected] = useState(null)

    const availableHours = []
    for (let i = 7; i < 21; i++){
      availableHours.push(i.toString().padStart(2,"0") + ":00")
    }

    const [appointmentsStatus, setAppointmentsStatus] = useState(
    Object.fromEntries(availableHours.map(hour => [hour, "pending"]))
    );

    const handleAccept = () => {
      if (hourSelected) {
        setAppointmentsStatus(prev => ({
          ...prev,
          [hourSelected]: "accepted"
        }));
      }
    };

    const handleCancel = () => {
      if (hourSelected) {
        setAppointmentsStatus(prev => ({
          ...prev,
          [hourSelected]: "canceled"
        }));
      }
    };

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
                      <span>
                        Hour Selected: <b>{ hourSelected == null ? "None, select an hour" : hourSelected }</b>
                      </span>
                      <div className='dashboard-window-patient-data'>
                        <p>Patient Name</p>
                        <div className='basic-container'>
                          <span>Barocio Rizo Santino Alexandro</span>
                        </div>
                      </div>

                      <div className='dashboard-window-buttons-cont'>
                        <button className='basic-button'
                          onClick={handleAccept}
                          disabled={!hourSelected}
                        >
                          Accept appointment
                        </button>
                        <button className='basic-button'
                          onClick={handleCancel}
                          disabled={!hourSelected}
                        >
                          Cancel appointment
                        </button>
                      </div>
                    </div>

                    <div className='basic-container appointment-hours-dashboard'>
                      {availableHours.map((hour, index) => {
                        const status = appointmentsStatus[hour];

                        let iconSrc = '/assets/contact-round.svg';
                        if (status === "accepted") iconSrc = '/assets/check.svg';
                        if (status === "canceled") iconSrc = '/assets/cross.svg';

                        return (
                          <div
                            key={index}
                            className={`appointment-hour-row ${index % 2 === 0 ? "pair" : ""} ${hourSelected === hour ? "selected-hour" : ""}`}
                            onClick={() => setHourSelected(hour)}
                          >
                            <p>{hour}</p>
                            <img src={iconSrc} alt={status} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </WindowContainer>
            </div>


        </>
    )
}

export default Dashboard