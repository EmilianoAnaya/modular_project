import "./Header.css";

function Header({ setCurrentView }) {
    return (
        <>
            <div id="header">
                <div id="header-content">
                    <h1 id="header-logo" onClick={() => setCurrentView('home')}>MediRecord</h1>
                    <div id="header-options">
                        <p onClick={() => setCurrentView('benefits')} className="header-text">Benefits</p>
                        <p onClick={() => setCurrentView('functions')} className="header-text">Functions</p>
                        <p onClick={() => setCurrentView('contact')} className="header-text">Contact</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header