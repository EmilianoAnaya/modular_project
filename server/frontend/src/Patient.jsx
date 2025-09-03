import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Main_Navbar/MainNavbar"
import PatientAgenda from "./components/Patient_Agenda/PatientAgenda"
import PatientSidebar from "./components/Patient_Sidebar/PatientSidebar"
import PatientNotes from "./components/Patient_Notes/PatientNotes"

import "./styles/Patient.css"

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
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Patient