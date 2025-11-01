import "./PatientSidebar.css"
import { useLocation, useNavigate } from "react-router-dom"
import SidebarButton from "./SidebarButton";
import { usePatient } from "../../hooks/usePatient";

function PatientSidebar(){
    const navigation = useNavigate();
    const location = useLocation();
    const { patientData, loading, error } = usePatient();

    const activeScreen = location.pathname.includes("/Consult")
                        ? "Consult"
                        : location.pathname.includes("/Study")
                        ? "Study"
                        : null;

    const sidebarButtons = [
        { title : "Agenda", img_route : "calendar-days.svg", navigation_route : "/" },
        { title : "Notes", img_route : "pen.svg", navigation_route : "/Notes" },
        { title : "Record", img_route : "file-user.svg", navigation_route : "/Record" },
        // { title : "Tendencies", img_route : "chart-no-axes-combined.svg", navigation_route : "/Tendencies" },
    ]

    // Manejar estados de carga y error
    if (loading) {
        return (
            <div className="patient-sidebar">
                <div className="patient-info-cont">
                    <p>Loading patient data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="patient-sidebar">
                <div className="patient-info-cont">
                    <p>Error: {error}</p>
                    <button onClick={() => navigation("/Dashboard/Patients")}>
                        Return to Patients
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="patient-sidebar">
                <div className="patient-info-cont">
                    <div className="patients-sidebar-return" onClick={() => navigation("/Dashboard")}>
                        <img src="/assets/house.svg" />
                    </div>

                    <div className="sidebar-image-user">
                        <img src="/assets/user.svg" />
                    </div>

                    <p>{patientData?.full_name || 'No name'}</p>
                    <div className="sidebar-flex patient-data">
                        <p>Age:<br/>{patientData?.age || 'N/A'}</p>
                        <p>Genre:<br/>{patientData?.gender || 'N/A'}</p>
                    </div>

                    <div className="sidebar-flex">
                        <div className={`head-button h-b-left ${activeScreen === "Consult" ? "patientActive" : ""}`} onClick={() => navigation("/Patient/Consult")}>
                            Consult
                        </div>
                        <div className={`head-button h-b-right ${activeScreen === "Study" ? "patientActive" : ""}`} onClick={() => navigation("/Patient/Study")}>
                            Study
                        </div>
                    </div>
                </div>

                <div className="patient-sidebar-buttons">
                    {sidebarButtons.map((button) => (
                        <SidebarButton
                            key={button.title}
                            title={button.title}
                            img_route={button.img_route}
                            navigation_route={button.navigation_route}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default PatientSidebar