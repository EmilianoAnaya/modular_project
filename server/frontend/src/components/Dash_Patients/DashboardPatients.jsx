import { useState } from 'react'

import './DashboardPatients.css'
import Section from '../Section/Section'
import Separator from '../Separator/Separator'
import GridPatient from './GridPatient'
import AddPatient from './AddPatient'

function DashboardPatients(){
    const [currentPage, setCurrentPage] = useState("GridPatient")

    const togglePage = () => {
        currentPage === "GridPatient" ? setCurrentPage("AddPatient") : setCurrentPage("GridPatient")
    }

    return (
        <>
            <Section headingText={"Search Patients"}>
                <div id='dash-search-container'>
                    <input placeholder='Patient Name' type='text' id='dash-search-input'/>
                    <button className='basic-button'>Search</button>
                    <button className='basic-button icon-button' onClick={() => togglePage()}>
                        <img src={`/assets/${currentPage === "GridPatient" ? "user-plus.svg" : "chevron-left.svg"}`} />
                    </button>
                </div>
            </Section>
            <Separator />
            {currentPage === "GridPatient" ? <GridPatient /> : <AddPatient />}
        </>
    )
}

export default DashboardPatients
