import './PatientCalendar.css'

function PatientCalendar(){
    return (
        <>
            <div className='patient-agenda-calendar-cont'>
                <div className='patient-agenda-calendar-sidebar'>
                    <div className='patient-agenda-calendar-date'>
                        <img src="/assets/chevron-left.svg" alt="left" />
                        <p>2025</p>
                        <img src="/assets/chevron-right.svg" alt="right" />
                    </div>
                    <div className='patient-agenda-calendar-months'>
                        <p>January</p>
                        <p>February</p>
                        <p>March</p>
                        <p>April</p>
                        <p>May</p>
                        <p>June</p>
                        <p>July</p>
                        <p>August</p>
                        <p>September</p>
                        <p>October</p>
                        <p>November</p>
                        <p>December</p>
                    </div>
                </div>
                <div className='patient-agenda-calendar-content'>
                    big ass table
                </div>
            </div>
        </>
    )
}

export default PatientCalendar