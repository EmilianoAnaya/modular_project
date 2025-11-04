import { useState } from 'react';
import './NotesCont.css'

function NotesCont({ notesData, setNotesData }){
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div className='basic-container consult-info-box no_padding'>
                <div className={`consult-notes-container ${expanded ? "expanded" : ""}`}>
                    <div className="notes-area-cont">
                        {notesData && notesData.trim() !== '' ? (
                            <div className='notes-area-item'>
                                <img src='/assets/chevron-right.svg' />
                                <span>{notesData}</span>
                            </div>
                        ) : (
                            <div className='notes-area-item' style={{fontStyle: 'italic', color: '#666'}}>
                                <span>No notes yet. Write your notes below.</span>
                            </div>
                        )}
                    </div>

                    <div className='notes-input-cont' onBlur={() => setExpanded(false)} onFocus={() => setExpanded(true)}>
                        <textarea
                            value={notesData || ''}
                            onChange={(e) => setNotesData(e.target.value)}
                            placeholder="Write additional notes here..."
                        />
                        <img src='/assets/plus.svg' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesCont