import './Section.css'
import Heading from '../Heading/Heading'

function Section({ headingText, textAlignment="start", color="white", font_size="2em", trigger=[null, null],  children }){
    return (
        <>
            <Heading headingText={headingText} textAlignment={textAlignment} color={color} font_size={font_size} trigger={trigger}/>
            <div className='section-content'>
                { children }
            </div>
        </>
    )
}


export default Section