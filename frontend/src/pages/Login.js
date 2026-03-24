import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({email:'', password:''});
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', form);
            login(res.data.token);
            navigate('/expenses');
        } catch (err) {
            setError('Invalid Credentials');
        }
    }
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input name="email" placeholder="Enter the email" onChange={handleChange}/>
            <input name="password" placeholder="Enter the Password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            <p>Did not Register!! Register First!! <a href='/register'>Register</a></p>
        </div>
    )
}

export default Login;