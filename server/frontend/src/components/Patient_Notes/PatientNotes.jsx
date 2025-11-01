import { useState } from 'react'
import PatientNav from "../Patient_Navbar/PatientNav";
import AllergiesSection from "./AllergiesSection";
<<<<<<< HEAD
import SurgicalHistorySection from "./SurgicalHistorySection"; 
import HabitsLifestyleSection from './HabitsLifestyleSection';
=======
import SurgicalHistorySection from "./SurgicalHistorySection";
>>>>>>> main
import "./PatientNotes.css"

function PatientNotes({ viewPoint = "" }) {
  const [activeSection, setActiveSection] = useState('Allergies')

  // Notas simuladas para secciones que todavía no tienen componentes completos
  const [notes, setNotes] = useState({
    "Family History": "",
    "Chronic Diseases": "",
  })

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
<<<<<<< HEAD
        return <SurgicalHistorySection />
      case 'Habits':
        return <HabitsLifestyleSection />
=======
        return <SurgicalHistorySection addTrigger={viewPoint === ""} />
      case 'Habits and Lifestyle':
>>>>>>> main
      case 'Family History':
      case 'Chronic Diseases':
        // Mantener notas simples para estas secciones
        return (
          <div className="notes-card">
            <h1>{activeSection}</h1>

            <div 
              className='editable-note' 
              contentEditable={true} 
              onInput={handleChange} 
              suppressContentEditableWarning={true}
            >
              {notes[activeSection]}
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        )
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
