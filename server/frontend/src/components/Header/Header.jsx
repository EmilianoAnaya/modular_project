import "./Header.css";

import { useNavigate, useLocation } from 'react-router-dom';


function Header() {
    const navigate = useNavigate()
    
    const location = useLocation()
    const inDashboard = location.pathname.startsWith("/Dashboard")

    return (
        <>
            <div id="header">
                <div id="header-content">
                    <h1 id="header-logo" onClick={() => navigate(inDashboard ? '/Dashboard' : '/')}>MediRecord</h1>
                    <div id="header-options">
                        {!inDashboard && (
                            <>
                            <p onClick={() => navigate('/Benefits')} className="header-text">Benefits</p>
                            <p onClick={() => navigate('/Functions')} className="header-text">Functions</p>
                            <p onClick={() => navigate('/Contact')} className="header-text">Contact</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header