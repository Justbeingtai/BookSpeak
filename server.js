const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
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


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
const exphbs = require('express-handlebars');
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('joinChat', ({ username, chatroom }) => {
    const user = joinChat(socket.id, username, chatroom);
    socket.join(user.chatroom);

    socket.emit('message', messageForum(admin, 'Welcome to the chat!'));

    io.to(user.chatroom).emit('chatRoom', {
      room: user.chatroom,
      users: chatRoom(user.chatroom),
    });
  });

  socket.on('chatMessage', (msg) => {
    const user = currentUser(socket.id);
    io.to(user.chatroom).emit('message', messageForum(user.username, msg));
  });


  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.chatroom).emit(
        'message',
        messageForum(admin, `${user.username} has left the chat`)
      );

      io.to(user.chatroom).emit('chatRoom', {
        room: user.chatroom,
        users: chatRoom(user.chatroom),
      });
    }
  });
});


app.get('/', (req, res) => {
  res.render('index', { title: 'Chat App' });
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
