const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const redis = require('redis');
const adapter = require('@socket.io/redis-adpater').createAdapter;
require('dotenv').config();
const {
    joinChat,
    currentUser,
    userLeaves,
    chatRoom,
  } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect front-end static files
app.use(express.static(path.join(__dirname, 'public')));
