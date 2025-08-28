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
                        <BasicInput label={"Genre"}/>
                        <BasicInput label={"Date of Birth"} inputType='date'/>
                        <BasicInput label={"Email"} inputType='email'/>
                        <BasicInput label={"City"}/>
                        <BasicInput label={"Country"}/>
                    </div>
                    <button className='basic-button'>Save</button>
                </form>

            </div>
        </>
    )
}

export default AddPatient