import './PatientAgenda.css'
import Section from '../Section/Section'
import PatientCalendar from './PatientCalendar'
import { useState, useEffect } from 'react'
import WindowContainer from '../Window_Container/WindowContainer'
import BasicInput from '../Basic_Input/BasicInput'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientAgenda(){
    const { patientData, doctorData } = usePatient()
    const [windowVisibility, setWindowVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState ({
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      day : null
    })

    const [hourSelected, setHourSelected] = useState(null)
    const [doctorSelected, setDoctorSelected] = useState(null)
    const [appointmentMe, setAppointmentMe] = useState(true)
    const [dayAppointments, setDayAppointments] = useState([])
    const [reason, setReason] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [doctorResults, setDoctorResults] = useState([])
    const [occupiedHours, setOccupiedHours] = useState([])

    const availableHours = []
    for (let i = 7; i < 21; i++){
      availableHours.push(i.toString().padStart(2,"0") + ":00")
    }

    // Cargar citas del día seleccionado cuando cambia la ventana
    useEffect(() => {
        if (windowVisibility && selectedDate.day && patientData) {
            loadDayAppointments()
            loadAvailableHours()
        }
    }, [windowVisibility, selectedDate, patientData, appointmentMe, doctorSelected])

    // Buscar doctores cuando cambia el término de búsqueda
    useEffect(() => {
        if (searchTerm.length >= 1) {
            searchDoctors()
        } else {
            setDoctorResults([])
        }
    }, [searchTerm])

    const loadDayAppointments = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS_BY_PATIENT}/${patientData.patient_id}`)
            )
            const data = await response.json()

            if (response.ok) {
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

    const loadAvailableHours = async () => {
        try {
            let checkDoctorId

            if (appointmentMe) {
                // Obtener doctor_id desde el backend
                const userId = localStorage.getItem('userId')
                if (!userId) return

                const doctorResponse = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.DOCTOR}/${userId}`)
                )
                const doctorData = await doctorResponse.json()

                if (!doctorResponse.ok) return

                checkDoctorId = doctorData.doctor_id
            } else {
                if (!doctorSelected?.doctor_id) return
                checkDoctorId = doctorSelected.doctor_id
            }

            const dateStr = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`

            // AHORA SE ENVÍA TAMBIÉN EL patient_id
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.AVAILABLE_HOURS}?doctor_id=${checkDoctorId}&patient_id=${patientData.patient_id}&date=${dateStr}`)
            )
            const data = await response.json()

            if (response.ok) {
                setOccupiedHours(data.occupied_hours || [])
            }
        } catch (error) {
            console.error('Error loading available hours:', error)
        }
    }

    const searchDoctors = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.SEARCH_DOCTORS}?q=${encodeURIComponent(searchTerm)}`)
            )
            const data = await response.json()

            if (response.ok) {
                setDoctorResults(data.doctors || [])
            }
        } catch (error) {
            console.error('Error searching doctors:', error)
        }
    }

    const handleSelectDoctor = (doctor) => {
        setDoctorSelected(doctor)
        setSearchTerm('')
        setDoctorResults([])
    }

    const handleSaveAppointment = async () => {
        try {
            if (!hourSelected) {
                alert('Please select an hour')
                return
            }

            let finalDoctorId

            if (appointmentMe) {
                // Obtener doctor_id desde el backend usando el userId
                const userId = localStorage.getItem('userId')
                if (!userId) {
                    alert('User ID not found. Please login again.')
                    return
                }

                const doctorResponse = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.DOCTOR}/${userId}`)
                )
                const doctorData = await doctorResponse.json()

                if (!doctorResponse.ok) {
                    alert('Doctor information not found: ' + doctorData.error)
                    return
                }

                finalDoctorId = doctorData.doctor_id
            } else {
                if (!doctorSelected) {
                    alert('Please select a doctor')
                    return
                }
                finalDoctorId = doctorSelected.doctor_id
            }

            const dateStr = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`
            const datetime = `${dateStr} ${hourSelected}:00`

            const response = await fetch(
                getApiUrl(API_CONFIG.ENDPOINTS.APPOINTMENTS),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        patient_id: patientData.patient_id,
                        doctor_id: finalDoctorId,
                        appointment_date: datetime,
                        reason: reason
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                alert('Appointment created successfully!')
                setWindowVisibility(false)
                setHourSelected(null)
                setDoctorSelected(null)
                setReason('')
                window.location.reload()
            } else {
                alert(`Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error creating appointment:', error)
            alert('Error creating appointment')
        }
    }

    const isHourAvailable = (hour) => {
        return !occupiedHours.includes(hour)
    }

    return(
        <>
            <div className='patient-agenda-cont'>
                <PatientCalendar
                    setWindowVisibility={setWindowVisibility}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                {/* <Section headingText={"Date Notes"}>*/}
                    {/* <div className='patient-agenda-datenotes'>*/}
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, justo vel maximus sodales, mi metus pretium tortor, ac pharetra leo velit eget ante. Sed lacinia ex vel ante bibendum aliquet. Suspendisse lobortis interdum ligula, et sagittis nisl consectetur sit amet. Ut lobortis felis vel ante iaculis, eget ullamcorper enim varius. Sed luctus est sit amet hendrerit porttitor. Integer accumsan felis faucibus ex tincidunt sagittis. Nullam at dapibus dolor, vulputate interdum arcu. Integer vel tincidunt neque, ut laoreet metus. Integer a consectetur magna, sit amet molestie magna. Integer sodales, mi id efficitur rhoncus, orci nunc elementum lorem, varius eleifend neque augue non urna. Cras metus nisi, tincidunt a porta eget, commodo consectetur tellus. Nullam venenatis ex ac lacus consequat rhoncus. Suspendisse pharetra, odio in finibus pharetra, felis turpis rutrum leo, et vestibulum leo leo sed nisl. In hac habitasse platea dictumst.*/}
                    {/* </div>*/}
                {/* </Section>*/}

                <WindowContainer windowTitle={`Appointment - ${selectedDate.day}/${selectedDate.month+1}/${selectedDate.year}`}
                    showWindow={[windowVisibility, setWindowVisibility]}
                    styleContainer='appointment-window'
                >
                  <div className='appointment-container'>
                      <div className='appointment-entries-cont'>

                          <span>
                            <input type='checkbox' checked={appointmentMe}
                                onChange={(e) => setAppointmentMe(e.target.checked)}/>
                            Register the Appointment for me.
                          </span>

                          { !appointmentMe && (
                            <>
                          <div className='basic-input-cont'>
                            <p>
                              Search Doctor
                            </p>
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Type doctor name or specialty..."
                            />
                          </div>

                          <div className='basic-container appointment-doctor-results'>
                            { doctorResults.length > 0 ? (
                              doctorResults.map((doctor, index) => (
                                <p  className={`doctor-result ${index % 2 == 0 ? "pair" : ""}`}
                                    key={doctor.doctor_id}
                                    onClick={() => handleSelectDoctor(doctor)}
                                >
                                  {doctor.doctor_name} {doctor.speciality && `- ${doctor.speciality}`}
                                </p>
                              ))
                            ) : (
                              searchTerm.length >= 1 && <p style={{textAlign: 'center', color: '#666'}}>No doctors found</p>  // CAMBIAR DE 2 A 1
                            )}
                          </div>

                              <span style={{ margin : '.1em auto' }}>
                                Doctor Selected : <b>{ doctorSelected == null ? "None" : doctorSelected.doctor_name}</b>
                              </span>
                            </>
                          )}

                          <span style={{ margin : '.1em auto' }}>
                            Hour Selected : <b>{ hourSelected == null ? "None" : hourSelected}</b>
                          </span>

                          <div className='patient-text-area-cont'>
                            <p>
                                Reason (optional)
                            </p>
                            <textarea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Enter reason for appointment..."
                              rows="3"
                              maxLength={274}
                            />
                        </div>
                          <button className='basic-button' onClick={handleSaveAppointment}>
                            Save Appointment
                          </button>
                      </div>

                      <div className='basic-container appointment-hours-cont'>
                        { availableHours.map((hour, index) => {
                          const available = isHourAvailable(hour)
                          return (
                           <div key={index}
                             className={`appointment-hour-row ${index % 2 == 0 ? "pair" : ""} ${hourSelected === hour ? "selected" : ""} ${!available ? "occupied" : ""}`}
                             onClick={available ? () => setHourSelected(hour) : null}
                             style={{
                               cursor: available ? 'pointer' : 'not-allowed',
                               opacity: available ? 1 : 0.5
                             }}
                           >
                             <p>{ hour }</p>
                             {!available && <img src='/assets/calendar-x.svg' alt="Not available"></img>}
                             {available && <img src='/assets/calendar-check.svg' alt="Available"></img>}
                           </div>
                        )})}
                      </div>
                  </div>

                </WindowContainer>

            </div>
        </>
    )
}

export default PatientAgenda