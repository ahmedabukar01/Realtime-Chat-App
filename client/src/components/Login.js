import React, { useState } from 'react';
import {userInfo} from './Chat';

const Login = ({setInfo, setOpenChat}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleRoom = (e)=>{
        setRoom(e.target.value);
    }

    const submitData = (e)=>{
        e.preventDefault();

        userInfo(name,room);
        setInfo(name);
        setOpenChat(true)
    }
  return(
      <div className="login">
          <form onSubmit={submitData}>
              <label>Sign in</label>
              <input type="text" value={name} onChange={handleName} placeholder='Name' required />
              <input type="text" value={room} onChange={handleRoom} placeholder='Room' required />
              <button>Join Chat</button>
          </form>
      </div>
  );
};

export default Login;
