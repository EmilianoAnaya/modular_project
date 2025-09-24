import './Heading.css'

function Heading({ headingText, textAlignment="start" }){
    return (
        <>
            <h1 className='heading' style={{textAlign: textAlignment}}>{ headingText }</h1>
            <div className='heading-line' />
        </>
    )
}

export default Heading