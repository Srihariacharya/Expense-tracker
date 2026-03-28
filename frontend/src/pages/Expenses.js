import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';

const Expenses = () => {
    const [expenses,setExpenses] = useState([]);
    const [editData, setEditData] = useState(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('https://expense-tracker-backend-cmi2.onrender.com/api/expenses', {headers: {Authorization: `Bearer ${token}`}});
            console.log('Data from backend:', res.data);
            setExpenses(res.data);
        } catch (error) {
            console.log("Error Occured", error);
        }
    }

    useEffect(() =>{
        fetchExpenses()
    }, [])
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-8">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
                    <button onClick={handleLogout}
                            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"        
                    >
                        Logout
                    </button>
                </div>

                    <Dashboard expenses = {expenses} />

                    <ExpenseForm 
                        onExpensesAdded = {fetchExpenses}
                        editData = {editData}
                        onEditDone ={() => {
                        setEditData(null)
                        fetchExpenses()
                      }}
                    />

                    <ExpenseList 
                        expenses = {expenses}
                        onDelete = {fetchExpenses}
                        onEdit = {(expenses) => setEditData(expenses)}
                    />
            </div>
        </div>
    )
}
export default Expenses;