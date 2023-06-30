const mysql = require('mysql');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
},
console.log('Database connection established.'));