import axios from 'axios';

const ExpenseList = ({expenses, onDelete, onEdit}) => {
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const config = {headers: {Authorization: `Bearer ${token}`}};

        try {
            await axios.delete(`https://expense-tracker-backend-cmi2.onrender.com/api/expenses/${id}`, config);
            onDelete();
        } catch (error) {
            console.log("Error",error);
        }
    }

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">All Expenses</h3>
            {expenses.length === 0 && (
                <p className="text-gray-400">No Expenses added yet</p>
            )}
            <div className="grid grid-cols-1 gap-4">
                {expenses.map((expense) => (
                <div key={expense.id} className="bg-white rounded-xl shadow p-5 flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{expense.title}</p>
                    <p className="text-sm teat-gray-500">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400 mt-1">{expense.note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-500">₹{expense.amount}</p>
                    <div className="mt-2 flex gap-2 justify-end">
                        <button onClick={() => onEdit(expense)}
                                className="text-sm bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"    
                        >
                            Edit
                        </button>
                        <button onClick={() => handleDelete(expense.id)}
                                 className="text-sm bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"    
                        >
                            Delete
                        </button>
                    </div>
                   </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default ExpenseList;