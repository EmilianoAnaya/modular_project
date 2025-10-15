import './StudyCard.css'
import { useState } from 'react'

function StudyCard({ backgroundImage }){
    
    // const StudyCardBackground = backgroundImage
    const studyCardBackground = '/assets/XRaysExample.jpg'

    const [cardState, setCardState] = useState(false)
    const [showItems, setShowItems] = useState(false);

    return(
        <>
            <div className='study-card-container' onMouseOver={() => setShowItems(true)} onMouseLeave={() => setShowItems(false)}>
                <div 
                    className='study-card-background' 
                    style={{ backgroundImage : `url(${studyCardBackground})`}} 
                />

                {showItems && (
                    <>  
                        {!cardState ? (
                            <>
                                <img src='/assets/paperclip.svg' className='study-card-option' />
                            </>
                        ) : (
                            <>
                                <img src='/assets/glasses.svg' className='study-card-option' />
                                <img src='/assets/pen.svg' className='study-card-button study-card-edit-button'/>
                            </>
                        )}
                        <img src="/assets/cross.svg" className='study-card-button study-card-exit-button' />
                    </>
                )}



            </div>
        </>
    )
}

export default StudyCard