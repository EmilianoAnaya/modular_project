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
                        <img src="/assets/file-check-2.svg"/>
                        <label>Notes</label>
                    </div>
                    <div className="sidebar-button"></div>
                    <div className="sidebar-button"></div>
                    <div className="sidebar-button"></div>
                </div>
            </div>
        </>
    )
}

export default PatientSidebar