import PatientNav from "../Patient_Navbar/PatientNav";
import "./PatientNotes.css"

function PatientNotes() {
  return (
    <>
        <PatientNav />
        <div className="notes-container">
          <div className="notes-card">
            <h1>Notes</h1>
          </div>
        </div>
    </>
  );
}

export default PatientNotes
