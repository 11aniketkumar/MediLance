const socket = io("http://localhost:5000");
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const username = prompt("Enter your name: ");
appendMessage('You joined');

socket.emit('new-user', username);

socket.on('chat-message', data=>{
    appendMessage(data.sender + ":" + data.message);
});

socket.on('user-connected', username=>{
    appendMessage(username + " joined");
});

socket.on('user-disconnected', username=>{
    appendMessage(username + " left");
});

messageForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage("You:" + message);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}