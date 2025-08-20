import { useNavigate } from "react-router-dom"


function GridPatientsContent(){
    const navigation = useNavigate()

    return(
        <>
            <div className='patients-grid-content patients-column-1'>
                <span>Gael Emiliano Anaya Garcia</span>
            </div>
            <div className='patients-grid-content'>
                <span>xx/xx/xxxx</span>
            </div>
            <div className='patients-grid-content patients-column-3'>
                <span>xx/xx/xxxx</span>
                <button className='basic-button icon-button table-button'>
                    <img src='/assets/file-check-2.svg'/>
                </button>
            </div>
            <div className='patients-grid-content'>
                <button className='basic-button table-button'>Consult</button>
                <button className='basic-button table-button' onClick={() => navigation("/Patient")}>View</button>
            </div>
        </>
    )
}

export default GridPatientsContent