import { useState } from 'react'
import PatientNav from "../Patient_Navbar/PatientNav";
import "./PatientNotes.css"

function PatientNotes() {
  const [activeSection, setActiveSection] = useState('Allergies')

  // Notas simuladas (pruebas)
  const [notes, setNotes] = useState({
    Allergies: "",
    "Surgical History" : "",
    "Habits" : "",
    "Family History" : "",
    "Chronic Diseases" : "",
  })

  const handleChange = (e) => {
    setNotes({
      ...notes,
      [activeSection]: e.target.value, // Save the editable content
    })
  }

  const handleSave = () => {
    // Guardamos info en local
    alert(`Nota guardada en sección "${activeSection}": \n${notes[activeSection]}`)
  }

  return (
    <div className="notes-page">
        <PatientNav 
          activeSection = {activeSection}
          setActiveSection = {setActiveSection}
    />

      <div className="notes-container">
        <div className="notes-card">
          <h1>{activeSection}</h1>
          
          <div className='editable-note' contentEditable={true} onInput={handleChange} suppressContentEditableWarning={true}>
            {notes[activeSection]}
          </div>
          <button className="save-button" onClick={handleSave}>Save</button>
          
        </div>
      </div>
    </div>
  );
}

export default PatientNotes
