const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const formatMessage = require('./utils/message')
const {userJoin, getCurrentUser, getRoomUsers, userLeave} = require('./utils/user')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname ,'public')))
const botName = 'Bot '

// Run client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({userName, room}) => {
        const user = userJoin(socket.id, userName, room)
        socket.join(user.room)

        console.log('New WS Connection...')
        socket.emit('message',formatMessage(botName, 'Welcome to Chat!'))
        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message',formatMessage(botName, `${user.userName} has joined the chat`))
        // Send room and users info
        io.to(user.room).emit('roomUser', {
            room: user.room,
            users:getRoomUsers(user.room)
        })
    })

    // Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.userName, msg))
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if(user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.userName} has left the chat`))
        }
    })
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))