import React, { useState, useEffect } from 'react'
import './PatientRecord.css'
import Heading from '../Heading/Heading'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientRecord(){
    const { patientData } = usePatient()
    const [records, setRecords] = useState([])
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (patientData) {
            loadPatientRecords()
        }
    }, [patientData])

    const loadPatientRecords = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_RECORDS_BY_PATIENT}/${patientData.patient_id}`)
            )
            const data = await response.json()

            if (response.ok) {
                setRecords(data.records)
                if (data.records.length > 0) {
                    setSelectedRecord(data.records[0])
                }
            } else {
                console.error('Error loading records:', data.error)
            }
        } catch (error) {
            console.error('Error fetching records:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        })
    }

    const handleViewRecord = (record) => {
        setSelectedRecord(record)
    }

    const renderConsultationData = (consultationData) => {
        if (!consultationData) return <p>No consultation data available</p>

        return (
            <div className='consultation-details'>
                {consultationData.vitals && Object.values(consultationData.vitals).some(v => v) && (
                    <div className='detail-section'>
                        <h3>Vitals</h3>
                        <div className='detail-grid'>
                            {consultationData.vitals.height && <p><strong>Height:</strong> {consultationData.vitals.height} m</p>}
                            {consultationData.vitals.weight && <p><strong>Weight:</strong> {consultationData.vitals.weight} kg</p>}
                            {consultationData.vitals.bmi && <p><strong>BMI:</strong> {consultationData.vitals.bmi}</p>}
                            {consultationData.vitals.temperature && <p><strong>Temperature:</strong> {consultationData.vitals.temperature}°C</p>}
                            {consultationData.vitals.blood_pressure && <p><strong>Blood Pressure:</strong> {consultationData.vitals.blood_pressure}</p>}
                            {consultationData.vitals.pulse && <p><strong>Pulse:</strong> {consultationData.vitals.pulse} bpm</p>}
                            {consultationData.vitals.respiratory_rate && <p><strong>Respiratory Rate:</strong> {consultationData.vitals.respiratory_rate}</p>}
                        </div>
                    </div>
                )}

                {consultationData.problems && consultationData.problems.length > 0 && (
                    <div className='detail-section'>
                        <h3>Problems</h3>
                        {consultationData.problems.map((problem, index) => (
                            <div key={index} className='detail-item'>
                                <h4>{problem.problem_name}</h4>
                                {problem.description && <p><strong>Description:</strong> {problem.description}</p>}
                                {problem.onset && <p><strong>Onset:</strong> {formatDate(problem.onset)}</p>}
                                {problem.severity && <p><strong>Severity:</strong> {problem.severity}</p>}
                                {problem.duration && <p><strong>Duration:</strong> {problem.duration}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {consultationData.allergies && consultationData.allergies.length > 0 && (
                    <div className='detail-section'>
                        <h3>Allergies</h3>
                        {consultationData.allergies.map((allergy, index) => (
                            <div key={index} className='detail-item'>
                                <h4>{allergy.allergen}</h4>
                                {allergy.reaction && <p><strong>Reaction:</strong> {allergy.reaction}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {consultationData.medicines && consultationData.medicines.length > 0 && (
                    <div className='detail-section'>
                        <h3>Medicines</h3>
                        {consultationData.medicines.map((medicine, index) => (
                            <div key={index} className='detail-item'>
                                <h4>{medicine.medicine}</h4>
                                {medicine.quantity && <p><strong>Quantity:</strong> {medicine.quantity}</p>}
                                {medicine.instructions && <p><strong>Instructions:</strong> {medicine.instructions}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {consultationData.notes && consultationData.notes.trim() !== '' && (
                    <div className='detail-section'>
                        <h3>Additional Notes</h3>
                        <p style={{whiteSpace: 'pre-wrap'}}>{consultationData.notes}</p>
                    </div>
                )}
            </div>
        )
    }

    if (loading) {
        return (
            <div className='patient-records-container'>
                <p>Loading records...</p>
            </div>
        )
    }

    return (
        <>
            <div className='patient-records-container'>
                <div className='patient-records-item'>
                    <Heading headingText={"Record"} />
                    <div className='patient-record-sub-cont records-table'>
                        <p>Name</p>
                        <p>Made by</p>
                        <p>Category</p>
                        <p>Date Created</p>
                        <p>Actions</p>

                        {records.length === 0 ? (
                            <p style={{gridColumn: '1 / -1', padding: '2em', fontStyle: 'italic', color: '#666'}}>
                                No medical records found for this patient.
                            </p>
                        ) : (
                            records.map((record) => (
                                <React.Fragment key={record.id}>
                                    <p>Consult - {formatDate(record.date)}</p>
                                    <p>Doctor</p>
                                    <p>Document</p>
                                    <p>{formatDate(record.created_at)}</p>
                                    <div className='patient-record-buttons'>
                                        <button 
                                            className={`basic-button icon-button table-button ${selectedRecord?.id === record.id ? 'active-record' : ''}`}
                                            onClick={() => handleViewRecord(record)}
                                            title="View consultation details"
                                        >
                                            <img src='/assets/glasses.svg'/>
                                        </button>
                                    </div>
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
                <div className='patient-records-item'>
                    <Heading headingText={"Summary"} />
                    <div className='patient-record-sub-cont records-summary'>
                        {selectedRecord ? (
                            <>
                                <div style={{marginBottom: '1em', paddingBottom: '0.5em', borderBottom: '2px solid #4fc3f7'}}>
                                    <h2 style={{margin: '0', color: '#00897b'}}>
                                        Consultation - {formatDate(selectedRecord.date)}
                                    </h2>
                                    <p style={{margin: '0.5em 0', fontStyle: 'italic', color: '#666'}}>
                                        {selectedRecord.summary}
                                    </p>
                                </div>
                                {renderConsultationData(selectedRecord.consultation_data)}
                            </>
                        ) : (
                            <p style={{fontStyle: 'italic', color: '#666'}}>
                                Select a record to view details
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientRecord