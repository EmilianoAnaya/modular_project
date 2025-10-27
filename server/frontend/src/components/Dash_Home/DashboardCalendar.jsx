import './DashboardHome.css'

function DashboardCalendar({setWindowVisibility, selectedDate, setSelectedDate}){
    const calendarDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const calendarMonths = ["January","February","March","April","May","June",
                          "July","August","September","October","November","December"]

    const today = new Date()
    const { year, month } = selectedDate

    const daysInMonth = new Date(year, month+1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    const handleMonthChange = (operation) => {
      setSelectedDate(prev => {
          let newMonth = prev.month + operation
          let newYear = prev.year

          if (newMonth > 11) {
            newMonth = 0
            newYear += 1
          }

          if (newMonth < 0) {
            newMonth = 11
            newYear -= 1
          }

          return {...prev, month : newMonth, year : newYear }
        })
    }

    const daysArray = []
    for (let i = 0; i < firstDay; i++){
      daysArray.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++){
      daysArray.push(day)
    }

    const showWindow = (day) => {
      setSelectedDate(prev => ({...prev, day  }))
      setWindowVisibility(true)
    }

  return (
    <>
      <div className='calendar-cont'>
          <div className='calendar-head'>
            <p>{ year }</p>
            <div className='calendar-month-select'>
              <img src="/assets/chevron-left.svg" alt="left" onClick={() => handleMonthChange(-1)}/>
              <p>{ calendarMonths[month] }</p>
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
                month === today.getMonth() &&
                year === today.getFullYear()

              return (
                <div
                  className={`calendar-info-dash calendar-day ${isToday ? "istoday" : !day ? "empty" : ""}`}
                  onClick={ day ? () => showWindow(day) : null}
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

export default DashboardCalendar