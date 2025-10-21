import Heading from '../Heading/Heading'
import AllergiesCont from './AllergiesCont'
import MedicinesCont from './MedicinesCont'
import NotesCont from './NotesCont'
import ProblemsCont from './ProblemsCont'
import './PatientConsult.css'
import { useState } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientConsult(){
    const { patientData } = usePatient()
    const navigate = useNavigate()
    const vitals_info = [
        "Height (Mts)", "Weight (KG)", "Body Mass Index",
        "Temperature (C)", "Blood Pressure", "Pulse",
        "Respiratory Rate"
    ]

    const [vitalsData, setVitalsData] = useState({
        height: '',
        weight: '',
        bmi: '',
        temperature: '',
        blood_pressure: '',
        pulse: '',
        respiratory_rate: ''
    })

    const [problemsData, setProblemsData] = useState([])
    const [allergiesData, setAllergiesData] = useState([])
    const [medicinesData, setMedicinesData] = useState([])
    const [notesData, setNotesData] = useState('')

    const [windows, setWindows] = useState({
        problems : false,
        allergies : false,
        medicines : false
    })

    const vitalsMapping = {
        "Height (Mts)": "height",
        "Weight (KG)": "weight",
        "Body Mass Index": "bmi",
        "Temperature (C)": "temperature",
        "Blood Pressure": "blood_pressure",
        "Pulse": "pulse",
        "Respiratory Rate": "respiratory_rate"
    }

    const handleVitalChange = (displayName, value) => {
        const key = vitalsMapping[displayName]
        setVitalsData(prev => ({
            ...prev,
            [key]: value
        }))

        if (key === 'height' || key === 'weight') {
            const height = key === 'height' ? parseFloat(value) : parseFloat(vitalsData.height)
            const weight = key === 'weight' ? parseFloat(value) : parseFloat(vitalsData.weight)

            if (height > 0 && weight > 0) {
                const bmi = (weight / (height * height)).toFixed(2)
                setVitalsData(prev => ({
                    ...prev,
                    bmi: bmi
                }))
            }
        }
    }

    const handleSave = async () => {
        const hasVitals = Object.values(vitalsData).some(v => v !== '')
        const hasData = hasVitals || problemsData.length > 0 || allergiesData.length > 0 ||
                       medicinesData.length > 0 || notesData.trim() !== ''

        if (!hasData) {
            alert('Por favor llena al menos una sección antes de guardar.')
            return
        }

        if (!confirm('¿Ya terminaste de llenar los datos? La consulta se guardará y te redirigirá a la página de Record.')) {
            return
        }

        try {
            const userId = localStorage.getItem('userId')
            if (!userId) {
                alert('No se encontró información del doctor. Por favor inicia sesión nuevamente.')
                return
            }

            const doctorResponse = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.DOCTOR}/${userId}`))
            const doctorData = await doctorResponse.json()

            if (!doctorResponse.ok) {
                alert('Error al obtener información del doctor: ' + doctorData.error)
                return
            }

            const doctorId = doctorData.doctor_id

            const consultationData = {
                vitals: vitalsData,
                problems: problemsData,
                allergies: allergiesData,
                medicines: medicinesData,
                notes: notesData
            }

            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MEDICAL_RECORDS), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    patient_id: patientData.patient_id,
                    doctor_id: doctorId,
                    consultation_data: consultationData
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert('¡Consulta guardada exitosamente!')
                navigate('/Patient/Record')
            } else {
                alert('Error al guardar: ' + data.error)
            }
        } catch (error) {
            console.error('Error saving consultation:', error)
            alert('Error al conectar con el servidor. Verifica que el backend esté corriendo.')
        }
    }

    return (
        <>
            <div className='patient-consult-container'>
                <div className='consult-tools con-tls-1'>
                    <div className='consult-box'>
                        <Heading headingText={"Vitals"} />
                        <div className='basic-container consult-info-box vitals-info'>
                            {vitals_info.map((element) => (
                                <div key={element} className='vitals-info-row'>
                                    <span>{element}</span>
                                    <input
                                        value={vitalsData[vitalsMapping[element]]}
                                        onChange={(e) => handleVitalChange(element, e.target.value)}
                                        type={element.includes("Height") || element.includes("Weight") || element.includes("Temperature") || element.includes("Pulse") || element.includes("Rate") ? "number" : "text"}
                                        step={element.includes("Height") ? "0.01" : "1"}
                                        readOnly={element === "Body Mass Index"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='consult-box'>
                        <Heading headingText={"Problems"} trigger={[windows.problems, (value) => setWindows({...windows, problems: value})]}/>
                        <ProblemsCont
                            window={[windows.problems, (value) => setWindows({...windows, problems: value})]}
                            problemsData={problemsData}
                            setProblemsData={setProblemsData}
                        />
                    </div>
                </div>
                <div className='consult-tools con-tls-2'>
                    <div className='consult-box'>
                        <Heading headingText={"Allergies"} trigger={[windows.allergies, (value) => setWindows({...windows, allergies: value})]}/>
                        <AllergiesCont
                            window={[windows.allergies, (value) => setWindows({...windows, allergies: value})]}
                            allergiesData={allergiesData}
                            setAllergiesData={setAllergiesData}
                        />
                    </div>

                    <div className='consult-box'>
                        <Heading headingText={"Medicines"} trigger={[windows.medicines, (value) => setWindows({...windows, medicines: value})]}/>
                        <MedicinesCont
                            window={[windows.medicines, (value) => setWindows({...windows, medicines: value})]}
                            medicinesData={medicinesData}
                            setMedicinesData={setMedicinesData}
                        />
                    </div>

                    <div className='consult-box'>
                        <Heading headingText={"Notes"} />
                        <NotesCont notesData={notesData} setNotesData={setNotesData} />
                    </div>
                </div>

                <button className='basic-button patient-consult-button' onClick={handleSave} >
                    Save
                </button>
            </div>
        </>
    )
}

export default PatientConsult