import './Heading.css'

function Heading({ headingText }){
    return (
        <>
            <h1 className='heading'>{ headingText }</h1>
            <div className='heading-line' />
        </>
    )
}

export default Heading