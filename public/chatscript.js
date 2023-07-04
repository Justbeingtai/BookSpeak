const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendIcon = document.getElementById('send-icon'); // Corrected this line
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

// Listen for incoming messages
socket.on('message', (message) => {
  addMessage(message);
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

// Click event to send message
sendIcon.addEventListener('click', sendMessage);

// The feature when a user presses the enter/return key
messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevents a new line from being created when pressing Enter
    sendMessage();
  }
});

// Code to change send icon
messageInput.addEventListener('input', function() {
  sendIcon.innerHTML = this.value.trim() !== '' ? '➤' : '➤';
});
const chatContainer = document.getElementById('chat-container');


// leaveButton.addEventListener('click', function() {
//   // Hide the chat container
//   chatContainer.style.display = 'none';

//   // Show a "You've left the chat" message
//   leaveMessage.style.display = 'block';



// // Submit message
// messageInput.addEventListener('submit', (e) => {
//   e.preventDefault();

// // Get message
// let msg = e.target.elements.msg.value;

// msg = msg.trim();

// if (!msg) {
//   return false;
// }

// //Emit message to server
// socket.emit('chat', msg);

// Clear input field
e.target.elements.msg.value = '';
e.target.elements.focus();
})

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
  })
}

// user leaves chatroom
leaveButton.addEventListener('click', function() {
  socket.emit('disconnect');
  window.location.href = './index.html';
});