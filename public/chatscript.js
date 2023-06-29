const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const leaveButton = document.getElementById('leave-button');

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
  }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

leaveButton.addEventListener('click', function() {
  // Replace the code below with Cheryls WebSocket implementation

  messageContainer.innerHTML = '';
  messageInput.value = '';
  addMessage('You have left the chat.');
});
