import './PatientStudy.css'
import StudyCard from './StudyCard'

function PatientStudy(){
    return(
        <>
            <div className='patient-study-container'>
                <div className='studies-list-cont'>
                    <div className='studies-list'>
                        <div className='studies-list-search'>
                            <input placeholder='Search for Study...' />
                            <div />
                        </div>
                        <div className='studies-list-items'>
                            <ul>
                                <li>
                                    <div className='study-item'>
                                        <span>X Rays</span>
                                        <button>Add</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='study-item'>
                                        <span>Diabetes</span>
                                        <button>Add</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='study-item'>
                                        <span>Electroencephalogram</span>
                                        <button>Add</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='studies-selected-cont'>
                    <div className='selected-studies'>
                        <StudyCard />
                        <StudyCard></StudyCard>
                        <StudyCard></StudyCard>
                        <StudyCard></StudyCard>
                        <StudyCard></StudyCard>
                    </div>
                    <div className='selected-studies-footer'>
                        <button className='basic-button'>Save Studies</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientStudy