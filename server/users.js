const moment = require('moment');

let users = [];

// save user
const saveUser = (name,room,id)=>{
    const user = {name,room,id};
    users.push(user);
}

// format msg
const msgFormat = (name,text)=>{
    return {
        name,
        text,
        time: moment().format('h:mm a')
    }
}

// get user
const getUser = (id)=>{
    return users.find(user=> user.id === id);
}

// remove user
const removeUser = (id)=>{
    users = users.filter(user=>user.id !==id);
}

module.exports ={
    saveUser,
    msgFormat,
    getUser,
    removeUser
}