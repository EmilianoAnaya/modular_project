import './Heading.css'

function Heading({ headingText, textAlignment="start", trigger=null}){
    return (
        <>  
            <div className='heading-cont'>
                <h1 className='heading' style={{textAlign: textAlignment}}>{ headingText }</h1>
                {trigger !== null && (
                    <div className='heading-button' /*onClick={}*/>
                        <img src='/assets/pen.svg' />
                    </div>
                )}
            </div> 
            <div className='heading-line' />
        </>
    )
}

export default Heading