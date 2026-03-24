import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form,setForm] = useState({name:'', email:'', password:''});
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', form);
            navigate('/login');
        } catch(err) {
            setError('Registration failed!');
        }
    }

    return (
        <div>
            <h2>Register Form</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input name='name' placeholder='Enter the name' onChange={handleChange}/>
            <input name='email' placeholder='Enter the Email' onChange={handleChange}/>
            <input name='password' placeholder='Enter the password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            <p>Already have an account!! <a href='/login'>Login</a></p>
        </div>
    )
}

export default Register;