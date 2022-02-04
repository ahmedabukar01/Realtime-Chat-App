import {useState, useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';


const socket = io.connect('http://localhost:5000');


export function userInfo(name,room){

    socket.emit('joined',{name,room})
}

const Chat = ({info}) => {

    const [value,setValue] = useState('');
    const [msg,setMsg] = useState('');

    const handleValue = (e)=>{
        setValue(e.target.value);
    }

    const send = (e)=>{
        e.preventDefault();

        if(value){
            socket.emit('send',value);
        }

        setValue('');
    }

    useEffect(()=>{

        socket.on('msg',data=>{
            setMsg((old)=>[...old,data]);
        })
        socket.on('joined',data=>{
            console.log(data)
        })

    },[socket])

  return(
      <div className='chat'>
          <div className='chat-box'>
              <div className='msg-header'>
                  Realtime Chat App
              </div>
              <div className='msg-body'>
              <ScrollToBottom className="scroll">
                {msg && msg.map(user=>(
                    <div className='msg' id={info === user.name? "me" : "others" }>
                    <div className="msg-top">
                        <span className='name'>{user.name} </span>
                        <span className='date'>{user.time}</span>
                    </div>
                    <div className='msg-text'>
                        {user.text}
                    </div>
                    </div>
                ))}
              </ScrollToBottom>
              </div>
              <div className='msg-footer'>
                  <form onSubmit={send}>
                      <input type="text" value={value} onChange={handleValue} placeholder="text" />
                      <SendIcon className="icon" />
                  </form>
              </div>
          </div>
      </div>
  );
};

export default Chat;
