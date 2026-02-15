import Controls from "./components/Controls";
import ServerMessages from "./components/ServerMessages";
import User from "./components/User";
import { useSocket } from "./socket";

function App() {
  const { isConnected } = useSocket();
  return (
    <>
      <p>Socket is {isConnected ? "connected" : "disconnected"}</p>
      <hr />
      <Controls />
      <hr />
      <User />
      <hr />
      <hr />
      <ServerMessages />
    </>
  );
}

export default App;
