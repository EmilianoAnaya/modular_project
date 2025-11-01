import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './DashboardProfile.css'
import Section from '../Section/Section'
import BasicInput from '../Basic_Input/BasicInput'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function DashboardProfile({ doctorView = true }){
    const navigation = useNavigate()
    const [doctorName, setDoctorName] = useState("Doctor Name")

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userFirstName = localStorage.getItem('userFirstName')
        const userLastName = localStorage.getItem('userLastName')

        if (userFirstName && userLastName) {
            setDoctorName(`${userFirstName} ${userLastName}`)
        } else if (userFirstName) {
            setDoctorName(userFirstName)
        }

        loadUserProfile()
    }, [])

    const loadUserProfile = async () => {
        try {
            const userId = localStorage.getItem('userId')
            if (!userId) {
                console.error('No user ID found')
                return
            }

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.PROFILE}/${userId}`)
            )
            const data = await response.json()

            if (response.ok) {
                const user = data.user
                setFirstName(user.first_name || '')
                setLastName(user.last_name || '')
                setEmail(user.email || '')
                setGender(user.gender || 'Male')
                setDateOfBirth(user.date_of_birth || '')
                setCity(user.city || '')
                setCountry(user.country || '')
            } else {
                alert('Failed to load profile: ' + data.error)
            }
        } catch (error) {
            console.error('Error loading profile:', error)
            alert('Unable to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveProfile = async () => {
        try {
            if (!firstName.trim() || !lastName.trim() || !email.trim() ||
                !dateOfBirth.trim() || !city.trim() || !country.trim()) {
                alert('All fields are required and cannot be empty')
                return
            }

            const userId = localStorage.getItem('userId')
            if (!userId) {
                alert('User ID not found')
                return
            }

            const profileData = {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
                gender: 'Male',
                date_of_birth: dateOfBirth.trim(),
                city: city.trim(),
                country: country.trim()
            }

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.PROFILE}/${userId}`),
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profileData)
                }
            )

            const data = await response.json()

            if (response.ok) {
                alert('Profile updated successfully!')
                localStorage.setItem('userFirstName', firstName)
                localStorage.setItem('userLastName', lastName)
                localStorage.setItem('userEmail', email)
                setDoctorName(`${firstName} ${lastName}`)
            } else {
                alert('Failed to update profile: ' + data.error)
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Unable to connect to server')
        }
    }

    return (
        <>
            <div className='dash-profile head' >
                <div className='dash-profile-data'>
                    <img src='/assets/example.jpg'/>
                    <div>
                        <p id='dash-profile-name'>{doctorName}</p>
                        <p id='dash-profile-description'>{ doctorView ? "Doctors Description" : "Patient Description" }</p>
                    </div>
                </div>
                <button className='icon-button basic-button' style={{"width" : "4em"}} onClick={() => navigation("/")}>
                    <img src='/assets/log-out.svg'></img>
                </button>
            </div>
            <div className='dash-profile details' >
                <Section headingText={"Profile Details"}>
                    <div className='input-container'>
                        <BasicInput label={"Name"} value={firstName} onChange={setFirstName} />
                        <BasicInput label={"Surname"} value={lastName} onChange={setLastName} />
                        <BasicInput label={"Email"} inputType={'email'} value={email} onChange={setEmail} />
                    </div>
                    <div className='input-container'>
                        <BasicInput label={"Date of Birth"} inputType='date' value={dateOfBirth} onChange={setDateOfBirth} />
                        <BasicInput label={"City"} value={city} onChange={setCity} />
                        <BasicInput label={"Country"} value={country} onChange={setCountry} />
                    </div>
                    <div className='dash-text-area-cont'>
                        <p>Description</p>
                        <textarea maxLength={274}/>
                    </div>

                    { doctorView && (
                      <div className='dash-text-area-cont'>
                        <p>Consult Location</p>
                        <textarea maxLength={274}/>
                      </div>
                    ) }

                    <div className='input-container'>
                        <button className='basic-button' style={{"width" : "8em"}} onClick={handleSaveProfile}>Save</button>
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