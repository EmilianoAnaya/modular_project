import "./styles/Patient.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Main_Navbar/MainNavbar"
import PatientAgenda from "./components/Patient_Agenda/PatientAgenda"
import PatientSidebar from "./components/Patient_Sidebar/PatientSidebar"
import PatientNotes from "./components/Patient_Notes/PatientNotes"
import PatientRecord from "./components/Patient_Record/PatientRecord";
import PatientTendencies from "./components/Patient_Tendencies/PatientTendencies";


function Patient(){
    return (
        <>
            <MainNavbar />
            <div className="main-container patient-container">
                <PatientSidebar />
                <div className="patient-content">
                    <Routes>
                        <Route path="/" element={<PatientAgenda />} />
                        <Route path="Notes" element={<PatientNotes />} />
                        <Route path="Record" element={<PatientRecord />} />
                        <Route path="Tendencies" element={<PatientTendencies />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Patient