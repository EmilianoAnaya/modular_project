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

    const [windows, setWindows] = useState({
        problems : false,
        allergies : false,
        medicines : false
    })

    return (
        <>
            <div className='patient-consult-container'>
                <div className='consult-tools con-tls-1'>
                    <div className='consult-box'>
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
                    
                    <div className='consult-box'>
                        <Heading headingText={"Problems"} trigger={[windows.problems, (value) => setWindows({...windows, problems: value})]}/>
                        <ProblemsCont window={[windows.problems, (value) => setWindows({...windows, problems: value})]}/>
                    </div>
                </div>
                <div className='consult-tools con-tls-2'>
                    <div className='consult-box'>
                        <Heading headingText={"Allergies"} trigger={[windows.allergies, (value) => setWindows({...windows, allergies: value})]}/>
                        <AllergiesCont window={[windows.allergies, (value) => setWindows({...windows, allergies: value})]}/>
                    </div>

                    <div className='consult-box'>
                        <Heading headingText={"Medicines"} trigger={[windows.medicines, (value) => setWindows({...windows, medicines: value})]}/>
                        <MedicinesCont window={[windows.medicines, (value) => setWindows({...windows, medicines: value})]}/>
                    </div>

                    <div className='consult-box'>
                        <Heading headingText={"Notes"} />
                        <NotesCont />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientConsult