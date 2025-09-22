import React, { useState, useEffect } from 'react'
import './DashboardNav.css'
import { useNavigate, useLocation } from 'react-router-dom'

function DashboardNav(){
    const navigation = useNavigate()
    const location = useLocation()
    const [doctorName, setDoctorName] = useState("Doctor Name")

    const currentLocation = location.pathname

    const activePage = (path) => currentLocation === path ? 'active-page' : ''

    useEffect(() => {
        const firstName = localStorage.getItem('userFirstName')
        const lastName = localStorage.getItem('userLastName')

        if (firstName && lastName) {
            setDoctorName(`${firstName} ${lastName}`)
        } else if (firstName) {
            setDoctorName(firstName)
        }
    }, [])

    const navSections = [
        { path  : "/Dashboard/Profile" , name : doctorName },
        { path  : "/Dashboard" , name : "Home"},
        { path  : "/Dashboard/Patients" , name : "Patients"}
    ]

    return (
        <>
            <div id='dash-nav'>
                {navSections.map((section, index) => (
                    <React.Fragment key={index}>
                        <p className={`dash-nav-text ${activePage(section.path)}`} onClick={() => navigation(section.path)}>{ section.name }</p>
                        { index < navSections.length - 1 && (<img src='/assets/VerticalSeparator.svg' alt="" />) }
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default DashboardNav

