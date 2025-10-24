import { useState } from 'react'
import PatientNav from "../Patient_Navbar/PatientNav";
import AllergiesSection from "./AllergiesSection";
import "./PatientNotes.css"

function PatientNotes() {
  const [activeSection, setActiveSection] = useState('Allergies')

  // Notas simuladas para las otras secciones (por ahora)
  const [notes, setNotes] = useState({
    "Surgical History" : "",
    "Habits and Lifestyle" : "",
    "Family History" : "",
    "Chronic Diseases" : "",
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

  // Renderizar contenido según la sección activa
  const renderSectionContent = () => {
    if (activeSection === 'Allergies') {
      return <AllergiesSection />
    }

    // Para las otras secciones, mantener el comportamiento actual
    return (
      <div className="notes-card">
        <h1>{activeSection}</h1>

        <div className='editable-note' contentEditable={true} onInput={handleChange} suppressContentEditableWarning={true}>
          {notes[activeSection]}
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    )
  }

  return (
    <div className="notes-page">
      <PatientNav
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