const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendIcon = document.getElementById('send-icon'); 
const sendButton = document.getElementById('send-button');
const leaveButton = document.getElementById('leave-button');
const roomName = document.getElementById('room-name');
const currentUser = document.getElementById('users');

const socket = io();

// TESTING socket with Default Values
const chatroom = 'Default Chatroom';
const username = 'Test User';


// Join chatroom
socket.emit('joinChat', { username, chatroom });

// Get chatroom and user
socket.on('chatRoom', ({ chatroom, users }) => {
  addRoomName(chatroom);
  addRoomUsers(users);
});

// Submit message
function sendMessage() {
  const message = messageInput.value;
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = '';
    sendIcon.innerHTML = '➤'; // Reset the icon
  }
}

//Emit message to server
socket.emit('chat', msg);

messageInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
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
  });
}

// user leaves chatroom
leaveButton.addEventListener('click', () => {
  socket.emit('disconnect');
  window.location.href = './index.html';
});

