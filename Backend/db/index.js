const { Pool } = require('pg');
const pool = new Pool ({
    user:'postgres',
    host:'localhost',
    database:'expense_tracker',
    password:'sri123',
    port:'5432'
})

pool.connect((err) => {
    if(err) {
        console.log("Database Connection failed"+err);
    } else {
        console.log("Database Connected Succesfully");
    }
})

module.exports = pool;