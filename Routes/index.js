import express from 'express'
import passport from 'passport'
const api = express.Router()

api.post('/registro',passport.authenticate('registroLocal',{
    successMessage:true,
    failureMessage:'No se pudo registrar'
}),(req,res)=>{
    res.json(req.user)
})

api.post('/login', passport.authenticate('LocalLogin',{
    successMessage:true,
    failureMessage:'usuario o contraseña incorrecta'
}),(req,res)=>{
    res.json(req.user)
})


module.exports = api