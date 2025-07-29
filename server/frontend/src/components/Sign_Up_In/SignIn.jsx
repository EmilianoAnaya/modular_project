import './SignIn.css';
import './SignShared.css';

function SignIn({ setCurrentView }){
    return(
        <>
            <div id="sig-in-cont">
                <h1 className='sig-up-in-header'>Sign In</h1>
                <form>
                    <div id="sign-in-inputs-container">
                        <input className='si-up-in-inputs' type="email" placeholder='Email'/>
                        <input className='si-up-in-inputs' type="password" placeholder='Password'/>
                        <div id='si-in-cont-checkbox'>
                            <input id='si-in-checkbox' type='checkbox'/>
                            <span className='si-in-font'>Remember me?</span>
                        </div>
                    </div>
                    
                    <div className='si-in-butt-cont'>
                        <button className='si-up-in-buttons' onClick={() => setCurrentView('home')}>Cancel</button>
                        <button className='si-up-in-buttons'>Log In</button>
                    </div>
                    <u className='si-in-font'>Forgot Your Password?</u>
                    <p className='si-in-font'>Don't have an account? <b><u>Register</u></b> </p> 
                </form>
            </div>
        </>
    )
}

export default SignIn