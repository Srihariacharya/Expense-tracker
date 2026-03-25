const pool = require('../db/index');

const getExpenses = async (req,res) => {
  try{
    const expenses = await pool.query(
        'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',[req.user.id]
    )
    res.json(expenses.rows);
  } catch (error) {
    return res.status(500).json({message:'Error',error})
  }
}

const addExpense = async (req,res) => {
    console.log('Body: ',req.body)
    console.log('User: ',req.user)
    const {title, amount, category, date, note} = req.body;
    try {
        const newExpense = await pool.query(
            'INSERT INTO expenses(user_id,title, amount, category,date,note) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[req.user.id,title,amount,category,date,note]
        )
        res.status(201).json(newExpense.rows[0]);
    } catch (error) {
        return res.status(500).json({message:'Error', error});
    }
}

const updateExpense = async (req,res) => {
    const { id } = req.params;
    const { title,amount,category,date,note } = req.body;

    try {
        const upExpense = await pool.query(
            'UPDATE expenses SET title=$1, amount=$2,category=$3,date=$4,note=$5 WHERE id=$6 AND user_id=$7 RETURNING *',[title,amount,category,date,note,id,req.user.id]
        )
        res.json(upExpense.rows[0]);
     } catch (error) {
        res.status(500).json({message:'Error',error});
     }
}

const deleteExpense = async (req,res) => {
    const  { id }  = req.params;

    try{
        await pool.query(
            'DELETE FROM expenses WHERE id=$1 AND user_id = $2', [id,req.user.id]
        )
        res.json({message:'Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:'Error',error});
    }
}

module.exports= { getExpenses, addExpense, updateExpense, deleteExpense };