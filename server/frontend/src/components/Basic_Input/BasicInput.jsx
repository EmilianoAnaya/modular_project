import './BasicInput.css'

function BasicInput({ label, inputType = 'text', value, onChange }){
    return (
        <>
            <div className='basic-input-cont'>
                <p>{ label }</p>
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            </div>
        </>
    )
}

export default BasicInput
