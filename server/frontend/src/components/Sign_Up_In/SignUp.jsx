import './SignUp.css';
import './SignShared.css';

function SignUp({ setCurrentView }) {
    return (
        <>
            <div id='sign-up-content'>
                <h1 className="sig-up-in-header">Sign Up</h1>
                <form>
                    <div id='sign-up-inputs-container'>
                        <input className="si-up-in-inputs" type='text' placeholder='Name'/>
                        <input className="si-up-in-inputs" type="text" placeholder='Surname'/>
                        <input className="si-up-in-inputs" type="email" placeholder='Email'/>
                        <input className="si-up-in-inputs" type="date"/>
                        <input className="si-up-in-inputs" type="text" placeholder='Country'/>
                        <input className="si-up-in-inputs" type="text" placeholder='City'/>
                        <input className="si-up-in-inputs" type="password" placeholder='Password'/>
                        <input className="si-up-in-inputs" type="password" placeholder='Confirm Password'/>
                    </div>
                    <div className='si-up-butt-cont'>
                        <button className='si-up-in-buttons' onClick={() => setCurrentView('home')}>Cancel</button>
                        <button className='si-up-in-buttons' onClick={() => setCurrentView('sign_in')}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp