import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const config = require('./config')

const app = express()

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
app.get('/',(req,res)=>{
    res.send("Hello World")
})

//Middleware para vue
const history = require('connect-history-api-fallback')
app.use(history())



//inicializando el servidor
app.listen(config.port,()=>{
    console.log("Server on port 4000")
})