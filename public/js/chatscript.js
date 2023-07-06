const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendIcon = document.getElementById('send-icon');
const leaveButton = document.getElementById('leave-button');

const currentUser = document.getElementById('users');

// Connect to the socket server
const socket = io();

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
  }
}

// Click event to send message
sendIcon.addEventListener('click', sendMessage);

// The feature when a user presses the enter/return key
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
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

// user leaves chatroom
leaveButton.addEventListener('click', () => {
  socket.emit('disconnect');
  window.location.replace = '/views/index.html';
});