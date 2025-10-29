import './DashboardHome.css'
import Section from '../Section/Section'
import DashboardCalendar from './DashboardCalendar'
import { useState, useEffect } from 'react'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function DashboardHome({setWindowVisibility, selectedDate, setSelectedDate}) {
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [doctorId, setDoctorId] = useState(null)

    useEffect(() => {
        loadDoctorId()
    }, [])

    useEffect(() => {
        if (doctorId) {
            loadPendingAppointments()
        }
    }, [doctorId])

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

    const loadPendingAppointments = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/doctor/${doctorId}`)
            )
            const data = await response.json()

            if (response.ok) {
                // Filtrar solo las pendientes y futuras
                const pending = data.appointments.filter(apt => {
                    const aptDate = new Date(apt.appointment_date)
                    const now = new Date()
                    return apt.status === 'Pending' && aptDate >= now
                })
                setPendingAppointments(pending)
            }
        } catch (error) {
            console.error('Error loading pending appointments:', error)
        }
    }

    const handleAcceptAppointment = async (appointment) => {
        try {
            const aptDate = new Date(appointment.appointment_date)
            const mysqlDatetime = aptDate.toISOString().slice(0, 19).replace('T', ' ')

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${appointment.id}`),
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        appointment_date: mysqlDatetime,
                        reason: appointment.reason,
                        status: 'Completed'
                    })
                }
            )

            if (response.ok) {
                alert('Appointment accepted successfully!')
                loadPendingAppointments()
            } else {
                const data = await response.json()
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error accepting appointment:', error)
            alert('Error accepting appointment')
        }
    }

    const handleRejectAppointment = async (appointment) => {
        if (!confirm(`Are you sure you want to reject the appointment with ${appointment.patient_name}?`)) {
            return
        }

        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.CANCEL_APPOINTMENT}/${appointment.id}/cancel`),
                {
                    method: 'PUT'
                }
            )

            if (response.ok) {
                alert('Appointment rejected successfully!')
                loadPendingAppointments()
            } else {
                const data = await response.json()
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error rejecting appointment:', error)
            alert('Error rejecting appointment')
        }
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        
        // Extraer hora del string GMT
        const timeMatch = dateString.match(/(\d{2}):(\d{2}):(\d{2})/)
        const hour = timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '00:00'
        
        return `${day}/${month}/${year} at ${hour}`
    }

    return (
        <>
            <div id='dash-home'>
                <div id='dash-home-notifs'>
                    <Section headingText={"Pending Appointments"}>
                        <div className='basic-container notifs-cont'>
                            {pendingAppointments.length === 0 ? (
                                <p style={{textAlign: 'center', color: '#666', padding: '2em'}}>
                                    No pending appointments
                                </p>
                            ) : (
                                pendingAppointments.map((apt, index) => (
                                    <div key={apt.id} className={`notification-item ${index % 2 === 0 ? 'pair' : ''}`}>
                                        <div className='notification-info'>
                                            <p className='notification-patient'>
                                                <strong>{apt.patient_name}</strong>
                                            </p>
                                            <p className='notification-date'>
                                                {formatDateTime(apt.appointment_date)}
                                            </p>
                                            {apt.reason && (
                                                <p className='notification-reason'>
                                                    Reason: <em>{apt.reason}</em>
                                                </p>
                                            )}
                                        </div>
                                        <div className='notification-actions'>
                                            <button 
                                                className='basic-button notification-btn accept'
                                                onClick={() => handleAcceptAppointment(apt)}
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                className='basic-button notification-btn reject'
                                                onClick={() => handleRejectAppointment(apt)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Section>
                </div>
                <div id='dash-home-calendar'>
                    <DashboardCalendar
                      setWindowVisibility={setWindowVisibility}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardHome