import passport from 'passport'
const User = require('../Models/User')
const localStrategy = require('passport-local').Strategy

passport.serializeUser((user,done)=>{
done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
  const user = await User.findById(id)
  done(null, user)
})

passport.use('registroLocal', new localStrategy({
   usernameField:'email',
   passwordField: 'password',
   passReqToCallback:true
}, async (req,email,password,done) => {
    const usuario = await User.findOne({email:email})
    if(usuario){
        done(null,false,{mensaje:'El correo esta en uso'})
    }else{
        const user = new User()
        user.email = email
        user.password = user.encryptPassword(password)
        user.usuario = req.body.usuario
        await user.save()
        done(null,user)
    }
}))

passport.use('LocalLogin', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, async (req,email,password,done) =>{
       const usuario = await User.findOne({email:email})
       if(!usuario){
         done(null,false,{mensaje:'No existe el usuario'})
           }
       if(!usuario.comparePassword(password)){ 
         done(null,false,{mensaje:'La contraseña es incorrecta'})
            }
         done(null,usuario)
}))