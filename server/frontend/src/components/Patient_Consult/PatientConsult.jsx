import Heading from '../Heading/Heading'
import AllergiesCont from './AllergiesCont'
import MedicinesCont from './MedicinesCont'
import NotesCont from './NotesCont'
import ProblemsCont from './ProblemsCont'
import './PatientConsult.css'

import { useState } from 'react'

function PatientConsult(){
    const vitals_info = [
        "Height (Mts)", "Weight (KG)", "Body Mass Index", 
        "Temperature (C)", "Blood Pressure", "Pulse",
        "Respiratory Rate"
    ]

    const [problemsWindow, setProblemsWindow] = useState(false)

    return (
        <>
            <div className='patient-consult-container'>
                <div className='consult-tools con-tls-1'>
                    <div className='consult-box con-vitals'>
                        <Heading headingText={"Vitals"} />
                        <div className='basic-container consult-info-box vitals-info'>
                            {vitals_info.map((element) => (
                                <div className='vitals-info-row'>
                                    <span>{element}</span>
                                    <input></input>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className='consult-box con-problems'>
                        <Heading headingText={"Problems"} trigger={[problemsWindow, setProblemsWindow]}/>
                        <ProblemsCont window={[problemsWindow, setProblemsWindow]}/>
                    </div>
                </div>
                <div className='consult-tools con-tls-2'>
                    <div className='consult-box con-allergies'>
                        <Heading headingText={"Allergies"} trigger={"allergies-window"}/>
                        <AllergiesCont />
                    </div>

                    <div className='consult-box con-medicines'>
                        <Heading headingText={"Medicines"} trigger={"medicines-window"}/>
                        <MedicinesCont />
                    </div>
                    <div className='consult-box con-notes'>
                        <Heading headingText={"Notes"} />
                        <NotesCont />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientConsult