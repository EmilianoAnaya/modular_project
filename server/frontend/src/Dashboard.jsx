import { Routes, Route, useLocation } from 'react-router-dom';
import "./styles/Dashboard.css"
import { useState, useEffect } from 'react';

import MainNavbar from './components/Main_Navbar/MainNavbar';
import DashboardNav from './components/Dash_Navbar/DashboardNav';
import DashboardHome from './components/Dash_Home/DashboardHome';
import DashboardProfile from './components/Dash_Profile/DashboardProfile';
import DashboardPatients from './components/Dash_Patients/DashboardPatients';

import WindowContainer from './components/Window_Container/WindowContainer';
import { getApiUrl } from './config/api'
import API_CONFIG from './config/api'

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
    const [dayAppointments, setDayAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [doctorId, setDoctorId] = useState(null)

    const availableHours = []
    for (let i = 7; i < 21; i++){
      availableHours.push(i.toString().padStart(2,"0") + ":00")
    }

    // Obtener doctor_id al cargar
    useEffect(() => {
        loadDoctorId()
    }, [])

    // Cargar citas cuando se abre la ventana
    useEffect(() => {
        if (windowVisibility && selectedDate.day && doctorId) {
            loadDayAppointments()
        }
    }, [windowVisibility, selectedDate, doctorId])

    useEffect(() => {
      if (!windowVisibility) {
          setHourSelected(null)
          setSelectedAppointment(null)
          setDayAppointments([])
      }
    }, [windowVisibility])

    const loadDoctorId = async () => {
        try {
            const userId = localStorage.getItem('userId')
            if (!userId) return

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.DOCTOR}/${userId}`)
            )
            const data = await response.json()

            if (response.ok) {
                setDoctorId(data.doctor_id)
            }
        } catch (error) {
            console.error('Error loading doctor ID:', error)
        }
    }

    const loadDayAppointments = async () => {
        try {
            const dateStr = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.AVAILABLE_HOURS}?doctor_id=${doctorId}&patient_id=0&date=${dateStr}`)
            )
            const data = await response.json()

            if (response.ok) {
                // Obtener todas las citas del doctor para ese día
                const appointmentsResponse = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/doctor/${doctorId}/date/${dateStr}`)
                )
                
                if (appointmentsResponse.ok) {
                    const appointmentsData = await appointmentsResponse.json()
                    setDayAppointments(appointmentsData.appointments || [])
                }
            }
        } catch (error) {
            console.error('Error loading day appointments:', error)
        }
    }

    const handleHourClick = (hour) => {
        // Solo permitir click si hay cita en esa hora
        const appointment = dayAppointments.find(apt => {
            const timeMatch = apt.appointment_date.match(/(\d{2}):(\d{2}):(\d{2})/)
            if (!timeMatch) return false
            const aptHour = `${timeMatch[1]}:${timeMatch[2]}`
            return aptHour === hour
        })
        
        // Si no hay cita, no hacer nada
        if (!appointment) return
        
        setHourSelected(hour)
        setSelectedAppointment(appointment)
    }

    const handleAccept = async () => {
        if (!selectedAppointment) {
            alert('No appointment selected')
            return
        }

        try {
            // Convertir la fecha GMT a formato MySQL DATETIME
            const aptDate = new Date(selectedAppointment.appointment_date)
            const mysqlDatetime = aptDate.toISOString().slice(0, 19).replace('T', ' ')

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${selectedAppointment.id}`),
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        appointment_date: mysqlDatetime,  // ← Usar formato convertido
                        reason: selectedAppointment.reason,
                        status: 'Completed'
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                alert('Appointment accepted successfully!')
                loadDayAppointments()
                setSelectedAppointment(null)
                setHourSelected(null)
            } else {
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error accepting appointment:', error)
            alert('Error accepting appointment')
        }
    }

    const handleCancel = async () => {
        if (!selectedAppointment) {
            alert('No appointment selected')
            return
        }

        if (!confirm('Are you sure you want to cancel this appointment?')) {
            return
        }

        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.CANCEL_APPOINTMENT}/${selectedAppointment.id}/cancel`),
                {
                    method: 'PUT'
                }
            )

            const data = await response.json()

            if (response.ok) {
                alert('Appointment cancelled successfully!')
                loadDayAppointments()
                setSelectedAppointment(null)
                setHourSelected(null)
            } else {
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error)
            alert('Error cancelling appointment')
        }
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

                      {selectedAppointment ? (
                        <>
                          <div className='dashboard-window-patient-data'>
                            <p>Patient Name</p>
                            <div className='basic-container'>
                              <span>{selectedAppointment.patient_name}</span>
                            </div>
                          </div>

                          <div className='dashboard-window-patient-data'>
                            <p>Reason</p>
                            <div className='basic-container' style={{minHeight: '4em', padding: '1em'}}>
                              <span>{selectedAppointment.reason || 'No reason provided'}</span>
                            </div>
                          </div>

                          <div className='dashboard-window-buttons-cont'>
                            {selectedAppointment.status === 'Pending' && (
                              <>
                                <button className='basic-button'
                                  onClick={handleAccept}
                                >
                                  Accept appointment
                                </button>
                                <button className='basic-button'
                                  onClick={handleCancel}
                                  style={{backgroundColor: '#ff4444'}}
                                >
                                  Cancel appointment
                                </button>
                              </>
                            )}
                            {selectedAppointment.status === 'Completed' && (
                              <p style={{color: 'green', fontWeight: 'bold'}}>✓ Appointment Accepted</p>
                            )}
                            {selectedAppointment.status === 'Canceled' && (
                              <p style={{color: 'red', fontWeight: 'bold'}}>✗ Appointment Canceled</p>
                            )}
                          </div>
                        </>
                      ) : (
                        <p style={{textAlign: 'center', color: '#666', fontStyle: 'italic'}}>
                          {hourSelected ? 'No appointment at this hour' : 'Select an hour to see appointment details'}
                        </p>
                      )}
                    </div>

                    <div className='basic-container appointment-hours-dashboard'>
                      {availableHours.map((hour, index) => {
                        const status = getHourStatus(hour)
                        const hasAppointment = status !== null

                        let iconSrc = '/assets/user.svg' // No hay cita
                        if (status === "Completed") iconSrc = '/assets/check.svg'
                        if (status === "Canceled") iconSrc = '/assets/cross.svg'
                        if (status === "Pending") iconSrc = '/assets/contact-round.svg'

                        return (
                          <div
                            key={index}
                            className={`appointment-hour-row ${index % 2 === 0 ? "pair" : ""} ${hourSelected === hour ? "selected-hour" : ""} ${!hasAppointment ? "no-appointment" : ""}`}
                            onClick={() => handleHourClick(hour)}
                            style={{
                              cursor: 'pointer',
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
        </>
    )
}

export default Dashboard