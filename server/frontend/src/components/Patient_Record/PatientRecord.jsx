import React, { useState, useEffect, useRef } from 'react'
import './PatientRecord.css'
import Heading from '../Heading/Heading'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientRecord({ viewPoint = "" }){
    const { patientData } = usePatient()
    const [records, setRecords] = useState([])
    const [studies, setStudies] = useState([])
    const [combinedRecords, setCombinedRecords] = useState([])
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showFilesModal, setShowFilesModal] = useState(false)
    const [selectedStudy, setSelectedStudy] = useState(null)
    const [dateFilter, setDateFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const dateDropdownRef = useRef(null);


    useEffect(() => {
        if (patientData) {
            loadPatientData()
        }
    }, [patientData])

    useEffect(() => {
        combineAndSortRecords()
    }, [records, studies, categoryFilter, dateFilter])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setCategoryDropdownOpen(false)
            }
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setDateDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const loadPatientData = async () => {
        try {
            // Cargar consultas
            const recordsResponse = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_RECORDS_BY_PATIENT}/${patientData.patient_id}`)
            )
            const recordsData = await recordsResponse.json()

            // Cargar estudios con archivos
            const studiesResponse = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.STUDIES_BY_PATIENT_FILES}/${patientData.patient_id}/files`)
            )
            const studiesData = await studiesResponse.json()

            if (recordsResponse.ok) {
                setRecords(recordsData.records || [])
            }

            if (studiesResponse.ok) {
                setStudies(studiesData.studies || [])
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const combineAndSortRecords = () => {
        let combined = []

        // Filtrar consultas
        if (categoryFilter === 'all' || categoryFilter === 'document') {
            const consultations = records.map(record => ({
                ...record,
                type: 'document',
                displayDate: record.date || record.created_at
            }))
            combined = [...combined, ...consultations]
        }

        // Filtrar estudios
        if (categoryFilter === 'all' || categoryFilter === 'study') {
            const studiesRecords = studies.map(study => ({
                ...study,
                type: 'study',
                displayDate: study.performed_at
            }))
            combined = [...combined, ...studiesRecords]
        }

        // Filtrar por fecha
        if (dateFilter) {
            combined = combined.filter(record => {
                const recordDate = new Date(record.displayDate).toISOString().split('T')[0]
                return recordDate === dateFilter
            })
        }

        // Ordenar por fecha (más reciente primero)
        combined.sort((a, b) => new Date(b.displayDate) - new Date(a.displayDate))

        setCombinedRecords(combined)

        // Seleccionar primer registro si hay
        if (combined.length > 0 && !selectedRecord) {
            setSelectedRecord(combined[0])
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
        if (record.type === 'study') {
            // Mostrar modal con archivos
            setSelectedStudy(record)
            setShowFilesModal(true)
        }
        setSelectedRecord(record)
    }

    const toggleCategoryDropdown = () => {
            setCategoryDropdownOpen(!categoryDropdownOpen)
    }

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    }, [])

    const handleOpenFile = (filePath) => {
        const fileUrl = getApiUrl(`${API_CONFIG.ENDPOINTS.STUDY_FILE}/${filePath}`)
        window.open(fileUrl, '_blank')
    }

    const getFileIcon = (fileType) => {
        if (fileType.startsWith('image/')) return ''
        if (fileType === 'application/pdf') return '📄'
        return '📎'
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

    const renderStudyFiles = (study) => {
        if (!study.files || study.files.length === 0) {
            return <p style={{fontStyle: 'italic', color: '#666'}}>No files available for this study</p>
        }

        return (
            <div className='study-files-list'>
                <h3>Files ({study.files.length})</h3>
                {study.files.map((file) => (
                    <div key={file.id} className='study-file-item'>
                        <div className='study-file-info'>
                            <span className='study-file-icon'>{getFileIcon(file.file_type)}</span>
                            <div className='study-file-details'>
                                <p className='study-file-name'>{file.file_name}</p>
                            </div>
                        </div>
                        <button
                            className='basic-button study-file-view-btn'
                            onClick={() => handleOpenFile(file.file_path)}
                        >
                            View
                        </button>
                    </div>
                ))}
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
                    <div className={`patient-record-sub-cont records-table ${viewPoint}`}>
                        <p>Name</p>
                        <p>Made by</p>
                        <p
                            style={{cursor: 'pointer', userSelect: 'none', position: 'relative'}}
                            onClick={toggleCategoryDropdown}
                        >
                            {categoryFilter === 'all' ? 'Category' : categoryFilter === 'document' ? 'Document' : 'Study'}
                            {categoryDropdownOpen && (
                                <div className="category-dropdown" ref={dropdownRef}>
                                    <div
                                        onClick={() => { setCategoryFilter('all'); setCategoryDropdownOpen(false) }}
                                        className={categoryFilter === 'all' ? 'selected-option' : ''}
                                    >
                                        All
                                    </div>
                                    <div
                                        onClick={() => { setCategoryFilter('document'); setCategoryDropdownOpen(false) }}
                                        className={categoryFilter === 'document' ? 'selected-option' : ''}
                                    >
                                        Document
                                    </div>
                                    <div
                                        onClick={() => { setCategoryFilter('study'); setCategoryDropdownOpen(false) }}
                                        className={categoryFilter === 'study' ? 'selected-option' : ''}
                                    >
                                        Study
                                    </div>
                                </div>
                            )}
                        </p>
                        <p
                            style={{cursor: 'pointer', userSelect: 'none', position: 'relative'}}
                            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                        >
                            {dateFilter ? formatDate(dateFilter) : 'Date Created'}
                            {dateDropdownOpen && (
                                <div className="category-dropdown" ref={dateDropdownRef}>
                                    <div
                                        onClick={() => { setDateFilter(''); setDateDropdownOpen(false) }}
                                        className={dateFilter === '' ? 'selected-option' : ''}
                                    >
                                        All
                                    </div>
                                    {combinedRecords.map(record => {
                                        const recordDate = new Date(record.displayDate).toISOString().split('T')[0];
                                        return (
                                            <div
                                                key={record.id + recordDate}
                                                onClick={() => { setDateFilter(recordDate); setDateDropdownOpen(false) }}
                                                className={dateFilter === recordDate ? 'selected-option' : ''}
                                            >
                                                {formatDate(recordDate)}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </p>
                        <p>Actions</p>

                        {combinedRecords.length === 0 ? (
                            <p style={{gridColumn: '1 / -1', padding: '2em', fontStyle: 'italic', color: '#666'}}>
                                No records found for this patient.
                            </p>
                        ) : (
                            combinedRecords.map((record, index) => (
                                <React.Fragment key={`${record.type}-${record.id || index}`}>
                                    <p>
                                        {record.type === 'document'
                                            ? `Consult - ${formatDate(record.date)}`
                                            : `Study - ${record.study_type}`
                                        }
                                    </p>
                                    <p>{record.type === 'document' ? 'Doctor' : record.doctor_name || 'Doctor'}</p>
                                    <p>{record.type === 'document' ? 'Document' : 'Study'}</p>
                                    <p>{formatDate(record.displayDate)}</p>
                                    <div className='patient-record-buttons'>
                                        <button
                                            className={`basic-button icon-button table-button ${selectedRecord?.id === record.id ? 'active-record' : ''}`}
                                            onClick={() => handleViewRecord(record)}
                                            title={record.type === 'study' ? 'View study files' : 'View consultation details'}
                                        >
                                            <img src='/assets/glasses.svg' alt="View"/>
                                        </button>
                                    </div>
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
                <div className='patient-records-item'>
                    <Heading headingText={"Summary"} />
                    <div className={`patient-record-sub-cont records-summary ${viewPoint}`}>
                        {selectedRecord ? (
                            selectedRecord.type === 'document' ? (
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
                                <>
                                    <div style={{marginBottom: '1em', paddingBottom: '0.5em', borderBottom: '2px solid #4fc3f7'}}>
                                        <h2 style={{margin: '0', color: '#00897b'}}>
                                            Study - {selectedRecord.study_type}
                                        </h2>
                                        <p style={{margin: '0.5em 0', fontStyle: 'italic', color: '#666'}}>
                                            Performed: {formatDate(selectedRecord.performed_at)}
                                        </p>
                                        <p style={{margin: '0.5em 0', color: '#666'}}>
                                            Doctor: {selectedRecord.doctor_name}
                                        </p>
                                    </div>
                                    {renderStudyFiles(selectedRecord)}
                                </>
                            )
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