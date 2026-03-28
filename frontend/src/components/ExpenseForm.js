import { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({onExpensesAdded, editData, onEditDone}) => {
    const [form, setForm] = useState(
        editData || {title:'', amount:'', category:'',date:'',note:''}
    )

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const config = {headers : {Authorization: `Bearer ${token}`}};

        try {
            if(editData) {
                await axios.put(`http://localhost:3000/api/expenses/${editData.id}`, form, config);
                onEditDone();
            } else {
                await axios.post('http://localhost:3000/api/expenses', form, config);
                onExpensesAdded();
            }
            setForm({title:'',amount:'',category:'',date:'',note:''});
        } catch (error) {
            console.log("Error Occured...",error);
        }
    }

    return (
        <div className="bg-white rounded-xl showdow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {editData ? 'Edit Expenses' : 'Add Expenses'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <input name='title' 
                       placeholder='Enter the title' 
                       value={form.title} 
                       onChange={handleChange} 
                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='amount' 
                       placeholder='Enter the amount' 
                       value={form.amount} 
                       onChange={handleChange} 
                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='category' 
                       placeholder='Enter the category' 
                       value={form.category} 
                       onChange={handleChange} 
                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='date' 
                       type='date' value={form.date} 
                       onChange={handleChange} 
                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input name='note' 
                       placeholder='Enter the note' 
                       value={form.note} 
                       onChange={handleChange}
                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                /> 
                <button onClick={handleSubmit}
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
                >
                    {editData ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    )
}

export default ExpenseForm;