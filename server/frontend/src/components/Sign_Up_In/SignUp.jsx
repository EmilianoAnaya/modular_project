import './SignUp.css';
import './SignShared.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        date_of_birth: '',
        country: '',
        city: '',
        password: '',
        confirm_password: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }; 
    const handleRegister = async () => {
        if (formData.password !== formData.confirm_password) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    gender: 'Male',
                    date_of_birth: formData.date_of_birth,
                    city: formData.city,
                    country: formData.country,
                    password: formData.password,
                    role: 'Doctor'
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please sign in.');
                navigate('/SignIn');
            } else {
                alert('Registration failed: ' + data.error);
            }
        } catch (error) {
            alert('Unable to connect to server');
        }
    };
    return (
        <>
            <div id='sign-up-content'>
                <h1 className="sig-up-in-header">Sign Up</h1>
                <form>
                    <div id='sign-up-inputs-container'>
                    <input
                        className="si-up-in-inputs" 
                        type='text' 
                        placeholder='Name'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="text" 
                        placeholder='Surname'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                    <select name="Gender" defaultValue="none" className="si-up-in-select">
                            <option value="none">-- Gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                    </select>
                    <input 
                        className="si-up-in-inputs" 
                        type="email" 
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="date"
                        name='date_of_birth'
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="text" 
                        placeholder='Country'
                        name='country'
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="text" 
                        placeholder='City'
                        name='city'
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <input 
                        className="si-up-in-inputs" 
                        type="password" 
                        placeholder='Confirm Password'
                        name='confirm_password'
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                    />
                </div>
                    <div className='si-up-butt-cont'>
                        <button type='button' className='si-up-in-buttons' onClick={() => navigate('/')}>Cancel</button>
                        <button type='button' className='si-up-in-buttons' onClick={handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp