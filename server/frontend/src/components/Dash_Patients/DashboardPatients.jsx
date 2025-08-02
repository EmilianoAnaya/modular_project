import './DashboardPatients.css'
import Section from '../Section/Section'
import Separator from '../Separator/Separator'

function DashboardPatients(){
    return (
        <>
            <Section headingText={"Search Patients"}>
                <div id='dash-search-container'>
                    <input placeholder='Patient Name' type='text' />
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
                            <th>Name</th>
                            <th>Last time opened by you</th>
                            <th>Last time updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gael Emiliano</td>
                            <td>xx/xx/xxxx</td>
                            <td>xx/xx/xxxx</td>
                            <td>shit fuck</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardPatients