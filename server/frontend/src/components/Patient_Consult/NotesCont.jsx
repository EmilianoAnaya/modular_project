import { useState } from 'react';
import './NotesCont.css'

function NotesCont(){
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div className='basic-container consult-info-box no_padding'>
                <div className={`consult-notes-container ${expanded ? "expanded" : ""}`}>
                    <div className="notes-area-cont">
                        <div className='notes-area-item'>
                            <img src='/assets/chevron-right.svg' />
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non malesuada diam, at venenatis mi. Sed sit amet est et ex malesuada fringilla. Aenean accumsan arcu eu vestibulum vestibulum. Nam vestibulum lectus id ligula aliquam egestas. Donec diam metus, cursus vitae lobortis sed, accumsan nec odio. Aenean ornare libero nec lacus elementum iaculis. Nunc mollis gravida finibus. Suspendisse ac turpis ullamcorper, gravida eros eget, dapibus erat. Maecenas hendrerit pretium sapien, in congue lacus rutrum in. </span>
                        </div>
                        <div className='notes-area-item'>
                            <img src='/assets/chevron-right.svg' />
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non malesuada diam, at venenatis mi. Sed sit amet est et ex malesuada fringilla. Aenean accumsan arcu eu vestibulum vestibulum. Nam vestibulum lectus id ligula aliquam egestas. Donec diam metus, cursus vitae lobortis sed, accumsan nec odio. Aenean ornare libero nec lacus elementum iaculis. Nunc mollis gravida finibus. Suspendisse ac turpis ullamcorper, gravida eros eget, dapibus erat. Maecenas hendrerit pretium sapien, in congue lacus rutrum in. </span>
                        </div>
                    </div>

                    <div className='notes-input-cont' onBlur={() => setExpanded(!expanded)} onFocus={() => setExpanded(!expanded)}>
                        <textarea />
                        <img src='/assets/plus.svg' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesCont