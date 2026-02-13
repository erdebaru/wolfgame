import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { socket } from './socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() { setIsConnected(true); }
    function onDisconnect() { setIsConnected(false); }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (<>
    <h1>Hello from Scratch!</h1>
    <p>Socket is {isConnected ? 'connected' : 'disconnected'}</p>
  </>);
}

const root = document.getElementById('root');
if(root){
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}

