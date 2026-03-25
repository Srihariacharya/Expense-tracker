import axios from 'axios';

const ExpenseList = ({expenses, onDelete, onEdit}) => {
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const config = {headers: {Authorization: `Bearer ${token}`}};

        try {
            await axios.delete(`http://localhost:3000/api/expenses/${id}`, config);
            onDelete();
        } catch (error) {
            console.log("Error",error);
        }
    }

    return (
        <div>
            <h3>Expenses List</h3>
            {expenses.length === 0 && <p>No Expenses added in list</p>}
            {expenses.map((expense) => (
                <div key={expense.id} style={{border: '1px solid grey', margin: '10px', padding:'10px'}}>
                    <p>Title: {expense.title}</p>
                    <p>Amount: {expense.amount}</p>
                    <p>Category: {expense.category}</p>
                    <p>Date: {expense.date}</p>
                    <p>Note: {expense.note}</p>
                    <button onClick={() => onEdit(expense)}>Edit</button>
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
export default ExpenseList;