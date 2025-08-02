import './Separator.css'

function Separator(){
    return (
        <>
            <div className='separator'>
                <div className='separator-line'/>
                <img src='/assets/dot.svg' width={"3%"}/>
                <div className='separator-line'/>
            </div>
        </>
    )
}

export default Separator