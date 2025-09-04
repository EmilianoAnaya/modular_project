import "./PatientSidebar.css"

import { useNavigate } from "react-router-dom"
import SidebarButton from "./SidebarButton";

function PatientSidebar(){
    const navigation = useNavigate();

    const sidebarButtons = [
        { title : "Notes", img_route : "pen.svg", navigation_route : "/Notes" },
        { title : "Record", img_route : "file-user.svg", navigation_route : "/Record" },
        { title : "Agenda", img_route : "calendar-days.svg", navigation_route : "" },
        { title : "Tendencies", img_route : "chart-no-axes-combined.svg", navigation_route : "/Tendencies" },
    ]

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

                    <p>Gael Emiliano Anaya Garcia</p>
                    <div className="sidebar-flex patient-data">
                        <p>Age:<br/>XX</p>
                        <p>Genre:<br/>XX</p>
                    </div>

                    <div className="sidebar-flex">
                        <div className="head-button h-b-left">
                            Consult
                        </div>
                        <div className="head-button h-b-right">
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