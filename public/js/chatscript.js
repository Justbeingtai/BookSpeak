// Connect to the socket server
const socket = io();

// Retrieve userId from local storage
const userId = localStorage.getItem('userId');

// Listen for incoming messages
socket.on('message', (message) => {
  addMessage(message);
});

// Submit message
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('chatMessage', { userId, message }); 
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
  window.location.replace('/views/index.html');
});
