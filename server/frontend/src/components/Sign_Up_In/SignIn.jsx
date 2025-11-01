import './SignIn.css';
import './SignShared.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getApiUrl } from '../../config/api';
import API_CONFIG from '../../config/api';

function SignIn(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const generateRandomPassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
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
                // Guardar datos temporalmente
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userFirstName', data.user.first_name || '');
                localStorage.setItem('userLastName', data.user.last_name || '');
                localStorage.setItem('userEmail', data.user.email || '');
                localStorage.setItem('userRole', data.user.role || '');

                // Si requiere cambio de contraseña, mostrar modal
                if (data.requires_password_change) {
                    setUserId(data.user.id);
                    setUserRole(data.user.role);
                    const generatedPassword = generateRandomPassword();
                    setNewPassword(generatedPassword);
                    setShowPasswordModal(true);
                } else {
                    // Navegar según el rol
                    if (data.user.role === 'Doctor') {
                        navigate('/Dashboard');
                    } else if (data.user.role === 'Patient') {
                        // Guardar patient_id en sessionStorage
                        try {
                            const patientResponse = await fetch(
                                getApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}?user_id=${data.user.id}`)
                            );
                            if (patientResponse.ok) {
                                const patientData = await patientResponse.json();
                                if (patientData.patient && patientData.patient.patient_id) {
                                    sessionStorage.setItem('selectedPatientId', patientData.patient.patient_id);
                                }
                            }
                        } catch (error) {
                            console.error('Error loading patient data:', error);
                        }
                        navigate('/PatientDashboard');
                    }
                }
            } else {
                alert('Login failed: ' + data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Unable to connect to server');
        }
    };

    const handleAcceptPassword = async () => {
        try {
            const response = await fetch(
                getApiUrl(`${API_CONFIG.ENDPOINTS.CHANGE_PASSWORD}/${userId}`),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        new_password: newPassword
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(`Your new password is: ${newPassword}\n\nPlease save it securely!`);
                setShowPasswordModal(false);

                // Navegar según rol
                if (userRole === 'Patient') {
                    navigate('/PatientDashboard');
                } else {
                    navigate('/Dashboard');
                }
            } else {
                alert('Failed to set password: ' + data.error);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Unable to change password');
        }
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(newPassword);
        alert('Password copied to clipboard!');
    };

    return(
        <>
            <div id="sig-in-cont">
                <h1 className='sig-up-in-header'>Sign In</h1>
                <form>
                    <div id="sign-in-inputs-container">
                        <input
                            className='si-up-in-inputs'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='si-up-in-inputs'
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                    <p className='si-in-font'>Don't have an account? <u style={{cursor: 'pointer'}} onClick={() => navigate('/SignUp')}>Sign Up</u></p>
                </form>
            </div>

            {/* Modal de cambio de contraseña */}
            {showPasswordModal && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            zIndex: 998
                        }}
                    />
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#14B8A6',
                            border: '3px solid black',
                            borderRadius: '12px',
                            padding: '2em',
                            zIndex: 999,
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                        }}
                    >
                        <h2 style={{color: 'white', fontFamily: 'var(--FONT-MULISH)', margin: '0 0 1em 0', textAlign: 'center'}}>
                            First Time Login
                        </h2>

                        <div style={{backgroundColor: 'white', borderRadius: '1em', padding: '1.5em'}}>
                            <p style={{marginBottom: '1.5em', textAlign: 'center', color: '#333'}}>
                                Since this is your first login, we've generated a secure password for you.
                            </p>

                            <div style={{
                                backgroundColor: '#f5f5f5',
                                padding: '1em',
                                borderRadius: '8px',
                                marginBottom: '1em',
                                border: '2px solid #14B8A6'
                            }}>
                                <label style={{display: 'block', marginBottom: '0.5em', fontWeight: 'bold', color: '#333'}}>
                                    Your New Password:
                                </label>
                                <div style={{display: 'flex', gap: '0.5em', alignItems: 'center'}}>
                                    <code style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        padding: '0.8em',
                                        borderRadius: '4px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.1em',
                                        color: '#14B8A6',
                                        fontWeight: 'bold',
                                        wordBreak: 'break-all'
                                    }}>
                                        {newPassword}
                                    </code>
                                    <button
                                        type='button'
                                        onClick={copyPassword}
                                        style={{
                                            padding: '0.8em',
                                            backgroundColor: '#51A9E9',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        title="Copy password"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: '#FFF9E6',
                                borderLeft: '4px solid #FFA500',
                                padding: '1em',
                                borderRadius: '0.5em',
                                marginBottom: '1em'
                            }}>
                                <p style={{margin: '0.5em 0', fontSize: '0.9em', color: '#666'}}>
                                    <strong>Important:</strong> Please save this password in a secure location.
                                </p>
                                <p style={{margin: '0.5em 0', fontSize: '0.9em', color: '#666'}}>
                                    You'll need it for future logins.
                                </p>
                            </div>

                            <button
                                type='button'
                                onClick={handleAcceptPassword}
                                style={{
                                    width: '100%',
                                    padding: '1em',
                                    backgroundColor: '#51A9E9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }}
                            >
                                I've Saved My Password - Continue
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SignIn