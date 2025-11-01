import './PatientStudy.css'
import StudyCard from './StudyCard'
import { useState } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientStudy(){
    const { patientData } = usePatient()
    const [selectedStudyType, setSelectedStudyType] = useState('')
    const [attachedFiles, setAttachedFiles] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    // Lista completa de tipos de estudios
    const STUDY_TYPES = [
        "X Rays - Chest",
        "X Rays - Abdomen",
        "X Rays - Extremities",
        "Blood Test - Complete Blood Count (CBC)",
        "Blood Test - Glucose",
        "Blood Test - Lipid Panel",
        "Urinalysis",
        "CT Scan",
        "MRI",
        "Ultrasound",
        "Mammography",
        "Electrocardiogram (ECG/EKG)",
        "Electroencephalogram (EEG)",
        "Echocardiogram",
        "Endoscopy",
        "Colonoscopy",
        "Biopsy Results",
        "Pathology Report",
        "Other"
    ]

    // Filtrar tipos de estudio por búsqueda
    const filteredStudyTypes = STUDY_TYPES.filter(type =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectStudyType = (type) => {
        setSelectedStudyType(type)
    }

    const handleFileAttach = (file) => {
        if (attachedFiles.length < 5) {
            setAttachedFiles([...attachedFiles, file])
        } else {
            alert('Maximum 5 files allowed')
        }
    }

    const handleFileRemove = (index) => {
        setAttachedFiles(attachedFiles.filter((_, i) => i !== index))
    }

    const handleFileReplace = (index, newFile) => {
        const updatedFiles = [...attachedFiles]
        updatedFiles[index] = newFile
        setAttachedFiles(updatedFiles)
    }

    const handleSaveStudies = async () => {
        // Validaciones
        if (!selectedStudyType) {
            alert('Please select a study type')
            return
        }
        if (attachedFiles.length === 0) {
            alert('Please attach at least one file')
            return
        }
        if (!patientData) {
            alert('Patient data not found')
            return
        }

        setIsSaving(true)

        try {
            // Obtener doctor_id
            const userId = localStorage.getItem('userId')
            if (!userId) {
                alert('Doctor ID not found. Please login again.')
                setIsSaving(false)
                return
            }

            const doctorResponse = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.DOCTOR}/${userId}`))
            const doctorData = await doctorResponse.json()

            if (!doctorResponse.ok) {
                alert('Error getting doctor info: ' + doctorData.error)
                setIsSaving(false)
                return
            }

            const doctorId = doctorData.doctor_id

            // Crear FormData para enviar archivos
            const formData = new FormData()
            formData.append('patient_id', patientData.patient_id)
            formData.append('doctor_id', doctorId)
            formData.append('study_type', selectedStudyType)

            // Agregar todos los archivos
            attachedFiles.forEach((file) => {
                formData.append('files', file)
            })

            // Enviar al backend
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.STUDIES), {
                method: 'POST',
                body: formData
                // NO incluir Content-Type header, el navegador lo configura automáticamente para FormData
            })

            const data = await response.json()

            if (response.ok) {
                alert(`Study saved successfully!\n${data.files.length} files uploaded`)

                // Limpiar formulario
                setSelectedStudyType('')
                setAttachedFiles([])
                setSearchTerm('')
            } else {
                alert('Error saving study: ' + data.error)
            }
        } catch (error) {
            console.error('Error saving study:', error)
            alert('Error connecting to server. Make sure backend is running.')
        } finally {
            setIsSaving(false)
        }
    }

    return(
        <>
            <div className='patient-study-container'>
                <div className='studies-list-cont'>
                    <div className='studies-list'>
                        <div className='studies-list-search'>
                            <input
                                placeholder='Search for Study...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div />
                        </div>
                        <div className='studies-list-items'>
                            <ul>
                                {filteredStudyTypes.map((type, index) => (
                                    <li key={index}>
                                        <div
                                            className='study-item'
                                            onClick={() => handleSelectStudyType(type)}
                                            style={{
                                                backgroundColor: selectedStudyType === type ? '#4fc3f7' : 'transparent',
                                                color: selectedStudyType === type ? 'white' : 'inherit'
                                            }}
                                        >
                                            <span>{type}</span>
                                            {/* <button>Add</button>*/}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='studies-selected-cont'>
                    <div className='selected-study-header'>
                        {selectedStudyType ? (
                            <h2 className='selected-study-title'>
                                {selectedStudyType}
                            </h2>
                        ) : (
                            <p className='selected-study-placeholder'>
                                Select a study type to attach files
                            </p>
                        )}
                    </div>
                    <div className='selected-studies'>
                        {/* Mostrar cards con archivos adjuntos */}
                        {attachedFiles.map((file, index) => (
                            <StudyCard
                                key={`file-${index}`}
                                file={file}
                                onFileRemove={() => handleFileRemove(index)}
                                onFileReplace={(newFile) => handleFileReplace(index, newFile)}
                                hasFile={true}
                                selectedStudyType={selectedStudyType}
                            />
                        ))}

                        {/* Mostrar card vacía solo si no se alcanzó el límite */}
                        {attachedFiles.length < 5 && (
                            <StudyCard
                                key="empty-card"
                                onFileAttach={handleFileAttach}
                                hasFile={false}
                                selectedStudyType={selectedStudyType}
                            />
                        )}
                    </div>
                    <div className='selected-studies-footer'>
                        <button
                            className='basic-button'
                            onClick={handleSaveStudies}
                            disabled={isSaving || !selectedStudyType || attachedFiles.length === 0}
                            style={{
                                opacity: (isSaving || !selectedStudyType || attachedFiles.length === 0) ? 0.6 : 1,
                                cursor: (isSaving || !selectedStudyType || attachedFiles.length === 0) ? 'not-allowed' : 'pointer'
                            }}
                            title={
                                !selectedStudyType
                                    ? 'Select a study type first'
                                    : attachedFiles.length === 0
                                    ? 'Attach at least one file'
                                    : 'Save studies'
                            }
                        >
                            {isSaving ? 'Saving...' : 'Save Studies'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientStudy