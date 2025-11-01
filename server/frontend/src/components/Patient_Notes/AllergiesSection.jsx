import React, { useState, useEffect } from 'react'
import { usePatient } from '../../hooks/usePatient'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'
import WindowContainer from '../Window_Container/WindowContainer'
import WindowConsultDefault from '../Patient_Consult/WindowConsultDefault'
import BasicInput from '../Basic_Input/BasicInput'
import Section from '../Section/Section'
import Heading from '../Heading/Heading'
import './AllergiesSection.css'

function AllergiesSection() {
    const { patientData } = usePatient()
    const [allergies, setAllergies] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [currentAllergy, setCurrentAllergy] = useState({
        allergen: '',
        reaction: ''
    })

    useEffect(() => {
        if (patientData) {
            loadAllergies()
        }
    }, [patientData])

    const loadAllergies = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES_BY_PATIENT}/${patientData.patient_id}/Allergy`)
            )
            const data = await response.json()

            if (response.ok) {
                setAllergies(data.notes)
            } else {
                console.error('Error loading allergies:', data.error)
            }
        } catch (error) {
            console.error('Error fetching allergies:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleNew = () => {
        setCurrentAllergy({
            allergen: '',
            reaction: ''
        })
        setSelectedIndex(null)
    }

    const handleSelectAllergy = (index) => {
        setSelectedIndex(index)
        const allergyData = allergies[index].note_data
        setCurrentAllergy({
            allergen: allergyData.allergen || '',
            reaction: allergyData.reaction || ''
        })
    }

    const handleSaveContinue = async () => {
        if (!currentAllergy.allergen.trim()) {
            alert('Allergen name is required')
            return
        }

        try {
            if (selectedIndex !== null) {
                const allergyId = allergies[selectedIndex].id
                const response = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${allergyId}`),
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            note_data: currentAllergy
                        })
                    }
                )

                if (response.ok) {
                    await loadAllergies()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error updating allergy: ' + data.error)
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
                            note_type: 'Allergy',
                            note_data: currentAllergy
                        })
                    }
                )

                if (response.ok) {
                    await loadAllergies()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error creating allergy: ' + data.error)
                }
            }
        } catch (error) {
            console.error('Error saving allergy:', error)
            alert('Error connecting to server')
        }
    }

    const handleSaveExit = async () => {
        await handleSaveContinue()
        setShowModal(false)
    }

    const handleDelete = async () => {
        if (selectedIndex !== null) {
            if (!confirm('¿Estás seguro de eliminar esta alergia?')) {
                return
            }

            try {
                const allergyId = allergies[selectedIndex].id
                const response = await fetch(
                    getApiUrl(`${API_CONFIG.ENDPOINTS.MEDICAL_NOTES}/${allergyId}`),
                    {
                        method: 'DELETE'
                    }
                )

                if (response.ok) {
                    await loadAllergies()
                    handleNew()
                } else {
                    const data = await response.json()
                    alert('Error deleting allergy: ' + data.error)
                }
            } catch (error) {
                console.error('Error deleting allergy:', error)
                alert('Error connecting to server')
            }
        }
    }

    if (loading) {
        return (
            <div className='patient-records-container'>
                <p>Loading allergies...</p>
            </div>
        )
    }

    return (
        <>
            <div className='patient-records-container'>
                <div className='patient-records-item'>
                    <div className="allergies-heading-with-button">
                        <Heading headingText={"Allergies"} />
                    </div>
                    <div className="allergies-table-wrapper">
                        <div className='patient-record-sub-cont allergies-records-table'>
                            <p>Allergen</p>
                            <p>Description</p>
                            <p>Actions</p>

                            {allergies.length === 0 ? (
                                <p style={{gridColumn: '1 / -1', padding: '1em', fontStyle: 'italic', fontSize: '.9em', color: '#666'}}>
                                    No allergies registered. Click "Add" to create one.
                                </p>
                            ) : (
                                allergies.map((allergy, index) => (
                                    <React.Fragment key={allergy.id}>
                                        <p>{allergy.note_data.allergen}</p>
                                        <p>{allergy.note_data.reaction || 'No description'}</p>
                                        <div className='patient-record-buttons'>
                                            <button
                                                className='basic-button table-button view-button'
                                                onClick={() => {
                                                    handleSelectAllergy(index)
                                                    setShowModal(true)
                                                }}
                                                title='View details'
                                            >
                                                <img
                                                    src="/assets/glasses.svg"
                                                    alt="View allergy"
                                                    className='view-icon'/>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        <div className="add-allergy-container">
                            <button
                                className="add-allergy-btn"
                                onClick={() => {
                                    handleNew()
                                    setShowModal(true)
                                }}
                            >
                                <img src="/assets/plus.svg" alt="Add" className="add-icon" />
                                Add Allergy
                            </button>
                        </div>
                    </div>
                </div>
                <div className="allergies-illustration-container">
                    <img
                        src="/assets/allergies.jpg"
                        alt="Allergies illustration"
                        className="allergies-illustration"
                    />
                </div>
            </div>

            <WindowContainer windowTitle={"Allergy"} showWindow={[showModal, setShowModal]}
                styleContainer='window-notes-section'>
                <WindowConsultDefault
                    title_list='Allergens List'
                    items_list={allergies.map(a => a.note_data.allergen)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={(index) => {
                        handleSelectAllergy(index)
                    }}
                >
                    <div className='content-default-name'>
                        <BasicInput
                            label={"Allergen"}
                            value={currentAllergy.allergen}
                            onChange={(value) => setCurrentAllergy({...currentAllergy, allergen: value})}
                        />
                    </div>

                    <div className='default-information-description allergies-description'>
                        <Section headingText={"Reaction Description"} color='black' font_size='1.1em'>
                            <textarea
                                value={currentAllergy.reaction}
                                onChange={(e) => setCurrentAllergy({...currentAllergy, reaction: e.target.value})}
                                placeholder="Describe the reaction..."
                            />
                        </Section>
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    )
}

export default AllergiesSection