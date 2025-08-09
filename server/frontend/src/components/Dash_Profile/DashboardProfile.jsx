import { useNavigate } from 'react-router-dom'

import './DashboardProfile.css'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'

function DashboardProfile(){
    const navigation = useNavigate()

    return (
        <>
            <div className='dash-profile head' >
                <div className='dash-profile-data'>
                    <img src='/assets/example.jpg'/>
                    <div>
                        <p id='dash-profile-name'>Doctor Name</p>
                        <p id='dash-profile-description'>Doctors Description</p>
                    </div>
                </div>
                <button className='icon-button basic-button' style={{"width" : "4em"}} onClick={() => navigation("/")}>
                    <img src='/assets/log-out.svg'></img>
                </button>
            </div>
            <div className='dash-profile details' >
                <Section headingText={"Profile Details"}>
                    <div className='input-container'>
                        <BasicInput label={"Name"} />
                        <BasicInput label={"Surname"} />
                        <BasicInput label={"Email"} inputType={'email'}/>
                    </div>
                    <div className='input-container'>
                        <BasicInput label={"Date of Birth"} inputType='date'/>
                        <BasicInput label={"Country"}/>
                        <BasicInput label={"City"}/>
                    </div>
                    <div className='dash-text-area-cont'>
                        <p>Description</p>
                        <textarea maxLength={274}/>
                    </div>
                    <div className='input-container'>
                        <button className='basic-button' style={{"width" : "8em"}}>Save</button>
                    </div>
                </Section>
            </div>
            <div className='dash-profile password'>
                <Section headingText={"Password"}>
                    <div className='input-container'>
                        <BasicInput label={"Current Password"} inputType='password'/>
                        <BasicInput label={"New Password"} inputType='password'/>
                        <BasicInput label={"Re-enter New Password"} inputType='password'/>
                    </div>
                    <div className='input-container'>
                        <button className='basic-button' >Change Password</button>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default DashboardProfile