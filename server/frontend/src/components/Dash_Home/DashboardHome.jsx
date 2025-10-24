import './DashboardHome.css'
import Section from '../Section/Section'

import { useState } from 'react'

function DashboardHome() {
    const calendarDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const calendarMonths = ["January","February","March","April","May","June",
                          "July","August","September","October","November","December"]

    const [year, setYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const today = new Date()

    const handleMonthChange = (operation) => {
      setCurrentMonth(prev => {
          let newMonth = prev + operation

          if (newMonth > 11) {
            newMonth = 0
            setYear(prev => prev + 1)
          }

          if (newMonth < 0) {
            newMonth = 11
            setYear(prev => prev -1)
          }

          return newMonth
        })
    }

    const daysInMonth = new Date(year, currentMonth+1, 0).getDate()
    const firstDay = new Date(year, currentMonth, 1).getDay()

    const daysArray = []
    for (let i = 0; i < firstDay; i++){
      daysArray.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++){
      daysArray.push(day)
    }

    return (
        <>
            <div id='dash-home'>
                <div id='dash-home-notifs'>
                    <Section headingText={"Notifications"}>
                        <div className='basic-container notifs-cont'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lectus id sem dapibus pulvinar. Cras varius sodales placerat. Nullam tempor sollicitudin sapien rutrum sollicitudin. Donec molestie sapien enim, lobortis consequat ante fermentum eget. Sed hendrerit est nec nibh porta malesuada. Donec ut sem eleifend, cursus justo quis, pellentesque nisi. Curabitur rutrum, libero at pulvinar faucibus, purus tortor pellentesque dui, ac euismod tellus diam ut sem. Morbi arcu orci, scelerisque ut sem non, congue accumsan dolor. Ut ut mi interdum, commodo nulla vitae, ornare lacus. Morbi ultrices lorem ut quam aliquam, et rutrum felis vehicula. Mauris egestas interdum hendrerit. Vivamus vitae lacinia justo. Sed eget malesuada dui. Praesent in neque ac purus pharetra volutpat. Sed et sagittis ante. Sed consectetur turpis eu sapien lobortis, vitae semper neque laoreet. Integer mattis maximus consectetur. Nulla congue sodales neque, id finibus arcu malesuada ac. Ut a quam pulvinar, fringilla justo sit amet, fermentum arcu. Aliquam quis turpis libero. Cras ultricies libero sit amet elit accumsan, id porta dolor faucibus. Quisque vel est urna. Sed varius tortor erat. Vivamus aliquam lorem dui, sed ultricies felis dictum ut.
                        </div>
                    </Section>
                </div>
                <div id='dash-home-calendar'>
                    <div className='calendar-cont'>
                        <div className='calendar-head'>
                          <p>{ year }</p>
                          <div className='calendar-month-select'>
                            <img src="/assets/chevron-left.svg" alt="left" onClick={() => handleMonthChange(-1)}/>
                            <p>{ calendarMonths[currentMonth] }</p>
                            <img src="/assets/chevron-right.svg" alt="right" onClick={() => handleMonthChange(1)}/>
                          </div>
                        </div>

                        <div className='calendar-dates'>
                          { calendarDays.map((day, index) => (
                            <div className='calendar-info-dash calendar-head-dash' key={index}>
                              { day }
                            </div>
                          )) }

                          { daysArray.map((day, index) => {
                            const isToday =
                              day &&
                              day === today.getDate() &&
                              currentMonth === today.getMonth()

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
                </div>
            </div>
        </>
    )
}

export default DashboardHome