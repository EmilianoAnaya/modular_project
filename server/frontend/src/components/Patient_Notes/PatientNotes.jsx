import { useState } from 'react'
import PatientNav from "../Patient_Navbar/PatientNav"
import AllergiesSection from "./AllergiesSection"
import SurgicalHistorySection from "./SurgicalHistorySection"
import HabitsLifestyleSection from './HabitsLifestyleSection'
import FamilyHistorySection from './FamilyHistorySection'
import ChronicDiseasesSection from './ChronicDiseasesSection'
import "./PatientNotes.css"

function PatientNotes({ viewPoint = "" }) {
  const [activeSection, setActiveSection] = useState('Allergies')

  const handleChange = (e) => {
    setNotes({
      ...notes,
      [activeSection]: e.target.value,
    })
  }

  const handleSave = () => {
    alert(`Nota guardada en sección "${activeSection}": \n${notes[activeSection]}`)
  }

  // Renderizar la sección según el valor activo
  const renderSectionContent = () => {
    switch(activeSection) {
      case 'Allergies':
        return <AllergiesSection addTrigger={viewPoint === ""} />
      case 'Surgical History':
        return <SurgicalHistorySection addTrigger={viewPoint === ""} />
      case 'Habits':
        return <HabitsLifestyleSection addTrigger={viewPoint === ""} />
      case 'Family History':
        return <FamilyHistorySection addTrigger={viewPoint === ""} />
      case 'Chronic Diseases':
        return <ChronicDiseasesSection addTrigger={viewPoint === ""} />
      default:
        return null
    }
  }

  return (
    <div className="notes-page">
      <PatientNav
        viewPoint={viewPoint}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="notes-container">
        {renderSectionContent()}
      </div>
    </div>
  );
}

export default PatientNotes
