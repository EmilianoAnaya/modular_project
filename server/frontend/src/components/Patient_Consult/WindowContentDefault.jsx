import Heading from "../Heading/Heading"
import "./WindowContentDefault.css"

function WindowContentDefault({ 
    title_list="", 
    items_list = [], 
    children,
    onNew,
    onSaveContinue,
    onSaveExit,
    onDelete,
    selectedIndex = null,
    onSelectItem
}){
    const items = items_list

    const handleItemClick = (index) => {
        if (onSelectItem) {
            onSelectItem(index)
        }
    }

    return(
        <>
            <div className='window-default-content'>
                <div className='window-default-list'>
                    <Heading headingText={`${title_list}`} font_size='1.1em' color='black'/>
                    <div className='default-list-content'>
                        {items.length === 0 ? (
                            <p style={{fontStyle: 'italic', color: '#666'}}>No items yet</p>
                        ) : (
                            items.map((item, index) => (
                                <p 
                                    key={index}
                                    onClick={() => handleItemClick(index)}
                                    style={{
                                        backgroundColor: selectedIndex === index ? '#4fc3f7' : 'transparent',
                                        padding: '0.5em',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        color: selectedIndex === index ? 'white' : 'black',
                                        fontWeight: selectedIndex === index ? 'bold' : 'normal'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedIndex !== index) {
                                            e.target.style.backgroundColor = '#e0e0e0'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedIndex !== index) {
                                            e.target.style.backgroundColor = 'transparent'
                                        }
                                    }}
                                >
                                    {item}
                                </p>
                            ))
                        )}
                    </div>
                    
                </div>
                <div className='window-default-information'>
                    <div className='default-information-cont'>
                        { children }
                    </div>
                    <div className='default-information-buttons'>
                        <button className='basic-button' onClick={onNew}>New</button>
                        <button className='basic-button' onClick={onSaveContinue}>Save & Continue</button>
                        <button className='basic-button' onClick={onSaveExit}>Save & Exit</button>
                        <button 
                            className='basic-button' 
                            onClick={onDelete} 
                            disabled={selectedIndex === null}
                            style={{
                                opacity: selectedIndex === null ? 0.5 : 1,
                                cursor: selectedIndex === null ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WindowContentDefault