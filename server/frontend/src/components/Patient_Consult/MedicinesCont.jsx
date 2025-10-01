import './MedicinesCont.css'

function MedicinesCont({ contents }){
    return (
        <>
            <div className='basic-container consult-info-box table-info'>
                <div className='consult-table allergies-table medicines-table'>
                    <div><h4>Medicine</h4></div>
                    <div><h4>Quantity</h4></div>
                    <div><h4>Instructions</h4></div>
                    
                    <div className='consult-cell centered'>Paracetamol</div>
                    <div className='consult-cell centered'>500mg</div>
                    <div className='consult-cell centered'>1 tableta. Via oral. 2 veces al día. Por 30 días</div>
                    
                    <div className='consult-cell centered'>Cefalexina (Septilisin)</div>
                    <div className='consult-cell centered'>500mg</div>
                    <div className='consult-cell centered'>Tomar via oral 8 (uno) c/6 (seis) hs por 7/(siete) días</div>
                    
                </div>
            </div>
        </>
    )
}

export default MedicinesCont