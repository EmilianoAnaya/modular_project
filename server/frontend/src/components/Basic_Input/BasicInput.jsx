import './BasicInput.css'

function BasicInput({ label, inputType = 'text' }){
    return (
        <>
            <div className='basic-input-cont'>
                <p>{ label }</p>
                <input type={inputType}/>
            </div>
        </>
    )
}

export default BasicInput
