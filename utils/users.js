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

// Join user to the chat
function joinChat(id, username, chatroom) {
  return new Promise((resolve, reject) => {
    const user = { id, username, chatroom };

    // Insert the user into the Users table
    pool.query('INSERT INTO Users (id, username) VALUES (?, ?)', [id, username], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

// Get current user
function currentUser(id) {
  return new Promise((resolve, reject) => {
    // Retrieve the user from the Users table
    pool.query('SELECT * FROM Users WHERE id = ?', [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const user = result[0];
        resolve(user);
      }
    });
  });
}

// User leaves chat
function userLeaves(id) {
  return new Promise((resolve, reject) => {
    // Remove the user from the Users table
    pool.query('DELETE FROM Users WHERE id = ?', [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Get users in a chat room
function chatRoom(chatroom) {
  return new Promise((resolve, reject) => {
    // Retrieve users from the Users table based on the chatroom
    pool.query('SELECT * FROM Users WHERE chatroom = ?', [chatroom], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  joinChat,
  currentUser,
  userLeaves,
  chatRoom,
};
