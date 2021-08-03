
const chatFrom = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// Get username & room from URL
const {userName, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
console.log(userName, room)

const socket = io()

// Join chatroom
socket.emit('joinRoom', {userName, room})

// Get room and users
socket.on('roomUser',({ room, users}) => {
    outputRoomName(room)
    outputUsers(users)
})


// Message for server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get message text
    const msg = e.target.elements.msg.value
    // Emit messageto server
    socket.emit('chatMessage', msg)
    console.log(msg)

    // Clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// Outpout message to DOM
function outputMessage(message) {
    const div = document.createElement(`div`)
    div.classList.add('message')
    div.innerHTML = `<div class="message">
    <p class="meta">${message.userName}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>
</div>`
document.querySelector('.chat-messages').appendChild(div)
}



function outputRoomName(room) {
    roomName.innerHTML = room
}


function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.userName}</li>`).join('')}`
}