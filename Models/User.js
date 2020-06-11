import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import passport from 'passport'
const Schema = mongoose.Schema


const SchemaUser = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    usuario:{type:String,unique:true,required:true}
})

SchemaUser.methods.encryptPassword = (password) => {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

SchemaUser.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('Users',SchemaUser)