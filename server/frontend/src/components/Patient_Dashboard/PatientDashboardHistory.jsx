import './PatientDashboardHistory.css'
import { Routes, Route } from 'react-router-dom'
import PatientHistorySidebar from './PatientHistorySidebar'
import PatientNotes from '../Patient_Notes/PatientNotes'
import PatientRecord from '../Patient_Record/PatientRecord'

function PatientDashboardHistory() {
    return (
        <div className="patient-history-container">
            <PatientHistorySidebar />
            <div className="patient-history-content">
                <Routes>
                    <Route path="/" element={<PatientNotes />} />
                    <Route path="Notes" element={<PatientNotes />} />
                    <Route path="Record" element={<PatientRecord />} />
                </Routes>
            </div>
        </div>
    )
}

export default PatientDashboardHistory