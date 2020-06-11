import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const app = express()
const server = require('http').Server(app)
const config = require('./config')


//Passport and Session
import passport from 'passport'
import session from 'express-session'
require('./Passport/local-auth')
app.use(session({
    secret:'misessiosecreta',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

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
const api = require('./Routes')
app.use('/api',api)

//Middleware para vue
const history = require('connect-history-api-fallback')
app.use(history())



//inicializando el servidor
server.listen(config.port,()=>{
    console.log("Server on port 4000")
})

const SocketIO = require('socket.io')
const io = SocketIO(server)
 require('./socket')(io)

