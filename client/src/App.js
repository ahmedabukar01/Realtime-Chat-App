import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [openChat,setOpenChat] = useState(false);
  const [info,setInfo] = useState('');
  
  return (
    <div className="App">
      {openChat ? <Chat info={info} /> : <Login setInfo={setInfo} setOpenChat={setOpenChat}/>}
    </div>
  );
}

export default App;
