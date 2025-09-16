import './Section.css'
import Heading from '../Heading/Heading'

function Section({ headingText, textAlignment="start",  children }){
    return (
        <>
            <Heading headingText={headingText} textAlignment={textAlignment}/>
            <div className='section-content'>
                { children }
            </div>
        </>
    )
}


export default Section