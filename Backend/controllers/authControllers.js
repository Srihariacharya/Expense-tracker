const pool = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if(userExists.rows.length > 0){
            return res.status(400).json({message: 'User already exists'});
        }

        const hassedPassword = await bcrypt.hash(password,10);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *',
            [name, email, hassedPassword]
        )

        res.status(201).json({message: 'User registered Succesfully'});
    } catch(error) {
        res.status(500).json({message:'Error Occurred'});
    } 
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',[email]
        )

        if(user.rows.length === 0){
            return res.status(400).json({message:'Invaild Credentials'});
        } 

        const isMatch = await bcrypt.compare(password,user.rows[0].password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        const token = jwt.sign(
            {id: user.rows[0].id},
            'mysecretkey',
            {expiresIn: '1d'}
        )

        res.json({token});

    } catch(error) {
        res.status(500).json({message:'Error',error});
    }
}
module.exports = { register, login };