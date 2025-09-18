import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignShared.css'


function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = async () => {
        // Pruebas: solo muestra un alert
        if (email) {
            alert(`If this email exists, a reset link will be sent to: ${email}`)
            setEmail('')
            navigate('/SignIn')
            return
        } else {
             alert("Please enter your registred email.")
        }
    }

    return (
        <div id="sig-in-cont">
            <h1 className='sig-up-in-header'>Reset Password</h1>
            <form>
                <div id="sig-in-inputs-container">
                    <input className='si-up-in-inputs' type="email" placeholder='Enter your registered email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='si-in-butt-cont'>
                    <button type='button' className='si-up-in-buttons' onClick={() => navigate('/SignIn')}>
                        Cancel
                    </button>
                    <button type='button' className='si-up-in-buttons' onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword