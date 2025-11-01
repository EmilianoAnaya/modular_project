import './PatientDashboardHistory.css'
import { useNavigate, useLocation } from 'react-router-dom'

function PatientHistorySidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const buttons = [
        { title: "Notes", img: "pen.svg", route: "/PatientDashboard/History/Notes" },
        { title: "Record", img: "file-user.svg", route: "/PatientDashboard/History/Record" }
    ]

    return (
        <div className="patient-history-sidebar">
            {buttons.map((button, index) => (
                <div
                    key={index}
                    className={`history-sidebar-button ${location.pathname.includes(button.route) ? 'active' : ''}`}
                    onClick={() => navigate(button.route)}
                >
                    <img src={`/assets/${button.img}`} alt={button.title} />
                    <span>{button.title}</span>
                </div>
            ))}
        </div>
    )
}

export default PatientHistorySidebar