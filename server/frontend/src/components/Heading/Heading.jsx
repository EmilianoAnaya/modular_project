import './Heading.css'

function Heading({ headingText, textAlignment="start", color="white", font_size="2em", trigger=[null, null]}){
    const [action, setAction] = trigger

    return (
        <>  
            <div className='heading-cont'>
                <h1 className='heading' style={{textAlign: textAlignment, color : color, fontSize : font_size}}>{ headingText }</h1>
                {setAction && (
                    <div className='heading-button' onClick={() => setAction(!action)}>
                        <img src='/assets/pen.svg' />
                    </div>
                )}
            </div> 
            <div className='heading-line' style={{backgroundColor : color}} />
        </>
    )
}

export default Heading