const { Pool } = require('pg');
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {rejectUnauthorized: false}
})

pool.connect((err) => {
    if(err) {
        console.log("Database Connection failed", err);
    } else {
        console.log("Database Connected Succesfully");
    }
})

module.exports = pool;