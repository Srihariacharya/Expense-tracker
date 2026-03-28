const Dashboard = ({expenses}) => {
    
    const totalAmount = expenses.reduce((sum, expense) => {
        return sum + parseFloat(expense.amount);
    }, 0)

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthTotal = expenses
    .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
        )})
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    const categoryBreakdown = expenses.reduce((acc, expense) => {
        const category = expense.category.trim();
        if(acc[category]) {
            acc[category] += parseFloat(expense.amount);
        } else {
            acc[category] = parseFloat(expense.amount);
        }
        return acc;
    }, {})

    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-500 text-white rounded-xl p-6 shadow">
                <p className="text-sm font-medium opacity-80">Total Spent</p>
                <p className="text-3xl font-bold mt-1">₹{totalAmount.toFixed(2)}</p>
            </div>

            <div className="bg-blue-500 text-white rounded-xl p-6 shadow">
                <p className="text-sm font-medium opacity-80">This Month</p>
                <p className="text-3xl font-bold mt-1">₹{thisMonthTotal.toFixed(2)}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
                <p className="text-sm font-medium text-gray-500 mb-2">Category Breakdown</p>
                { expenses.length === 0 ? (
                    <p className="text-gray-400">No expenses yet</p>
                ) : (
                  Object.keys(categoryBreakdown).map((category) => (
                    <div key={category} className="flex justify-betwwen text-sm text-gray-700 mb-1">
                        <span>{category}</span>
                        <span className="font-semibold">₹{categoryBreakdown[category].toFixed(2)}</span>
                    </div>
                  ))
                )}
            </div>
        </div>
    )
}
export default Dashboard;