const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
const admin = 'adminChat';
const messageForum = require('./utils/message');
require('dotenv').config();
const {
    joinChat,
    currentUser,
    userLeaves,
    chatRoom,
  } = require('./utils/users');
const PORT = process.env.PORT || 3000;


// Connect front-end static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect when client connects
io.on('connection', (socket) => {
    socket.on('joinChat', ({ username, chatroom}) => {
        const user = joinChat(socket.id, username, chatroom);

        socket.join(user.chatroom);

// Welcome current user
socket.emit('message', messageForum(admin, "Welcome to the chat!"));

// Send user and room info
io.to(user.chatroom).emit('chatRoom', {
    room: user.chatroom,
    users: chatRoom(user.chatroom),
});
    });

// Listen for Chat messages
socket.on('chatMessage', (msg) => {
    const user = currentUser(socket.id);
    io.to(user.chatroom).emit('message', messageForum(user.username, msg));
});

// Client disconnects
socket.on('disconnet', ()=> {
    const user = userLeaves(socket.id);

if (user) {
    io.to(user.chatroom).emit ('message', messageForum(admin, `${user.username} has left the chat`));


// Send user and room info
io.to(user.chatroom).emit('chatRoom', {
    room: user.chatroom,
    users: chatRoom(user.chatroom),
  });
}
});
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    const user = {
      username,
      password
    };
  

    return res.send('User registered successfully');
  });
  

  app.use(express.static(path.join(__dirname, 'public')));
  
  
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  
  
  
  
  
  
  