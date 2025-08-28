import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Main_Navbar/MainNavbar"
import PatientSidebar from "./components/Patient_Sidebar/PatientSidebar"
import PatientNotes from "./components/Patient_Notes/PatientNotes"
import PatientNav from "./components/Patient_Navbar/PatientNav"
import "./styles/Patient.css"

function Patient(){
    return (
        <>
            <MainNavbar />
            <div className="main-container patient-container">
                <PatientSidebar />
                <div className="patient-content">
                    <PatientNav />
                    <Routes>
                        <Route path="notes" element={<PatientNotes />} />
                        <Route path="/" element={<div>Bienvenido al paciente</div>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Patient