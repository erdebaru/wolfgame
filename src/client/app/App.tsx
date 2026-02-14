import Controls from "./components/Controls";
import ServerMessages from "./components/ServerMessages";
import User from "./components/User";
import { useSocket } from "./socket";

function App() {
  const { isConnected } = useSocket();
  return (
    <>
      <p>Socket is {isConnected ? "connected" : "disconnected"}</p>
      <Controls />
      <User />
      <ServerMessages />
    </>
  );
}

export default App;
