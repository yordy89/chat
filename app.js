import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
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

io.on('connection', ()=>{
    console.log("Conectado")
})

//inicializando el servidor
app.listen(config.port,()=>{
    console.log("Server on port 4000")
})

