import './DashboardNav.css'
import { useNavigate, useLocation } from 'react-router-dom'

function DashboardNav(){
    const navigation = useNavigate()
    const location = useLocation()

    const currentLocation = location.pathname

    const activePage = (path) => currentLocation === path ? 'active-page' : ''

    return (
        <>
        <div id='dash-nav'>
            <p className={`dash-nav-text ${activePage('/Dashboard/Profile')}`} onClick={() => navigation('/Dashboard/Profile')}>Doctor Name</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
            <p className={`dash-nav-text ${activePage('/Dashboard')}`} onClick={() => navigation('/Dashboard')}>Home</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
            <p className={`dash-nav-text ${activePage('/Dashboard/Patients')}`} onClick={() => navigation('/Dashboard/Patients')}>Patients</p>
            <img src='/assets/VerticalSeparator.svg' alt="" />
        </div>
        </>
    )
}

export default DashboardNav

