import { Routes, Route, useLocation } from 'react-router-dom';
import "./styles/Dashboard.css"
import { useState, useEffect } from 'react';

import MainNavbar from './components/Main_Navbar/MainNavbar';
import PatientDashboardNav from './components/Patient_Dashboard_Nav/PatientDashboardNav';
import PatientDashboardHome from './components/Patient_Dashboard/PatientDashboardHome';
import PatientDashboardProfile from './components/Patient_Dashboard/PatientDashboardProfile';
import PatientDashboardHistory from './components/Patient_Dashboard/PatientDashboardHistory';
import WindowContainer from './components/Window_Container/WindowContainer';
import { PatientProvider } from './context/PatientProvider';
import { getApiUrl } from './config/api'
import API_CONFIG from './config/api'

function PatientDashboard() {
    const currentPage = useLocation()
    const isProfilePage = currentPage.pathname === "/PatientDashboard/Profile"

    const [windowVisibility, setWindowVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: null
    })
    const [hourSelected, setHourSelected] = useState(null)
    const [dayAppointments, setDayAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [patientId, setPatientId] = useState(null)

    const availableHours = []
    for (let i = 7; i < 21; i++) {
        availableHours.push(i.toString().padStart(2, "0") + ":00")
    }

    // Obtener patient_id al cargar
    useEffect(() => {
        loadPatientId()
    }, [])

    // Cargar citas cuando se abre la ventana
    useEffect(() => {
        if (windowVisibility && selectedDate.day && patientId) {
            setHourSelected(null)
            setSelectedAppointment(null)
            setDayAppointments([])
            loadDayAppointments()
        }
    }, [windowVisibility, selectedDate, patientId])

    // Limpiar datos cuando se cierra la ventana
    useEffect(() => {
        if (!windowVisibility) {
            setHourSelected(null)
            setSelectedAppointment(null)
            setDayAppointments([])
        }
    }, [windowVisibility])

    const loadPatientId = async () => {
        try {
            const storedPatientId = sessionStorage.getItem('selectedPatientId')
            if (storedPatientId) {
                setPatientId(storedPatientId)
            }
        } catch (error) {
            console.error('Error loading patient ID:', error)
        }
    }

    const loadDayAppointments = async () => {
        try {
            const dateStr = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS_BY_PATIENT}/${patientId}`)
            )
            const data = await response.json()

            if (response.ok) {
                // Filtrar citas del día seleccionado
                const filtered = data.appointments.filter(apt => {
                    const aptDate = new Date(apt.appointment_date)
                    return aptDate.getDate() === selectedDate.day &&
                           aptDate.getMonth() === selectedDate.month &&
                           aptDate.getFullYear() === selectedDate.year
                })
                setDayAppointments(filtered)
            }
        } catch (error) {
            console.error('Error loading day appointments:', error)
        }
    }

    const handleHourClick = (hour) => {
        const appointment = dayAppointments.find(apt => {
            const timeMatch = apt.appointment_date.match(/(\d{2}):(\d{2}):(\d{2})/)
            if (!timeMatch) return false
            const aptHour = `${timeMatch[1]}:${timeMatch[2]}`
            return aptHour === hour
        })

        if (!appointment) return

        setHourSelected(hour)
        setSelectedAppointment(appointment)
    }

    const getHourStatus = (hour) => {
        const appointment = dayAppointments.find(apt => {
            const timeMatch = apt.appointment_date.match(/(\d{2}):(\d{2}):(\d{2})/)
            if (!timeMatch) return false

            const aptHour = `${timeMatch[1]}:${timeMatch[2]}`
            return aptHour === hour
        })

        if (!appointment) return null
        return appointment.status
    }

    return (
        <PatientProvider>
            <MainNavbar/>
            <div className="main-container">
                <PatientDashboardNav />
                <div id="dashboard-content" className={isProfilePage ? 'dash-no-padding' : ''}>
                    <Routes>
                        <Route path="/" element={
                            <PatientDashboardHome 
                                setWindowVisibility={setWindowVisibility}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                        } />
                        <Route path="Profile" element={<PatientDashboardProfile />} />
                        <Route path="History/*" element={<PatientDashboardHistory />} />
                    </Routes>
                </div>

                {/* Modal de citas del día */}
                <WindowContainer 
                    windowTitle={`My Appointments - ${selectedDate.day}/${selectedDate.month+1}/${selectedDate.year}`}
                    showWindow={[windowVisibility, setWindowVisibility]}
                    styleContainer='appointment-dashboard-window'
                >
                    <div className='dashboard-window'>
                        <div className='dashboard-window-entries'>
                            <span>
                                Hour Selected: <b>{hourSelected == null ? "None, select an hour" : hourSelected}</b>
                            </span>

                            {selectedAppointment ? (
                                <>
                                    <div className='dashboard-window-patient-data'>
                                        <p>Doctor</p>
                                        <div className='basic-container'>
                                            <span>{selectedAppointment.doctor_name}</span>
                                        </div>
                                    </div>

                                    <div className='dashboard-window-patient-data'>
                                        <p>Reason</p>
                                        <div className='basic-container' style={{minHeight: '4em', padding: '1em'}}>
                                            <span>{selectedAppointment.reason || 'No reason provided'}</span>
                                        </div>
                                    </div>

                                    <div className='dashboard-window-patient-data'>
                                        <p>Status</p>
                                        <div className='basic-container' style={{padding: '1em', textAlign: 'center'}}>
                                            {selectedAppointment.status === 'Pending' && (
                                                <span style={{color: '#FFA500', fontWeight: 'bold', fontSize: '1.1em'}}>⏳ Pending Confirmation</span>
                                            )}
                                            {selectedAppointment.status === 'Completed' && (
                                                <span style={{color: 'green', fontWeight: 'bold', fontSize: '1.1em'}}>✓ Confirmed</span>
                                            )}
                                            {selectedAppointment.status === 'Canceled' && (
                                                <span style={{color: 'red', fontWeight: 'bold', fontSize: '1.1em'}}>✗ Canceled</span>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p style={{textAlign: 'center', color: '#666', fontStyle: 'italic', marginTop: '2em'}}>
                                    {hourSelected ? 'No appointment at this hour' : 'Select an hour to see appointment details'}
                                </p>
                            )}
                        </div>

                        <div className='basic-container appointment-hours-dashboard'>
                            {availableHours.map((hour, index) => {
                                const status = getHourStatus(hour)
                                const hasAppointment = status !== null

                                let iconSrc = '/assets/user-round-x.svg'
                                if (status === "Completed") iconSrc = '/assets/check.svg'
                                if (status === "Canceled") iconSrc = '/assets/cross.svg'
                                if (status === "Pending") iconSrc = '/assets/contact-round.svg'

                                return (
                                    <div
                                        key={index}
                                        className={`appointment-hour-row ${index % 2 === 0 ? "pair" : ""} ${hourSelected === hour ? "selected-hour" : ""} ${!hasAppointment ? "no-appointment" : ""}`}
                                        onClick={hasAppointment ? () => handleHourClick(hour) : null}
                                        style={{
                                            cursor: hasAppointment ? 'pointer' : 'not-allowed',
                                            opacity: hasAppointment ? 1 : 0.5
                                        }}
                                    >
                                        <p>{hour}</p>
                                        <img src={iconSrc} alt={status || 'empty'} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </WindowContainer>
            </div>
        </PatientProvider>
    )
}

export default PatientDashboard