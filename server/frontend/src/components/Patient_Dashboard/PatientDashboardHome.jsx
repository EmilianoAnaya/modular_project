import './PatientDashboardHome.css'
import Section from '../Section/Section'
import PatientDashboardCalendar from './PatientDashboardCalendar'
import { useState, useEffect } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function PatientDashboardHome() {
    const { patientData } = usePatient()
    const [token, setToken] = useState(null)
    const [tokenVisible, setTokenVisible] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedDate, setSelectedDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: null
    })

    useEffect(() => {
        if (patientData?.token) {
            setToken(patientData.token)
        }
    }, [patientData])

    const generateNewToken = async () => {
        if (!confirm('Generate a new token? This will invalidate your previous token.')) {
            return
        }

        setIsGenerating(true)
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}/${patientData.patient_id}/generate-token`),
                {
                    method: 'POST'
                }
            )
            const data = await response.json()

            if (response.ok) {
                setToken(data.token)
                setTokenVisible(true)
                alert('New token generated successfully!')
            } else {
                alert('Error generating token: ' + data.error)
            }
        } catch (error) {
            console.error('Error generating token:', error)
            alert('Error generating token')
        } finally {
            setIsGenerating(false)
        }
    }

    const copyToClipboard = () => {
        if (token) {
            navigator.clipboard.writeText(token)
            alert('Token copied to clipboard!')
        }
    }

    return (
        <>
            <div id='patient-dash-home'>
                <div id='patient-dash-token-section'>
                    <Section headingText={"Access Token"}>
                        <div className='basic-container token-content-wrapper'>
                            <p className='token-description'>
                                Share this token with your doctor to grant access to your medical information.
                            </p>

                            <div className='token-display-area'>
                                {tokenVisible ? (
                                    <div className='token-display'>
                                        <code className='token-code'>{token}</code>
                                        <button
                                            className='basic-button copy-button icon-button'
                                            onClick={copyToClipboard}
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </button>
                                    </div>
                                ) : (
                                    <div className='token-hidden'>
                                        <p>Click "Show Token" to reveal your access code</p>
                                    </div>
                                )}
                            </div>

                            <div className='token-buttons'>
                                <button
                                    className='basic-button'
                                    onClick={() => setTokenVisible(!tokenVisible)}
                                >
                                    {tokenVisible ? 'Hide Token' : 'Show Token'}
                                </button>
                                <button
                                    className='basic-button generate-button'
                                    onClick={generateNewToken}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? 'Generating...' : 'Generate New Token'}
                                </button>
                            </div>

                            <div className='token-info'>
                                <p>⚠️ Keep your token secure and only share it with authorized medical professionals.</p>
                                <p>🔄 Generating a new token will invalidate the previous one.</p>
                            </div>
                        </div>
                    </Section>
                </div>
                <div id='patient-dash-calendar-section'>
                    <PatientDashboardCalendar
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setWindowVisibility={() => {}}
                    />
                </div>
            </div>
        </>
    )
}

export default PatientDashboardHome