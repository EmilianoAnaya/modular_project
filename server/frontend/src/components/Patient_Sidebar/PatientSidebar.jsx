import { useNavigate } from "react-router-dom"
import "./PatientSidebar.css"

function PatientSidebar(){
    const navigation = useNavigate();

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
                    <div className="sidebar-button">
                        <img src="/assets/pen.svg"/>
                        <label>Notes</label>
                    </div>
                    <div className="sidebar-button">
                        <img src="/assets/file-user.svg"/>
                        <label>Record</label>
                    </div>
                    <div className="sidebar-button">
                        <img src="/assets/calendar-days.svg"/>
                        <label>Agenda</label>
                    </div>
                    <div className="sidebar-button">
                        <img src="/assets/chart-no-axes-combined.svg"/>
                        <label>Tendencies</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientSidebar