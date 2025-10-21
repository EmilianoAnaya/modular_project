import { useState } from 'react'
import './AddPatient.css'
import BasicInput from '../Basic_Input/BasicInput'
import { getApiUrl } from '../../config/api'
import API_CONFIG from '../../config/api'

function AddPatient(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const handleSavePatient = async (e) => {
        e.preventDefault()

        try {
            if (!firstName.trim() || !lastName.trim() || !gender.trim() ||
                !dateOfBirth.trim() || !email.trim() || !city.trim() || !country.trim()) {
                alert('All fields are required and cannot be empty')
                return
            }

            const patientData = {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                gender: gender.trim(),
                date_of_birth: dateOfBirth.trim(),
                email: email.trim(),
                city: city.trim(),
                country: country.trim()
            }

            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}/register`),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patientData)
                }
            )

            const data = await response.json()

            if (response.ok) {
                alert('Patient registered successfully!')
                // Limpiar formulario
                setFirstName('')
                setLastName('')
                setGender('')
                setDateOfBirth('')
                setEmail('')
                setCity('')
                setCountry('')
            } else {
                alert('Failed to register patient: ' + data.error)
            }
        } catch (error) {
            console.error('Error registering patient:', error)
            alert('Unable to connect to server')
        }
    }

    return (
      <>
        <div className='basic-container add-patient-cont'>
            <form onSubmit={handleSavePatient}>
              <div className='input-container'>
                <BasicInput
                    label={"First Name"}
                    value={firstName}
                    onChange={setFirstName}
                />
                <BasicInput
                    label={"Last Name"}
                    value={lastName}
                    onChange={setLastName}
                />
                <BasicInput
                    label={"Gender"}
                    value={gender}
                    onChange={setGender}
                />
                <BasicInput
                    label={"Date of Birth"}
                    inputType="date"
                    value={dateOfBirth}
                    onChange={setDateOfBirth}
                />
                <BasicInput
                    label={"Email"}
                    inputType="email"
                    value={email}
                    onChange={setEmail}
                />
                <BasicInput
                    label={"City"}
                    value={city}
                    onChange={setCity}
                />
                <BasicInput
                    label={"Country"}
                    value={country}
                    onChange={setCountry}
                />
              </div>

              <button type="submit" className='basic-button' style={{marginTop: '1em'}}>
                  Save Patient
              </button>
            </form>
        </div>
      </>
    )
}

export default AddPatient