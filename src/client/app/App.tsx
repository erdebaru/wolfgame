import Connection from "./components/Connection";
import Controls from "./components/Controls";
import Players from "./components/Players";
import ServerMessages from "./components/ServerMessages";
import User from "./components/User";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Connection />
      <Controls />
      <User />
      <div className="flex-1 flex">
        <ServerMessages />
        <Players />
      </div>
    </div>
  );
}

export default App;
