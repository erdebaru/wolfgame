import Connection from "./components/Connection";
import Controls from "./components/Controls";
import ServerMessages from "./components/ServerMessages";
import User from "./components/User";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Connection />
      <Controls />
      <User />
      <ServerMessages />
    </div>
  );
}

export default App;
