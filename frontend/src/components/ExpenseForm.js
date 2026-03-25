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
        <div>
            <h3>{editData ? 'Edit Expenses' : 'Add Expenses'}</h3>
            <input name='title' placeholder='Enter the title' value={form.title} onChange={handleChange} />
            <input name='amount' placeholder='Enter the amount' value={form.amount} onChange={handleChange} />
            <input name='category' placeholder='Enter the category' value={form.category} onChange={handleChange} />
            <input name='date' type='date' value={form.date} onChange={handleChange} />
            <input name='note' placeholder='Enter the note' value={form.note} onChange={handleChange} /> 
            <button onClick={handleSubmit}>{editData ? 'Update' : 'Add'}</button>
        </div>
    )
}

export default ExpenseForm;