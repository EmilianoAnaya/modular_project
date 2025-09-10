import PatientNav from "../Patient_Navbar/PatientNav";
import "./PatientNotes.css"

function PatientNotes() {
  return (
    <div className="notes-page">
        <PatientNav />
        <div className="notes-container">
          <div className="notes-card">
            <h1>Notes</h1>
            <p>Contenido de la sección seleccionada</p>
          </div>
        </div>
    </div>
  );
}

export default PatientNotes
