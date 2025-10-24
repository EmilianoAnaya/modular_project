import Section from '../Section/Section';
import './WindowContainer.css'

function WindowContainer({ showWindow, windowTitle, children }){
    const [showSubWindow, setShowSubWindow] = showWindow;

    return (
        <>
            {showSubWindow && (
                <>
                    <div className="window-overlay" onClick={() => setShowSubWindow(!showSubWindow)} />
                    <div className="window-container">
                        <div className='window-return-button' onClick={() => setShowSubWindow(!showSubWindow)}>
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

export default WindowContainer