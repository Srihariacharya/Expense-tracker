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
        const category = expense.category;
        if(acc[category]) {
            acc[category] += parseFloat(expense.amount);
        } else {
            acc[category] = parseFloat(expense.amount);
        }
        return acc;
    }, {})

    return (
        <div>
            <h3>DashBoard</h3>

            <div>
                <h3>Expense Spent</h3>
                <p>₹{totalAmount.toFixed(2)}</p>
            </div>

            <div>
                <h3>Monthly Expense</h3>
                <p>₹{thisMonthTotal.toFixed(2)}</p>
            </div>

            <div>
                <h3>Category</h3>
                {Object.keys(categoryBreakdown).map((category) => (
                    <div key={category}>
                        <p>{category}: ₹{categoryBreakdown[category].toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Dashboard;