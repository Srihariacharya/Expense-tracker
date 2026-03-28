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
            const res = await axios.post('https://expense-tracker-backend-cmi2.onrender.com/api/auth/login', form);
            login(res.data.token);
            navigate('/expenses');
        } catch (err) {
            setError('Invalid Credentials');
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold tex-center text-gray-800 m-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input name="email" 
                       placeholder="Enter the email" 
                       onChange={handleChange}
                       className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name="password"
                       placeholder="Enter the Password" 
                       onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transistion"
                >
                    Login
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Did not Register!! Register First!! <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    )
}

export default Login;