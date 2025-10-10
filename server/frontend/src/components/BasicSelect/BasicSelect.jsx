import "./BasicSelect.css"

function BasicSelect({ label, width="17em", options=[], selectID=null}, defaultOption="- - - - -"){
    const selectOptions = options

    return(
        <>
            <div className="basic-select-cont" style={{ minWidth : width }}>
                <p>{ label }</p>
                <select id={ selectID }style={{  }}>
                    <option value={defaultOption} id={defaultOption}>{defaultOption}</option>
                    {selectOptions.map(option => (
                        <option value={option} id={option} >{option}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default BasicSelect