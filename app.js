import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const app = express()

const config = require('./config')


//BD
import mongoose from 'mongoose'
mongoose.connect(config.db.url,config.db.options)
.then(
    console.log("Conectado a BD")
)
.catch(e => {
    console.log(e)
})

//Middlewars
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Rutas

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

//Middleware para vue
const history = require('connect-history-api-fallback')
app.use(history())



//inicializando el servidor
const server = app.listen(config.port,()=>{
    console.log("Server on port 4000")
})

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

