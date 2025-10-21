import './PatientTendencies.css'
import Section from '../Section/Section'

function PatientTendencies(){
    return(
        <>
            <div className='patient-tendencies-cont'>
                <div className='patient-tend-graphs'>
                    <Section headingText={"Consult Tendencies"}>
                        A Graph *
                    </Section>
                </div>
                <div className='patient-tend-info'>
                    <div className='patient-tend-cont major-points'>
                        <Section headingText={"Major Points"}>
                            <div className='basic-container tendencies-info'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in sapien a mauris aliquet vulputate a quis metus. Maecenas neque lectus, rhoncus mattis arcu dapibus, malesuada pretium felis. Mauris sagittis, justo a auctor ultrices, enim lectus dictum turpis, in varius nunc nulla quis diam. Donec fermentum arcu eu justo dictum, a gravida purus efficitur. Integer id rhoncus dui. Fusce vehicula arcu vitae venenatis feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris egestas felis dolor, eget lacinia ipsum suscipit porta. Cras a nulla ut lorem auctor scelerisque. Vestibulum non arcu a tortor pulvinar finibus. Vivamus non posuere enim. Pellentesque nec sem a urna congue vulputate. Nam hendrerit interdum eros a rhoncus. Nullam lacus mi, condimentum eget arcu quis, sodales hendrerit est. Sed feugiat risus vel mauris porta tempus.

Pellentesque mollis quam sit amet enim ornare, quis hendrerit felis sagittis. Mauris vel tincidunt sapien. Curabitur pulvinar fermentum mi. Nulla eros mauris, feugiat ut metus a, pharetra dapibus eros. Pellentesque elementum lobortis euismod. Proin et lacus sit amet nulla molestie pharetra. Sed quis iaculis leo, quis mattis eros. Aliquam ornare dui at magna facilisis, at sagittis nisl feugiat. In hac habitasse platea dictumst. Suspendisse quam quam, euismod aliquet velit eget, porttitor sodales tellus. Nulla facilisi. 
                            </div>
                        </Section>
                    </div>
                    <div className='patient-tend-cont summary-tend'>
                        <Section headingText={"Last 5 Consult Summary"} textAlignment='end'>
                            <div className='basic-container tendencies-info'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in sapien a mauris aliquet vulputate a quis metus. Maecenas neque lectus, rhoncus mattis arcu dapibus, malesuada pretium felis. Mauris sagittis, justo a auctor ultrices, enim lectus dictum turpis, in varius nunc nulla quis diam. Donec fermentum arcu eu justo dictum, a gravida purus efficitur. Integer id rhoncus dui. Fusce vehicula arcu vitae venenatis feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris egestas felis dolor, eget lacinia ipsum suscipit porta. Cras a nulla ut lorem auctor scelerisque. Vestibulum non arcu a tortor pulvinar finibus. Vivamus non posuere enim. Pellentesque nec sem a urna congue vulputate. Nam hendrerit interdum eros a rhoncus. Nullam lacus mi, condimentum eget arcu quis, sodales hendrerit est. Sed feugiat risus vel mauris porta tempus.

Pellentesque mollis quam sit amet enim ornare, quis hendrerit felis sagittis. Mauris vel tincidunt sapien. Curabitur pulvinar fermentum mi. Nulla eros mauris, feugiat ut metus a, pharetra dapibus eros. Pellentesque elementum lobortis euismod. Proin et lacus sit amet nulla molestie pharetra. Sed quis iaculis leo, quis mattis eros. Aliquam ornare dui at magna facilisis, at sagittis nisl feugiat. In hac habitasse platea dictumst. Suspendisse quam quam, euismod aliquet velit eget, porttitor sodales tellus. Nulla facilisi. 
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientTendencies