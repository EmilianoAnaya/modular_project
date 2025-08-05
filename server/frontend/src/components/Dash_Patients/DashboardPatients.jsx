import './DashboardPatients.css'
import Section from '../Section/Section'
import Separator from '../Separator/Separator'
import GridPatientsContent from './GridPatientsContent'

function DashboardPatients(){
    return (
        <>
            <Section headingText={"Search Patients"}>
                <div id='dash-search-container'>
                    <input placeholder='Patient Name' type='text' id='dash-search-input'/>
                    <button className='basic-button'>Search</button>
                    <button className='basic-button icon-button'>
                        <img src='/assets/user-plus.svg' />
                    </button>
                </div>
            </Section>
            <Separator />
            <div className='basic-container patients-cont'>
                <div className='patients-grid'>
                    <div className='patients-grid-header'>Patient Name</div>
                    <div className='patients-grid-header'>Last time opened by you</div>
                    <div className='patients-grid-header'>Last time updated</div>
                    <div className='patients-grid-header'>Actions</div>
                    
                    {/* Agregar rows por medio de este componente! */}
                    <GridPatientsContent />
                    
                </div>
            </div>
        </>
    )
}

export default DashboardPatients
