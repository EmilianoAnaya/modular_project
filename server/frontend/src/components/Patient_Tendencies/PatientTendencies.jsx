import './PatientTendencies.css'
import Section from '../Section/Section'

function PatientTendencies(){
    return(
        <>
            <div className='patient-tendencies-cont'>
                <div className='patient-tend-graphs'>
                    <Section headingText={"Consult Tendencies"}>
                        hellooo
                    </Section>
                </div>
                <div className='patient-tend-info'>
                    <div className='patient-tend-cont major-points'>
                        <Section headingText={"Major Points"}>
                            hi
                        </Section>
                    </div>
                    <div className='patient-tend-cont summary'>
                        <Section headingText={"Last 5 Consult Summary"} textAlignment='end'>
                            hello
                        </Section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientTendencies