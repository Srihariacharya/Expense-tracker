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
            await axios.post('https://expense-tracker-backend-cmi2.onrender.com/api/auth/register', form);
            navigate('/login');
        } catch(err) {
            setError('Registration failed!');
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold tex-center text-gray-800 m-6">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input name='name' 
                       placeholder='Enter the name' 
                       onChange={handleChange}
                       className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='email' 
                       placeholder='Enter the Email' 
                       onChange={handleChange}
                       className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='password' 
                       placeholder='Enter the password' 
                       onChange={handleChange}
                       className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Register
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account!! <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register;