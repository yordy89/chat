const server = require('./app')

const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection', (socket)=>{
    console.log("Conectado",socket.id)

    socket.on('chat-message', (data)=>{
        io.sockets.emit('chat-message',data)
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})
