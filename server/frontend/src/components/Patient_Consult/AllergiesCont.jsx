import WindowContainer from '../Window_Container/WindowContainer'
import WindowConsultDefault from './WindowConsultDefault'
import BasicInput from '../Basic_Input/BasicInput'
import './AllergiesCont.css'
import Section from '../Section/Section'
import { useState } from 'react'

function AllergiesCont({ window, allergiesData, setAllergiesData }){
    const [currentAllergy, setCurrentAllergy] = useState({
        allergen: '',
        reaction: ''
    })

    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleNew = () => {
        setCurrentAllergy({
            allergen: '',
            reaction: ''
        })
        setSelectedIndex(null)
    }

    const handleSelectAllergy = (index) => {
        setSelectedIndex(index)
        setCurrentAllergy({...allergiesData[index]})
    }

    const handleSaveContinue = () => {
        if (!currentAllergy.allergen.trim()) {
            alert('Allergen name is required')
            return
        }

        if (selectedIndex !== null) {
            // Editar existente
            const newAllergies = [...allergiesData]
            newAllergies[selectedIndex] = currentAllergy
            setAllergiesData(newAllergies)
        } else {
            // Agregar nuevo
            setAllergiesData([...allergiesData, currentAllergy])
        }

        // Limpiar formulario
        handleNew()
    }

    const handleSaveExit = () => {
        handleSaveContinue()
        window[1](false)
    }

    const handleDelete = () => {
        if (selectedIndex !== null) {
            if (confirm('¿Estás seguro de eliminar esta alergia?')) {
                const newAllergies = allergiesData.filter((_, i) => i !== selectedIndex)
                setAllergiesData(newAllergies)
                handleNew()
            }
        }
    }

    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table allergies-table'>
                    <div><h4>Allergen</h4></div>
                    <div><h4>Reaction</h4></div>

                    {allergiesData.length === 0 ? (
                        <div className='consult-cell centered' style={{gridColumn: '1 / -1', fontStyle: 'italic', color: '#666'}}>
                            No allergies added yet. Click the edit button to add.
                        </div>
                    ) : (
                        allergiesData.map((allergy, index) => (
                            <>
                                <div key={`allergy-${index}-allergen`} className='consult-cell centered'>{allergy.allergen}</div>
                                <div key={`allergy-${index}-reaction`} className='consult-cell'>{allergy.reaction || 'N/A'}</div>
                            </>
                        ))
                    )}
                </div>
            </div>

            <WindowContainer windowTitle={"Allergies"} showWindow={window}>
                <WindowConsultDefault
                    title_list='Allergens List'
                    items_list={allergiesData.map(a => a.allergen)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectAllergy}
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

export default AllergiesCont