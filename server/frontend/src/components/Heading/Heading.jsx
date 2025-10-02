import './Heading.css'

function Heading({ headingText, textAlignment="start", trigger=[null, null]}){
    const [action, setAction] = trigger

    return (
        <>  
            <div className='heading-cont'>
                <h1 className='heading' style={{textAlign: textAlignment}}>{ headingText }</h1>
                {setAction && (
                    <div className='heading-button' onClick={() => setAction(!action)}>
                        <img src='/assets/pen.svg' />
                    </div>
                )}
            </div> 
            <div className='heading-line' />
        </>
    )
}

export default Heading