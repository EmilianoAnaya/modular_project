import "./BasicSelect.css"

function BasicSelect({ label, width="17em", options=[], selectID=null, value, onChange, defaultOption="- - - - -"}){
    const selectOptions = options

    return(
        <>
            <div className="basic-select-cont" style={{ minWidth : width }}>
                <p>{ label }</p>
                <select 
                    id={selectID}
                    value={value || defaultOption}
                    onChange={(e) => onChange && onChange(e)}
                >
                    <option value={defaultOption}>{defaultOption}</option>
                    {selectOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default BasicSelect