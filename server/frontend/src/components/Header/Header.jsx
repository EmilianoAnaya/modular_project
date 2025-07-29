import "./Header.css";

import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate()

    return (
        <>
            <div id="header">
                <div id="header-content">
                    <h1 id="header-logo" onClick={() => navigate('/')}>MediRecord</h1>
                    <div id="header-options">
                        <p onClick={() => navigate('/Benefits')} className="header-text">Benefits</p>
                        <p onClick={() => navigate('/Functions')} className="header-text">Functions</p>
                        <p onClick={() => navigate('/Contact')} className="header-text">Contact</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header