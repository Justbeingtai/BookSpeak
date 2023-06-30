const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const leaveButton = document.getElementById('leave-button');
const roomName = document.getElementById('room-name');
const currentUser = document.getElementById('users');

const socket = io();

// TESTING socket with Default Values
const chatroom = 'Default Chatroom'; 
const username = 'Test User';


// Web Socket Section stuff
// function sendMessage() {
//   const message = messageInput.value;
//   if (message) {
//     // Need to replace the code below with Cheryls WebSocket
//     addMessage(`You: ${message}`);
//     messageInput.value = '';
//   }
// }

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});


// Join chatroom
socket.emit('joinChat', { username, chatroom }); 

// Get chatroom and user
socket.on('chatRoom', ({ room, users }) => { 
  addRoomName(room);
  addRoomUsers(users);
});

// Submit message
messageInput.addEventListener('submit', (e) => {
  e.preventDefault();

// Get message
let msg = e.target.elements.msg.value;

msg = msg.trim();

if (!msg) {
  return false;
}

//Emit message to server
socket.emit('chat', msg);

// Clear input field
e.target.elements.msg.value = '';
e.target.elements.focus();
})

// Adds a message to the message container
function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = message.username;
  messageElement.innerHTML += `<span> ${message.time}</span>`;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// addRoomName to DOM
function addRoomName(chatroom) {
  roomName.innerText = chatroom;
}

// Add users to message container
function addRoomUsers(users) {
  currentUser.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    currentUser.appendChild(li);
  })
}

// user leaves chatroom
leaveButton.addEventListener('click', function() {
  socket.emit('disconnect');
  window.location.href = './index.html';
});