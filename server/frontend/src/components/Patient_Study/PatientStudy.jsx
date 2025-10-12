import './PatientStudy.css'

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
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='studies-selected-cont'></div>
            </div>
        </>
    )
}

export default PatientStudy