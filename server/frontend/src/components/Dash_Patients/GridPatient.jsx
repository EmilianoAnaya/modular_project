import './GridPatient.css'
import GridPatientsContent from './GridPatientsContent'

function GridPatient(){
    return (
        <>
            <div className='basic-container patients-cont'>
                <div className='patients-grid'>
                    <div className='patients-grid-header'>Patient Name</div>
                    <div className='patients-grid-header'>Last time opened by you</div>
                    <div className='patients-grid-header'>Last time updated</div>
                    <div className='patients-grid-header'>Actions</div>
                    
                    {/* Agregar rows por medio de este componente! */}
                    <GridPatientsContent />
                    
                </div>
            </div>
        </>
    )
}


export default GridPatient
