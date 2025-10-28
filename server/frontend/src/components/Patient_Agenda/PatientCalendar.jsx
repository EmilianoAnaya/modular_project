import './PatientCalendar.css'
import { useState, useEffect } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientCalendar({setWindowVisibility, selectedDate, setSelectedDate}){
    const { patientData } = usePatient()
    const [appointments, setAppointments] = useState([])
    
    const calendarDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const calendarMonths = ["January","February","March","April","May","June",
                            "July","August","September","October","November","December"]

    const today = new Date();
    const {year, month} = selectedDate

    // Cargar citas al montar el componente
    useEffect(() => {
        if (patientData) {
            loadAppointments()
        }
    }, [patientData])

    const loadAppointments = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS_BY_PATIENT}/${patientData.patient_id}`)
            )
            const data = await response.json()

            if (response.ok) {
                setAppointments(data.appointments || [])
            }
        } catch (error) {
            console.error('Error loading appointments:', error)
        }
    }

    const daysInMonth = new Date(year, month+1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    const daysArray = []
    for (let i = 0; i < firstDay; i++){
      daysArray.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++){
      daysArray.push(day)
    }

    const handleYear = (param) => setSelectedDate(prev => ({...prev, year : prev.year + param}))
    const handleMonth = (index) => setSelectedDate(prev => ({...prev, month : index}))
    const showWindow = (day) => {
      setSelectedDate(prev => ({...prev, day  }))
      setWindowVisibility(true)
    }

    // Función para verificar si un día tiene citas
    const hasAppointment = (day) => {
        if (!day) return false
        
        return appointments.some(apt => {
            const aptDate = new Date(apt.appointment_date)
            return aptDate.getDate() === day && 
                   aptDate.getMonth() === month && 
                   aptDate.getFullYear() === year &&
                   apt.status !== 'Canceled'
        })
    }

    return (
        <>
            <div className='patient-agenda-calendar-cont'>
                <div className='patient-agenda-calendar-sidebar'>
                    <div className='patient-agenda-calendar-date'>
                        <img src="/assets/chevron-left.svg" alt="left" onClick={() => handleYear(-1)}/>
                        <p>{ year }</p>
                        <img src="/assets/chevron-right.svg" alt="right" onClick={() => handleYear(1)}/>
                    </div>

                    <div className='patient-agenda-calendar-months'>
                        { calendarMonths.map((tmp_month, index) => (
                          <p key={index}
                            onClick={() => handleMonth(index)}
                            className={`month-item ${index === month ? "active" : ""}`}
                          >
                            {tmp_month}
                          </p>
                        )) }
                    </div>
                </div>

                <div className='patient-agenda-calendar-content'>
                  { calendarDays.map((day, index) => (
                    <div key={index} className='calendar-info calendar-head-box'>
                        {day}
                    </div>
                  ))}

                  { daysArray.map((day, index) => {
                    const isToday =
                      day &&
                      day === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear()

                    const hasApt = hasAppointment(day)

                    return (
                      <div
                        className={`calendar-info-dash calendar-day ${isToday ? "istoday" : !day ? "empty" : ""} ${hasApt ? "has-appointment" : ""}`}
                        onClick={ day ? () => showWindow(day) : null }
                        key={index}
                        style={{
                          border: day ? "1px solid rgba(0, 0, 0, 0.2)" : "none"
                        }}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
            </div>
        </>
    )
}

export default PatientCalendar