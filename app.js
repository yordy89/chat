import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const app = express()
const server = require('http').Server(app)
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
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Content-Type')
    next()
})

//Rutas

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

//Middleware para vue
const history = require('connect-history-api-fallback')
app.use(history())



//inicializando el servidor
server.listen(config.port,()=>{
    console.log("Server on port 4000")
})

const SocketIO = require('socket.io')
const io = SocketIO(server)
let users = []
let messages = []
let index = 0
io.on('connection', socket=>{

 
   /*socket.emit('loggin', {
       usuarios: users.map(s => s.username),
       mensajes:messages
   })*/
   socket.on('newUser', usuario => {
   socket.username = usuario
   users.push(socket)
   console.log(`${socket.username} se ha conectado`)
   io.emit('userOnline', {
    usuarios: users.map(s => s.username),
    mensajes:messages
})
   })

   socket.on('msg', msg => {
       let message = {
           index:index,
           username:socket.username,
           msg:msg
       }
       messages.push(message)
     io.emit('msg',message)
     index++
   })

   socket.on('disconnect', ()=>{
       console.log(`${socket.username} se desconecto`)
       io.emit('salio',socket.username)
       users.splice(users.indexOf(socket),1)
   })

   socket.on('typing', username => {
       socket.broadcast.emit('typing',username)
   })
   socket.on('stopTyping', () => {
       socket.broadcast.emit('stopTyping')
   })
})

