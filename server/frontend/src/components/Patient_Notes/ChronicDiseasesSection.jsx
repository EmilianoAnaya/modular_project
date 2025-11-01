import React, { useState, useEffect,  useRef } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'
import WindowContainer from '../Window_Container/WindowContainer'
import WindowConsultDefault from '../Patient_Consult/WindowConsultDefault'
import BasicInput from '../Basic_Input/BasicInput'
import Section from '../Section/Section'
import Heading from '../Heading/Heading'
import './ChronicDiseasesSection.css'

function ChronicDiseasesSection({ addTrigger = true }) {
    const { patientData } = usePatient()
    const [diseases, setDiseases] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [currentDisease, setCurrentDisease] = useState({
        disease_name: '',
        description: ''
    })

    const [sortOrder, setSortOrder] = useState('desc');
    const sortMenuRef = useRef(null);
    const [showSortMenu, setShowSortMenu] = useState(false);

    useEffect(() => {
        if (patientData) {
            loadDiseases()
        }
    }, [patientData])

    useEffect(() => {
            const handleClickOutside = (event) => {
                if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
                    setShowSortMenu(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadDiseases = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES_BY_PATIENT}/${patientData.patient_id}/Chronical Disease`)
            )
            const data = await response.json()

            if (response.ok) {
                setDiseases(data.notes)
            } else {
                console.error('Error loading diseases:', data.error)
            }
        } catch (error) {
            console.error('Error fetching diseases:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleNew = () => {
        setCurrentDisease({
            disease_name: '',
            description: ''
        })
        setSelectedIndex(null)
    }

    const handleSelectDisease = (index) => {
        setSelectedIndex(index)
        const diseaseData = diseases[index].note_data
        setCurrentDisease({
            disease_name: diseaseData.disease_name || '',
            description: diseaseData.description || ''
        })
    }

    const handleSaveContinue = async () => {
        if (!currentDisease.disease_name.trim()) {
            alert('Disease name is required')
            return
        }

        try {
            if (selectedIndex !== null) {
                const diseaseId = diseases[selectedIndex].id
                const response = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${diseaseId}`),
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            note_data: currentDisease
                        })
                    }
                )

                if (response.ok) {
                    await loadDiseases()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error updating disease: ' + data.error)
                }
            } else {
                const response = await fetch(
                    getApiUrl(API_CONFIG.ENDPOINTS.MEDICAL_NOTES),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            patient_id: patientData.patient_id,
                            note_type: 'Chronical Disease',
                            note_data: currentDisease
                        })
                    }
                )

                if (response.ok) {
                    await loadDiseases()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error creating disease: ' + data.error)
                }
            }
        } catch (error) {
            console.error('Error saving disease:', error)
            alert('Error connecting to server')
        }
    }

    const handleSaveExit = async () => {
        await handleSaveContinue()
        setShowModal(false)
    }

    const handleDelete = async () => {
        if (selectedIndex !== null) {
            if (!confirm('Are you sure you want to delete this chronic disease?')) {
                return
            }
            try {
                const diseaseId = diseases[selectedIndex].id
                const response = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${diseaseId}`),
                    {
                        method: 'DELETE'
                    }
                )

                if (response.ok) {
                    await loadDiseases()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error deleting disease: ' + data.error)
                }
            } catch (error) {
                console.error('Error deleting disease:', error)
                alert('Error connecting to server')
            }
        }
    }

    if (loading) {
        return (
            <div className='chronic-diseases-container'>
                <p>Loading chronic diseases...</p>
            </div>
        )
    }

    return (
        <>
            <div className='patient-records-container chronic-diseases-container'>
                <div className='patient-records-item chronic-diseases-item'>
                    <div className="diseases-heading-with-button">
                        <Heading headingText="Chronic Diseases" />
                    </div>

                    <div className="diseases-table-wrapper">
                        <div className='patient-record-sub-cont chronic-diseases-sub-container diseases-records-table'>
                            <p>Disease</p>
                            <p>Description</p>
                            <p>Actions</p>

                            {diseases.length === 0 ? (
                                <p style={{gridColumn: '1 / -1', padding: '1em', fontStyle: 'italic', fontSize: '.9em', color: '#666'}}>
                                    No chronic diseases registered. { addTrigger && ("Click 'Add' to create one.") }
                                </p>
                            ) : (
                                diseases.map((disease, index) => (
                                    <React.Fragment key={disease.id}>
                                        <p>{disease.note_data.disease_name}</p>
                                        <p>{disease.note_data.description || 'No description'}</p>
                                        <div className='disease-record-buttons'>
                                            <button
                                                className='basic-button table-button view-button'
                                                onClick={() => {
                                                    handleSelectDisease(index)
                                                    setShowModal(true)
                                                }}
                                                title='View details'
                                            >
                                                <img
                                                    src="/assets/glasses.svg"
                                                    alt="View disease"
                                                    className='view-icon'/>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        { addTrigger && (
                          <div className="add-disease-container">
                              <button
                                  className="add-disease-btn"
                                  onClick={() => {
                                      handleNew()
                                      setShowModal(true)
                                  }}
                              >
                                  <img src="/assets/plus.svg" alt="Add" className="add-icon" />
                                  Add Chronic Disease
                              </button>
                          </div>
                        )}
                    </div>
                </div>

                <div className="diseases-illustration-container">
                    <img
                        src="/assets/chronic-diseases.jpg"
                        alt="Chronic diseases illustration"
                        className="diseases-illustration"
                    />
                </div>
            </div>

            <WindowContainer
                windowTitle="Chronic Disease"
                showWindow={[showModal, setShowModal]}
                styleContainer='window-notes-section'
            >
                <WindowConsultDefault
                    title_list='Diseases List'
                    items_list={diseases.map(d => d.note_data.disease_name)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={(index) => handleSelectDisease(index)}
                >
                    <div className='content-default-name'>
                        <BasicInput
                            label="Disease"
                            value={currentDisease.disease_name}
                            onChange={(value) => setCurrentDisease({...currentDisease, disease_name: value})}
                        />
                    </div>

                    <div className='default-information-description diseases-description'>
                        <Section headingText="Disease Description" color='black' font_size='1.1em'>
                            <textarea
                                value={currentDisease.description}
                                onChange={(e) => setCurrentDisease({...currentDisease, description: e.target.value})}
                                placeholder="Describe the disease..."
                            />
                        </Section>
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    )
}

export default ChronicDiseasesSection
