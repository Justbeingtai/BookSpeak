// Core requirements
const path = require('path');
const http = require('http');
// const sslRedirect = require('express-sslify');
// const sslRedirect = require('heroku-ssl-redirect');
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
const messageForum = require('./utils/message');
const {
  joinChat,
  currentUser,
  userLeaves,
  chatRoom,
  getOnlineUsers
} = require('./utils/users');

// Controllers
const routes = require('./controllers/index.js');

// Constants
const PORT = process.env.PORT || 3000;
const admin = 'adminChat';

// Enable SSL (Secure Sockets Layer) redirect
// app.use(sslRedirect());
// app.use(sslRedirect());


// Connect front-end static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Room for each genre
const genres = [
  'Science Fiction',
  'Mystery/Crime',
  'Romance',
  'Horror',
  'Classics',
  'LGBTQ+',
  'Nonfiction',
  'How-to Guide',
  'Biography',
  'Religion/Spirituality',
];

genres.forEach((genre) => {
  io.of(`/${genre}`).on('connection', (socket) => {
    socket.on('joinChat', async ({ username }) => {
      try {
        const user = await joinChat(socket.id, username, genre);

        socket.join(user.room);

        // Welcome current user and announce user
        socket.emit('message', messageForum(admin, `Welcome to the ${genre} chat room!`));
        socket.broadcast.to(user.room).emit('message', messageForum(admin, `${user.username} has joined the chat.`));

        // Send user and room info
        io.of(`/${genre}`).to(user.room).emit('chatRoom', {
          room: user.room,
          users: await chatRoom(user.room),
          onlineUsers: await getOnlineUsers(user.room),
        });
      } catch (error) {
        console.log(error);
      }
    });

    // Listen for Chat messages
    socket.on('chatMessage', async (msg) => {
      try {
        const user = await currentUser(socket.id);
        io.of(`/${genre}`).to(user.room).emit('message', messageForum(user.username, msg));
      } catch (error) {
        console.log(error);
      }
    });

    // Client disconnects
    socket.on('disconnect', async () => {
      try {
        const user = await userLeaves(socket.id);

        if (user) {
          io.of(`/${genre}`).to(user.room).emit('message', messageForum(admin, `${user.username} has left the chat`));
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});








// // Core requirements
// const path = require('path');
// const http = require('http');
// require('dotenv').config();
// const fetch = require('node-fetch');
// const sslRedirect = require('heroku-ssl-redirect');

// // Express Initilization
// const express = require('express');
// const app = express();

// // Socket Set up
// const socketio = require('socket.io');
// const server = http.createServer(app);
// const io = socketio(server);

// // Chat bot for welcome message
// const admin = 'adminChat';

// //  Utility functions
// const messageForum = require('./utils/message');
// const {
//   joinChat,
//   currentUser,
//   userLeaves,
//   chatRoom,
// } = require('./utils/users');

// const PORT = process.env.PORT || 3000;

// // Enable SSL(Secure Sockets Layer) redirect
// app.use(sslRedirect());

// // Connect front-end static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Room for each genre
//   const genres = [
//     'Science Fiction',
//     'Mystery/Crime',
//     'Romance',
//     'Horror',
//     'Classics',
//     'LGBTQ+',
//     'Nonfiction',
//     'How-to Guide',
//     'Biography',
//     'Religion/Spirituality',
//   ];

// genres.forEach((genre) => {
//   io.of(`/${genre}`).on('connection', (socket) => {
//     socket.on('joinChat', ({ username }) => {
//       const user = joinChat(socket.id, username, genre);

//       socket.join(user.room);

// // Welcome current user and announce user
//       socket.emit('message', messageForum(admin, `Welcome to the ${genre} chat room!`));
//       socket.broadcast.to(user.room).emit('message', messageForum(admin, `${user.username} has joined the chat.`));

// // Send user and room info
//       io.of(`/${genre}`).to(user.room).emit('chatRoom', {
//         room: user.room,
//         users: chatRoom(user.room),
//       });
//     });

// // Listen for Chat messages
//     socket.on('chatMessage', (msg) => {
//       const user = currentUser(socket.id);
//       io.of(`/${genre}`).to(user.room).emit('message', messageForum(user.username, msg));
//     });

// // Client disconnects
//     socket.on('disconnect', () => {
//       const user = userLeaves(socket.id);

//       if (user) {
//         io.of(`/${genre}`).to(user.room).emit('message', messageForum(admin, `${user.username} has left the chat`));
//       }
//     });
//   });
// });


// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// fetch for Google Books
// app.get('/api/search', async (req, res) => {
//   const userSearch = req.query.query; 

//   try {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${process.env.API_KEY}`);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

