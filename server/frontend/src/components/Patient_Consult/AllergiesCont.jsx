import ConsultWindow from './ConsultWindow'
import './AllergiesCont.css'

function AllergiesCont({ window }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table allergies-table'>
                    <div><h4>Allergen</h4></div>
                    <div><h4>Reaction</h4></div>

                    <div className='consult-cell centered'>Paracetamol</div>
                    <div className='consult-cell'>Headache</div>
                    
                    <div className='consult-cell centered'>Ibuprofen</div>
                    <div className='consult-cell'>Red skin / Salpullido</div>
                    
                </div>
            </div>

            <ConsultWindow windowTitle={"Allergies"} showWindow={window}>
                Hello Allergies!
            </ConsultWindow>
        </>
    )
}

export default AllergiesCont