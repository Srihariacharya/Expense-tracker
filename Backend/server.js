require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses')

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is running in port 3000");
})