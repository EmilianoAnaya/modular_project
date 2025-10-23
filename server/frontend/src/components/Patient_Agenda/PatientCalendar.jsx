import './PatientCalendar.css'
import { useState } from 'react'

function PatientCalendar(){
    const calendarDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const calendarMonths = ["January","February","March","April","May","June",
                            "July","August","September","October","November","December"]

    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    const today = new Date();

    const daysInMonth = new Date(year, month+1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    const daysArray = []
    for (let i = 0; i < firstDay; i++){
      daysArray.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++){
      daysArray.push(day)
    }

    const handleYear = (param) => setYear(prev => prev + param)
    const handleMonth = (index) => setMonth(index)

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
                      month === today.getMonth()

                    return (
                      <div
                        className='calendar-info-dash calendar-day'
                        key={index}
                        style={{
                          backgroundColor: isToday ? "#27847A" : "inherit",
                          color: isToday ? "white" : "black",
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