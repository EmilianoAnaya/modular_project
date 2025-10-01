import './AllergiesCont.css'

function AllergiesCont({ contents }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table allergies-table allergies-table'>
                    <div><h4>Allergen</h4></div>
                    <div><h4>Reaction</h4></div>

                    <div className='consult-cell centered'>Paracetamol</div>
                    <div className='consult-cell centered'>Headache</div>
                    
                    <div className='consult-cell centered'>Ibuprofen</div>
                    <div className='consult-cell centered'>Red skin / Salpullido</div>
                    
                </div>
            </div>
        </>
    )
}

export default AllergiesCont