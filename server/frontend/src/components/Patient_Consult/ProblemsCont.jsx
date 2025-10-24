import WindowContainer from '../Window_Container/WindowContainer'
import WindowConsultDefault from './WindowConsultDefault'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'
import BasicSelect from '../BasicSelect/BasicSelect'
import './ProblemsCont.css'
import { useState } from 'react'

function ProblemsCont({ window, problemsData, setProblemsData }){
    const [currentProblem, setCurrentProblem] = useState({
        problem_name: '',
        description: '',
        onset: '',
        severity: '',
        duration: ''
    })

    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleNew = () => {
        setCurrentProblem({
            problem_name: '',
            description: '',
            onset: '',
            severity: '',
            duration: ''
        })
        setSelectedIndex(null)
    }

    const handleSelectProblem = (index) => {
        setSelectedIndex(index)
        setCurrentProblem({...problemsData[index]})
    }

    const handleSaveContinue = () => {
        if (!currentProblem.problem_name.trim()) {
            alert('Problem name is required')
            return
        }

        if (selectedIndex !== null) {
            // Editar existente
            const newProblems = [...problemsData]
            newProblems[selectedIndex] = currentProblem
            setProblemsData(newProblems)
        } else {
            // Agregar nuevo
            setProblemsData([...problemsData, currentProblem])
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
            if (confirm('¿Estás seguro de eliminar este problema?')) {
                const newProblems = problemsData.filter((_, i) => i !== selectedIndex)
                setProblemsData(newProblems)
                handleNew()
            }
        }
    }

    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table problems-table'>
                    <div><h4>Problem Name</h4></div>
                    <div><h4>Description</h4></div>
                    <div><h4>Onset</h4></div>
                    <div><h4>Severity</h4></div>
                    <div><h4>Duration</h4></div>

                    {problemsData.length === 0 ? (
                        <div className='consult-cell centered' style={{gridColumn: '1 / -1', fontStyle: 'italic', color: '#666'}}>
                            No problems added yet. Click the edit button to add.
                        </div>
                    ) : (
                        problemsData.map((problem, index) => (
                            <>
                                <div key={`problem-${index}-name`} className='consult-cell centered'>{problem.problem_name}</div>
                                <div key={`problem-${index}-desc`} className='consult-cell justified'>{problem.description || 'N/A'}</div>
                                <div key={`problem-${index}-onset`} className='consult-cell centered'>{problem.onset || 'N/A'}</div>
                                <div key={`problem-${index}-severity`} className='consult-cell centered'>{problem.severity || 'N/A'}</div>
                                <div key={`problem-${index}-duration`} className='consult-cell centered'>{problem.duration || 'N/A'}</div>
                            </>
                        ))
                    )}
                </div>
            </div>

            <WindowContainer windowTitle={"Problems"} showWindow={window}>
                <WindowConsultDefault
                    title_list='Problems List'
                    items_list={problemsData.map(p => p.problem_name)}
                    selectedIndex={selectedIndex}
                    onNew={handleNew}
                    onSaveContinue={handleSaveContinue}
                    onSaveExit={handleSaveExit}
                    onDelete={handleDelete}
                    onSelectItem={handleSelectProblem}
                >
                    <div className='content-default-name'>
                        <BasicInput
                            label={"Problem Name"}
                            value={currentProblem.problem_name}
                            onChange={(value) => setCurrentProblem({...currentProblem, problem_name: value})}
                        />
                    </div>

                    <div className='default-information-description problems-description'>
                        <Section headingText={"Problems Description"} color='black' font_size='1.1em'>
                            <textarea
                                value={currentProblem.description}
                                onChange={(e) => setCurrentProblem({...currentProblem, description: e.target.value})}
                                placeholder="Describe the problem..."
                            />
                        </Section>
                    </div>

                    <div className='default-information-entries'>
                        <BasicInput
                            label={"Onset"}
                            inputType="date"
                            width='12em'
                            value={currentProblem.onset}
                            onChange={(value) => setCurrentProblem({...currentProblem, onset: value})}
                        />
                        <BasicSelect
                            label={"Severity"}
                            options={["Mild", "Moderated", "Severe"]}
                            width='12em'
                            value={currentProblem.severity}
                            onChange={(e) => setCurrentProblem({...currentProblem, severity: e.target.value})}
                        />
                        <BasicInput
                            label={"Duration"}
                            width='12em'
                            value={currentProblem.duration}
                            onChange={(value) => setCurrentProblem({...currentProblem, duration: value})}
                        />
                    </div>
                </WindowConsultDefault>
            </WindowContainer>
        </>
    )
}

export default ProblemsCont