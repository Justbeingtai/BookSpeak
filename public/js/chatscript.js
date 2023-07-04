const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendIcon = document.getElementById('send-icon'); 
const sendButton = document.getElementById('send-button');
const leaveButton = document.getElementById('leave-button');
const roomName = document.getElementById('room-name');
const currentUser = document.getElementById('users');

const socket = io();

// TESTING socket with Default Values
const room = 'Default Chatroom'; 
const username = 'Test User';


// Join chatroom
socket.emit('joinChat', { username, room }); 

// Get chatroom and user
socket.on('chatRoom', ({ room, users }) => { 
  addRoomName(room);
  addRoomUsers(users);
});

// Listen for incoming messages
socket.on('message', (message) => {
  addMessage(message);
});

// Submit message
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('chatMessage', message);
    messageInput.value = '';
    sendIcon.innerHTML = '➤'; // Reset the icon
  }
}

// Click event to send message
sendIcon.addEventListener('click', sendMessage);

// The feature when a user presses the enter/return key
messageInput.addEventListener('keydown', (event) =>{
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevents a new line from being created when pressing Enter
    sendMessage();
  }
});

// Code to change send icon
messageInput.addEventListener('input', function() {
  sendIcon.innerHTML = this.value.trim() !== '' ? '➤' : '➤';
});

// Adds a message to the message container
function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = `${message.username}: ${message.text}`;
  messageElement.innerHTML += `<span> ${message.time}</span>`;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// addRoomName to DOM
function addRoomName(room) {
  roomName.innerText = room;
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
leaveButton.addEventListener('click', () => {
  socket.emit('disconnect');
  window.location.href = './index.html';
});


