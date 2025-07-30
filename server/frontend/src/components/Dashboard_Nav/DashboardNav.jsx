import './DashboardNav.css'
import { useNavigate } from 'react-router-dom'

function DashboardNav(){
    const navigation = useNavigate()

    return (
        <>
        <div id='dash-nav'>
            <p className='dash-nav-text' onClick={() => navigation('/Dashboard/Profile')}>Doctor Name</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
            <p className='dash-nav-text ' onClick={() => navigation('/Dashboard')}>Home</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
            <p className='dash-nav-text' onClick={() => navigation('/Dashboard/Patients')}>Patients</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
        </div>
        </>
    )
}

export default DashboardNav

