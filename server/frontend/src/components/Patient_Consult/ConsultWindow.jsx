import Section from '../Section/Section';
import './ConsultWindow.css'

function ConsultWindow({ showWindow, windowTitle, children }){
    const [showSubWindow, setShowSubWindow] = showWindow;

    return (
        <>  
            {showSubWindow && (
                <>
                    <div className="consult-overlay" onClick={() => setShowSubWindow(!showSubWindow)} />
                    <div className="consult-sub-window">
                        <div className='sub-window-return' onClick={() => setShowSubWindow(!showSubWindow)}>
                            <img src='/assets/cross.svg'/>
                        </div>
                        <Section headingText={windowTitle}>
                            { children }
                        </Section>
                    </div>
                </>
            )}
        </>
    )
}

export default ConsultWindow