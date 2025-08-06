import './AddPatient.css'
import BasicInput from '../Basic_Input/BasicInput'

function AddPatient(){
    return(
        <>
            <div className="basic-container add-patient-cont">
                <form>
                    <div className='input-container'>
                        <BasicInput label={"Name"} />
                        <BasicInput label={"Surname"}/>
                        <BasicInput label={"Email"} inputType='email'/>
                    </div>
                    <div className='input-container'>
                        <BasicInput label={"Genre"}/>
                        <BasicInput label={"Date of Birth"} inputType='date'/>
                    </div>
                    <div className='input-container'>
                        <BasicInput label={"Country"}/>
                        <BasicInput label={"City"}/>
                    </div>
                    <button className='basic-button'>Save</button>
                </form>

            </div>
        </>
    )
}

export default AddPatient