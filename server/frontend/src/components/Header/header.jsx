import "./header.css";

function header() {
    return (
        <>
            <div className="header">
                <div className="header-content">
                    <h1 className="header-logo">MediRecord</h1>
                    <div className="header-options">
                        <p className="header-text">Benfits</p>
                        <p className="header-text">Functions</p>
                        <p className="header-text">Contact</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default header