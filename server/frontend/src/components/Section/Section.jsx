import './Section.css'
import Heading from '../Heading/Heading'

function Section({ headingText, children }){
    return (
        <>
            <Heading headingText={headingText} />
            <div className='section-content'>
                { children }
            </div>
        </>
    )
}


export default Section