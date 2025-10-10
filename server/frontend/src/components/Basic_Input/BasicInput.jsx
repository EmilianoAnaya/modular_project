import './BasicInput.css'

function BasicInput({ label, inputType='text', value, placeholder=null, width="17em", onChange }){
    return (
        <>
            <div className='basic-input-cont' style={{ minWidth : width }}>
                <p>{ label }</p>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            </div>
        </>
    )
}

export default BasicInput
