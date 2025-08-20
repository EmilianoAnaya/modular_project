import MainNavbar from "./components/Main_Navbar/MainNavbar"
import PatientSidebar from "./components/Patient_Sidebar/PatientSidebar"
import "./styles/Patient.css"

function Patient(){
    return (
        <>
            <MainNavbar />
            <div className="main-container patient-container">
                <PatientSidebar />
                <div className="patient-content">

                </div>
            </div>
        </>
    )
}

export default Patient