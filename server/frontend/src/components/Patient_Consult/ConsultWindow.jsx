import './ConsultWindow.css'

function ConsultWindow({ showWindow }){
    const [showSubWindow, setShowSubWindow] = showWindow;

    return (
        <>  
            {showSubWindow && (
                <>
                    <div className="consult-overlay" onClick={() => setShowSubWindow(!showSubWindow)} />
                    <div className="consult-sub-window">
                        <p>Hello</p>
                        <button onClick={() => setShowSubWindow(!showSubWindow)}>Cerrar</button>
                    </div>
                </>
            )}
        </>
    )
}

export default ConsultWindow