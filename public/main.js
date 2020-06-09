const socket = io()

let salida = document.getElementById('chat-salida')
let actions = document.getElementById('chat-action')
let username = document.getElementById('username')
let mensaje = document.getElementById('mensaje')
let btn = document.getElementById('send')


btn.addEventListener('click', function(){
    socket.emit('chat-message',{
        nick:username.value,
        mensaje:mensaje.value
    })
  username.value = ''
  mensaje.value = ''
  
})
socket.on('chat-message',(data)=>{
    actions.innerHTML = ''
    salida.innerHTML += `<p><strong>${data.nick}:</strong>${data.mensaje}</p>`
   })
   mensaje.addEventListener('keypress',()=>{
       socket.emit('typing',username.value)
   })

   socket.on('typing',(data)=>{
       actions.innerHTML = `<p>${data} esta escribiendo</p>`
   })