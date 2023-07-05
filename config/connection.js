// const mysql = require('mysql');
// require('dotenv').config();

// // Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// },
// console.log('Database connection established.'));

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
