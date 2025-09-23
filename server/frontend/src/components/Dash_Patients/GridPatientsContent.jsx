import { useNavigate } from "react-router-dom"

function GridPatientsContent({ patient }){
    const navigation = useNavigate()

    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    // Si no hay paciente, mostrar placeholder
    if (!patient) {
        return (
            <>
                <div className='patients-grid-content patients-column-1'>
                    <span>No patient data</span>
                </div>
                <div className='patients-grid-content'>
                    <span>N/A</span>
                </div>
                <div className='patients-grid-content patients-column-3'>
                    <span>N/A</span>
                    <button className='basic-button icon-button table-button'>
                        <img src='/assets/file-check-2.svg'/>
                    </button>
                </div>
                <div className='patients-grid-content'>
                    <button className='basic-button table-button'>Consult</button>
                    <button className='basic-button table-button'>View</button>
                </div>
            </>
        )
    }

    return(
        <>
            <div className='patients-grid-content patients-column-1'>
                <span>{`${patient.first_name} ${patient.last_name}`}</span>
            </div>
            <div className='patients-grid-content'>
                <span>N/A</span> {/* Por ahora hardcodeado, se puede implementar después */}
            </div>
            <div className='patients-grid-content patients-column-3'>
                <span>{formatDate(patient.created_at)}</span>
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