import Heading from "../Heading/Heading"
import "./WindowContentDefault.css"

function WindowContentDefault({ title_list="", items_list = [], children }){
    const items = items_list

    return(
        <>
            <div className='window-default-content'>
                <div className='window-default-list'>
                    <Heading headingText={`${title_list}`} font_size='1.1em' color='black'/>
                    <div className='default-list-content'>
                        {items.map((item) => (
                            <p key={item}>{item}</p>
                        ))}
                    </div>
                    
                </div>
                <div className='window-default-information'>
                    <div className='default-information-cont'>
                        { children }
                    </div>
                    <div className='default-information-buttons'>
                        <button className='basic-button'>New</button>
                        <button className='basic-button'>Save & Continue</button>
                        <button className='basic-button'>Save & Exit</button>
                        <button className='basic-button'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WindowContentDefault