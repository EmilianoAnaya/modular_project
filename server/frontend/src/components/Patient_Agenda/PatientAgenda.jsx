import './PatientAgenda.css'

import Section from '../Section/Section'
import PatientCalendar from './PatientCalendar'
import { useState } from 'react'
import WindowContainer from '../Window_Container/WindowContainer'
import BasicInput from '../Basic_Input/BasicInput'

function PatientAgenda(){
    const [windowVisibility, setWindowVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState ({
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      day : null
    })

    const [hourSelected, setHourSelected] = useState(null)
    const [doctorSelected, setDoctorSelected] = useState(null)
    const [appointmentMe, setAppointmentMe] = useState(true)


    const availableHours = []
    for (let i = 7; i < 21; i++){
      availableHours.push(i.toString().padStart(2,"0") + ":00")
    }

    const doctorAvailable = []
    for (let i = 0; i < 80; i++){
      doctorAvailable.push(i.toString())
    }

    return(
        <>
            <div className='patient-agenda-cont'>
                <PatientCalendar
                    setWindowVisibility={setWindowVisibility}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <Section headingText={"Date Notes"}>
                    <div className='patient-agenda-datenotes'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, justo vel maximus sodales, mi metus pretium tortor, ac pharetra leo velit eget ante. Sed lacinia ex vel ante bibendum aliquet. Suspendisse lobortis interdum ligula, et sagittis nisl consectetur sit amet. Ut lobortis felis vel ante iaculis, eget ullamcorper enim varius. Sed luctus est sit amet hendrerit porttitor. Integer accumsan felis faucibus ex tincidunt sagittis. Nullam at dapibus dolor, vulputate interdum arcu. Integer vel tincidunt neque, ut laoreet metus. Integer a consectetur magna, sit amet molestie magna. Integer sodales, mi id efficitur rhoncus, orci nunc elementum lorem, varius eleifend neque augue non urna. Cras metus nisi, tincidunt a porta eget, commodo consectetur tellus. Nullam venenatis ex ac lacus consequat rhoncus. Suspendisse pharetra, odio in finibus pharetra, felis turpis rutrum leo, et vestibulum leo leo sed nisl. In hac habitasse platea dictumst.
                    </div>
                </Section>

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
                              <BasicInput label="Search Doctor" />

                              <div className='basic-container appointment-doctor-results'>
                                { doctorAvailable.map((doctor, index) => (
                                  <p  className={`doctor-result ${index % 2 == 0 ? "pair" : ""}`}
                                      key={index}
                                      onClick={() => setDoctorSelected(doctor)}
                                  >
                                    { doctor }
                                  </p>
                                )) }
                              </div>

                              <span style={{ margin : '.1em auto' }}>
                                Doctor Selected : <b>{ doctorSelected == null ? "None" : doctorSelected}</b>
                              </span>
                            </>
                          )}

                          <span style={{ margin : '.1em auto' }}>
                            Hour Selected : <b>{ hourSelected == null ? "None" : hourSelected}</b>
                          </span>

                          <button className='basic-button'>Save Appointment</button>
                      </div>

                      <div className='basic-container appointment-hours-cont'>
                        { availableHours.map((hour, index) => (
                           <div key={index}
                             className={`appointment-hour-row ${index % 2 == 0 ? "pair" : ""}`}
                             onClick={() => setHourSelected(hour)}
                           >
                             <p>{ hour }</p>
                             <img src='/assets/calendar-x.svg'></img>     {/* Imagen por si el horario NO esta disponible */}
                             <img src='/assets/calendar-check.svg'></img> {/* Imagen por si el horario esta disponible */}
                           </div>
                        ))}
                      </div>
                  </div>

                </WindowContainer>

            </div>
        </>
    )
}

export default PatientAgenda