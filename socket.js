module.exports = function(io){
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
}