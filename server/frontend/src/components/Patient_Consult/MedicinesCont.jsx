import WindowContainer from '../Window_Container/WindowContainer'
import WindowConsultDefault from './WindowConsultDefault'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'
import './MedicinesCont.css'
import { useState } from 'react'

function MedicinesCont({ window, medicinesData, setMedicinesData }){
    const [currentMedicine, setCurrentMedicine] = useState({
        medicine: '',
        quantity: '',
        instructions: ''
    })

    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleNew = () => {
        setCurrentMedicine({
            medicine: '',
            quantity: '',
            instructions: ''
        })
        setSelectedIndex(null)
    }

    const handleSelectMedicine = (index) => {
        setSelectedIndex(index)
        setCurrentMedicine({...medicinesData[index]})
    }

    const handleSaveContinue = () => {
        if (!currentMedicine.medicine.trim()) {
            alert('Medicine name is required')
            return
        }

        if (selectedIndex !== null) {
            // Editar existente
            const newMedicines = [...medicinesData]
            newMedicines[selectedIndex] = currentMedicine
            setMedicinesData(newMedicines)
        } else {
            // Agregar nuevo
            setMedicinesData([...medicinesData, currentMedicine])
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
            if (confirm('¿Estás seguro de eliminar esta medicina?')) {
                const newMedicines = medicinesData.filter((_, i) => i !== selectedIndex)
                setMedicinesData(newMedicines)
                handleNew()
            }
        }
    }

    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table medicines-table'>
                    <div><h4>Medicine</h4></div>
                    <div><h4>Quantity</h4></div>
                    <div><h4>Instructions</h4></div>

                    {medicinesData.length === 0 ? (
                        <div className='consult-cell centered' style={{gridColumn: '1 / -1', fontStyle: 'italic', color: '#666'}}>
                            No medicines added yet. Click the edit button to add.
                        </div>
                    ) : (
                        medicinesData.map((medicine, index) => (
                            <>
                                <div key={`medicine-${index}-name`} className='consult-cell centered'>{medicine.medicine}</div>
                                <div key={`medicine-${index}-quantity`} className='consult-cell centered'>{medicine.quantity || 'N/A'}</div>
                                <div key={`medicine-${index}-instructions`} className='consult-cell'>{medicine.instructions || 'N/A'}</div>
                            </>
                        ))
                    )}
                </div>
            </div>

            <WindowContainer windowTitle={"Medicines"} showWindow={window}>
                <WindowConsultDefault
                    title_list='Medicines List'
                    items_list={medicinesData.map(m => m.medicine)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectMedicine}
                >
                    <div className='content-default-name'>
                        <BasicInput
                            label={"Medicine Name"}
                            value={currentMedicine.medicine}
                            onChange={(value) => setCurrentMedicine({...currentMedicine, medicine: value})}
                        />
                    </div>

                    <div className='default-information-description medicines-description'>
                        <Section headingText={"Medicine Instructions"} color='black' font_size='1.1em'>
                            <textarea
                                value={currentMedicine.instructions}
                                onChange={(e) => setCurrentMedicine({...currentMedicine, instructions: e.target.value})}
                                placeholder="Instructions for taking the medicine..."
                            />
                        </Section>
                    </div>

                    <div className='default-information-entries'>
                        <BasicInput
                            label={"Quantity"}
                            width='12em'
                            value={currentMedicine.quantity}
                            onChange={(value) => setCurrentMedicine({...currentMedicine, quantity: value})}
                        />
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    )
}

export default MedicinesCont