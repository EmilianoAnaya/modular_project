import './PatientNav.css'
import { useNavigate, useLocation } from 'react-router-dom'

function PatientNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const currentLocation = location.pathname

    const activePage = (path) => currentLocation === path ? 'active-page' : ''

    const sections = [
        { path: '/Patient/Allergies', label: 'Allergies' },
        { path: '/Patient/SurgicalHistory', label: 'Surgical History' },
        { path: '/Patient/Habits', label: 'Habits and Lifestyle' },
        { path: '/Patient/FamilyHistory', label: 'Family History' },
        { path: '/Patient/ChronicDiseases', label: 'Chronic Diseases' }
    ]

    return (
        <div id='patient-nav'>
            {sections.map((section, index) => (
                <div key={section.path} className="patient-nav-item">
                    <p
                        className={`patient-nav-text ${activePage(section.path)}`}
                        onClick={() => navigate(section.path)}
                    >
                        {section.label}
                    </p>
                    {index < sections.length - 1 && (
                        <img src='/assets/VerticalSeparator.svg' alt="" />
                    )}
                </div>
            ))}
        </div>
    )
}

export default PatientNav
