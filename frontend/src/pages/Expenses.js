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
            const res = await axios.get('http://localhost:3000/api/expenses', {headers: {Authorization: `Bearer ${token}`}});
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
        <div>
            <h2>Expenses</h2>
            <button onClick={handleLogout}>Logout</button>

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
    )
}
export default Expenses;