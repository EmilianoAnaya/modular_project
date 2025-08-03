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
                <table id='patients-table'>
                    <thead>
                        <tr>
                            <th style={{"width" : "30%"}}>Name</th>
                            <th style={{"width" : "20%"}}>Last time opened by you</th>
                            <th style={{"width" : "20%"}}>Last time updated</th>
                            <th style={{"width" : "30%"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gael Emiliano Anaya Garcia</td>
                            <td>xx/xx/xxxx</td>
                            <td>
                                xx/xx/xxxx
                                <button className='basic-button icon-button'>
                                    <img src='/assets/file-check-2.svg'/>
                                </button>
                            </td>
                            <td>
                                <button className='basic-button'>Consult</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardPatients