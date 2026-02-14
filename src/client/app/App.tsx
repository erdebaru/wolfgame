import User from "./components/User";
import { useSocket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useSocket();
  return (
    <>
      <p>Socket is {isConnected ? "connected" : "disconnected"}</p>
      <User />
    </>
  );
}

export default App;
