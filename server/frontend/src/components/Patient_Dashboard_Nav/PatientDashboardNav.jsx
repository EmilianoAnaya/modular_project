import './PatientDashboardNav.css'
import { useLocation, useNavigate } from 'react-router-dom'

function PatientDashboardNav() {
    const location = useLocation()
    const navigate = useNavigate()

    // Obtener iniciales
    const firstName = localStorage.getItem('userFirstName') || 'P'
    const lastName = localStorage.getItem('userLastName') || 'P'
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    const navButtons = [
        { title: "Home", route: "/PatientDashboard" },
        { title: "Profile", route: "/PatientDashboard/Profile" },
        { title: "History", route: "/PatientDashboard/History" }
    ]

    const isActive = (route) => {
        if (route === "/PatientDashboard") {
            return location.pathname === route
        }
        return location.pathname.includes(route)
    }

    return (
        <div id='dashboard-navbar'>
            <div className='dashboard-navbar-logo' onClick={() => navigate("/PatientDashboard")}>
                {initials}
            </div>

            <div className='dashboard-navbar-separator'>
                <img src='/assets/VerticalSeparator.svg' alt="separator" />
            </div>

            {navButtons.map((button, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                    <button
                        className={`dashboard-navbar-button ${isActive(button.route) ? 'active' : ''}`}
                        onClick={() => navigate(button.route)}
                    >
                        {button.title}
                    </button>
                    
                    {index < navButtons.length - 1 && (
                        <div className='dashboard-navbar-separator'>
                            <img src='/assets/VerticalSeparator.svg' alt="separator" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PatientDashboardNav