import "./header.css";

function header() {
    return (
        <>
            <div id="header">
                <div id="header-content">
                    <h1 id="header-logo">MediRecord</h1>
                    <div id="header-options">
                        <p className="header-text">Benefits</p>
                        <p className="header-text">Functions</p>
                        <p className="header-text">Contact</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default header