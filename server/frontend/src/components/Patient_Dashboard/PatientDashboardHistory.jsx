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
                    <Route path="/" element={<PatientNotes viewPoint='notes-patient-view'/>} />
                    <Route path="Notes" element={<PatientNotes viewPoint='notes-patient-view'/>} />
                    <Route path="Record" element={<PatientRecord viewPoint='records-patient-view'/>} />
                </Routes>
            </div>
        </div>
    )
}

export default PatientDashboardHistory