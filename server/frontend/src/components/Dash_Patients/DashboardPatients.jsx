import './DashboardPatients.css'
import Section from '../Section/Section'
import Separator from '../Separator/Separator'

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
                <div id='patients-grid'>
                    <div className='patients-row'>
                        <div>Patient Name</div>
                        <div>Last time opened by you</div>
                        <div>Last time updated</div>
                        <div>Actions</div>
                    </div>
                    <div className='patients-row patients-content'>
                        <div className='patients-content-1st'>Patient Name</div>
                        <div>xx/xx/xxxx</div>
                        <div className='patients-content-3st'>
                            <span>xx/xx/xxxx</span>
                            <button className='basic-button icon-button table-button'>
                                <img src='/assets/file-check-2.svg' />
                            </button>
                        </div>
                        <div>
                            <button className='basic-button table-button'>Consult</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPatients