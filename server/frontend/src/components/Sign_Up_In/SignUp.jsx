import './SignUp.css';
import './SignShared.css';

import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate()

    return (
        <>
            <div id='sign-up-content'>
                <h1 className="sig-up-in-header">Sign Up</h1>
                <form>
                    <div id='sign-up-inputs-container'>
                        <input className="si-up-in-inputs si-in-screen" type='text' placeholder='Name'/>
                        <input className="si-up-in-inputs si-in-screen" type="text" placeholder='Surname'/>
                        <select name="Gender" defaultValue="none" className="si-up-in-select">
                            <option value="none">-- Gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input className="si-up-in-inputs si-in-screen" type="email" placeholder='Email'/>
                        <input className="si-up-in-inputs si-in-screen" type="date"/>
                        <input className="si-up-in-inputs si-in-screen" type="text" placeholder='City'/>
                        <input className="si-up-in-inputs si-in-screen" type="text" placeholder='Country'/>
                        <input className="si-up-in-inputs si-in-screen" type="password" placeholder='Password'/>
                        <input className="si-up-in-inputs si-in-screen" type="password" placeholder='Confirm Password'/>
                    </div>
                    <div className='si-up-butt-cont'>
                        <button type='button' className='si-up-in-buttons' onClick={() => navigate('/')}>Cancel</button>
                        <button type='button' className='si-up-in-buttons' onClick={() => navigate('/SignIn')}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp