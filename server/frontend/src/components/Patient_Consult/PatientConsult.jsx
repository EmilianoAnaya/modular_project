import Heading from '../Heading/Heading'
import './PatientConsult.css'

function PatientConsult(){
    return (
        <>
            <div className='patient-consult-container'>
                <div className='consult-tools con-tls-1'>
                    <div className='consult-box con-vitals'>
                        <Heading headingText={"Vitals"} />
                    </div>
                    <div className='consult-box con-problems'>
                        <Heading headingText={"Problems"} trigger={"problems-window"}/>
                    </div>
                </div>
                <div className='consult-tools con-tls-2'>
                    <div className='consult-box con-allergies'>
                        <Heading headingText={"Allergies"} trigger={"allergies-window"}/>
                    </div>
                    <div className='consult-box con-medicines'>
                        <Heading headingText={"Medicines"} trigger={"medicines-window"}/>
                    </div>
                    <div className='consult-box con-notes'>
                        <Heading headingText={"Notes"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientConsult