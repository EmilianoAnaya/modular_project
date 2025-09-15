import './PatientNav.css'

function PatientNav({activeSection, setActiveSection}) {
    
    const sections = [
        { id: 'Allergies', label: 'Allergies' },
        { id: 'Surgical History', label: 'Surgical History' },
        { id: 'Habits', label: 'Habits and Lifestyle' },
        { id: 'Family History', label: 'Family History' },
        { id: 'Chronic Diseases', label: 'Chronic Diseases' },
    ]

    const activeClass = (id) => activeSection === id ? 'active-page' : ''

    return (
        <div>
            <div id='patient-nav'>
                {sections.map((section, index) => (
                    <div key={section.id} className="patient-nav-item">
                        <p
                            className={`patient-nav-text ${activeClass(section.id)}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            {section.label}
                        </p>
                        {index < sections.length - 1 && (
                            <img src='/assets/VerticalSeparator.svg' alt="" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatientNav
