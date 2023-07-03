const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendIcon = document.getElementById('send-icon'); // Corrected this line

// Adds a message to the message container
function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Web Socket Section stuff
function sendMessage() {
  const message = messageInput.value;
  if (message) {
    // Need to replace the code below with Cheryls WebSocket
    addMessage(`You: ${message}`);
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
const leaveMessage = document.getElementById('leave-message');

leaveButton.addEventListener('click', function() {
  // Hide the chat container
  chatContainer.style.display = 'none';

  // Show a "You've left the chat" message
  leaveMessage.style.display = 'block';
});
