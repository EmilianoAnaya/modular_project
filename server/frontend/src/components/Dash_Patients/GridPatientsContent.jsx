import { useState } from "react"
import { useNavigate } from "react-router-dom"
import WindowContainer from "../Window_Container/WindowContainer"
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function GridPatientsContent({ patient }){
    const navigation = useNavigate()
    const [showTokenModal, setShowTokenModal] = useState(false)
    const [tokenInput, setTokenInput] = useState('')
    const [targetRoute, setTargetRoute] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)

    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    // Función para verificar token
    const verifyToken = async () => {
        if (!tokenInput.trim()) {
            alert('Please enter a token')
            return
        }

        setIsVerifying(true)
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}/${patient.patient_id}`)
            )
            const data = await response.json()

            if (response.ok && data.patient.token === tokenInput.trim()) {
                // Token correcto
                sessionStorage.setItem('selectedPatientId', patient.patient_id)
                setShowTokenModal(false)
                setTokenInput('')
                navigation(targetRoute)
            } else {
                alert('Invalid token. Access denied.')
                setTokenInput('')
            }
        } catch (error) {
            console.error('Error verifying token:', error)
            alert('Error verifying token')
        } finally {
            setIsVerifying(false)
        }
    }

    // Función para manejar Enter en el input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            verifyToken()
        }
    }

    // Función para manejar clic en View
    const handleViewClick = () => {
        if (patient && patient.patient_id) {
            setTargetRoute("/Patient/Notes")
            setShowTokenModal(true)
        }
    }

    // Función para manejar clic en Consult
    const handleConsultClick = () => {
        if (patient && patient.patient_id) {
            setTargetRoute("/Patient/Consult")
            setShowTokenModal(true)
        }
    }

    // Si no hay paciente, mostrar placeholder
    if (!patient) {
        return (
            <>
                <div className='patients-grid-content patients-column-1'>
                    <span>No patient data</span>
                </div>
                <div className='patients-grid-content'>
                    <span>N/A</span>
                </div>
                <div className='patients-grid-content patients-column-3'>
                    <span>N/A</span>
                    <button className='basic-button icon-button table-button'>
                        <img src='/assets/file-check-2.svg'/>
                    </button>
                </div>
                <div className='patients-grid-content'>
                    <button className='basic-button table-button'>Consult</button>
                    <button className='basic-button table-button'>View</button>
                </div>
            </>
        )
    }

    return(
        <>
            <div className='patients-grid-content patients-column-1'>
                <span>{`${patient.first_name} ${patient.last_name}`}</span>
            </div>
            <div className='patients-grid-content'>
                <span>N/A</span>
            </div>
            <div className='patients-grid-content patients-column-3'>
                <span>{formatDate(patient.created_at)}</span>
                <button className='basic-button icon-button table-button'>
                    <img src='/assets/file-check-2.svg'/>
                </button>
            </div>
            <div className='patients-grid-content'>
                <button
                    className='basic-button table-button'
                    onClick={handleConsultClick}
                    title="Start new consultation"
                >
                    Consult
                </button>
                <button
                    className='basic-button table-button'
                    onClick={handleViewClick}
                    title="View patient records"
                >
                    View
                </button>
            </div>

            {/* Modal de verificación de token */}
            <WindowContainer
                windowTitle="Token Verification"
                showWindow={[showTokenModal, setShowTokenModal]}
                styleContainer='token-verification-modal'
            >
                <div className='token-modal-content'>
                    <p style={{marginBottom: '1.5em', textAlign: 'center', color: '#666'}}>
                        Please enter the patient's token to access their information
                    </p>
                    
                    <div style={{marginBottom: '1em'}}>
                        <label style={{display: 'block', marginBottom: '0.5em', fontWeight: 'bold'}}>
                            Token
                        </label>
                        <input 
                            type="text"
                            value={tokenInput}
                            onChange={(e) => setTokenInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter patient token..."
                            disabled={isVerifying}
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '1em',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button 
                        className='basic-button'
                        onClick={verifyToken}
                        disabled={isVerifying}
                        style={{
                            width: '100%',
                            marginTop: '1em'
                        }}
                    >
                        {isVerifying ? 'Verifying...' : 'Submit'}
                    </button>
                </div>
            </WindowContainer>
        </>
    )
}

export default GridPatientsContent