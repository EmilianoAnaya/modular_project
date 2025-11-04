import './GridPatient.css'
import GridPatientsContent from './GridPatientsContent'

function GridPatient({ searchResults = [] }){
    return (
        <>
            <div className='basic-container patients-cont'>
                <div className='patients-grid'>
                    <div className='grid-item patients-grid-header'>Patient Name</div>
                    <div className='grid-item patients-grid-header'>Last time opened</div>
                    <div className='grid-item patients-grid-header'>Last time updated</div>
                    <div className='grid-item patients-grid-header'>Actions</div>

                    {searchResults.length > 0 ? (
                        searchResults.map((patient) => (
                            <GridPatientsContent
                                key={patient.patient_id}
                                patient={patient}
                            />
                        ))
                    ) : (
                        <div className='grid-item patients-grid-content' style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2em'}}>
                            {searchResults.length === 0 && searchResults !== null ?
                                'Use the search above to find patients' :
                                'No patients found'
                            }
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}


export default GridPatient
