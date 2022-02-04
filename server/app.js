const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const {Server} = require('socket.io');
const {saveUser, msgFormat,getUser,removeUser} = require('./users');

app.use(cors())

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

const admin = "Admin"
// SOCKET IO
io.on('connection',socket=>{
    console.log('connected')

    socket.on('joined',({name,room})=>{
        
        saveUser(name,room,socket.id);

        socket.join(room);

        // welcoming....
        socket.emit('msg',msgFormat(admin,`${name} welcome`));

        // when other join
        socket.broadcast.to(room).emit('msg',msgFormat(admin,`${name} joined the chat`))
    })

    socket.on('send',data=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('msg',msgFormat(user.name,data))
    })

    socket.on('disconnecting',()=>{
        const user = getUser(socket.id);

        if(user){
            removeUser(user.id);
            io.to(user.room).emit('msg',msgFormat(admin,`${user.name} has left the chat`))
        }
    })
})

server.listen('5000',()=>{
    console.log('the server is running')
})