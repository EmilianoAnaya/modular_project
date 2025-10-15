import './StudyCard.css'
import { useState } from 'react'

function StudyCard({ backgroundImage }){
    // const StudyCardBackground = backgroundImage
    
    const studyCardBackground = '/assets/XRaysExample.jpg'
    const [cardState, setCardState] = useState(0)

    return(
        <>
            <div className='study-card-container' >
                <div 
                    className='study-card-background' 
                    style={{ backgroundImage : `url(${studyCardBackground})`}} 
                />
                {/* <img src='/assets/XRaysExample.jpg' className='study-card-image' /> */}

                <img src="/assets/cross.svg" className='study-card-button study-card-exit-button' />
                {/* <img src='/assets/pen.svg' className='study-card-button study-card-edit-button'/> */}

                <img src='/assets/paperclip.svg' className='study-card-option' />
                {/* <img src='/assets/glasses.svg' className='study-card-option' /> */}
            </div>
        </>
    )
}

export default StudyCard