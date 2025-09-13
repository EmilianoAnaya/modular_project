import './SignIn.css';
import './SignShared.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignIn(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/Dashboard');
            } else {
                alert('Login failed: ' + data.error);
            }
            } catch (error) {
            alert('Unable to connect to server');
        } 
    };

    return(
        <>
            <div id="sig-in-cont">
                <h1 className='sig-up-in-header'>Sign In</h1>
                <form>
                    <div id="sign-in-inputs-container">
                        <input className='si-up-in-inputs' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className='si-up-in-inputs' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div id='si-in-cont-checkbox'>
                            <input id='si-in-checkbox' type='checkbox'/>
                            <span className='si-in-font'>Remember me?</span>
                        </div>
                    </div>
                    
                    <div className='si-in-butt-cont'>
                        <button type='button' className='si-up-in-buttons' onClick={() => navigate('/')}>Cancel</button>
                        <button type='button' className='si-up-in-buttons' onClick={handleLogin}>Log In</button>
                    </div>
                    <u className='si-in-font' style={{cursor: 'pointer'}} onClick={() => navigate('/ForgotPassword')}>Forgot Your Password?</u>
                    <p className='si-in-font'>Don't have an account?{' '} <b><u style={{cursor: 'pointer'}} onClick={() => navigate('/SignUp')}>Register</u></b> </p> 
                </form>
            </div>
        </>
    )
}

export default SignIn