// Core requirements
const path = require('path');
const http = require('http');
require('dotenv').config();

// Express Initialization
const express = require('express');
const app = express();

// Session and Sequelize Setup
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// Socket Set up
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// Utility functions
const messageFormat = require('./utils/message');

// Controllers
const routes = require('./controllers/index.js');

// Constants
const PORT = process.env.PORT || 3000;
const admin = 'adminChat';

// Handlebars Set up
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

// Routes
app.use(routes);

// Socket set up
io.on('connection', (socket) => {
  console.log(`CONNECTED TO SOCKET. Socket: ${socket.id}`);

  // Listen for join events
  socket.on('join', ({ username }) => {
    console.log(`${username} joined the chat`);

    // Send a welcome message to the user
    socket.emit('message', messageFormat(admin, `Welcome to the chat room!`));

    // Broadcast a message to all other connected users
    socket.broadcast.emit('message', messageFormat(admin, `${user.username} has joined the chat.`));
  });

  // Listen for chat message events
  socket.on('chatMessage', async (message) => {
    console.log(`Message: ${message}`);

    // Broadcast the message to all connected users
    io.emit('message', await messageFormat('User', message));
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Broadcast a message to all connected users
    io.emit('message', messageFormat(admin, `A user has left the chat`));
  });
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Chat App' });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
