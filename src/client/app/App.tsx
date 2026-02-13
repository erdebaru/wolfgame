import { useSocket } from './socket';



function App() {
  const [isConnected, setIsConnected] = useSocket();
  return (<>
    <h1>Hello from Scratch!</h1>
    <p>Socket is {isConnected? 'connected' : 'disconnected'}</p>
  </>);
}

export default App;