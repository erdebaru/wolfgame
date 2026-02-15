import Connection from "./components/Connection";
import Controls from "./components/Controls";
import ServerMessages from "./components/ServerMessages";
import User from "./components/User";

function App() {
  return (
    <>
      <Connection />
      <hr />
      <Controls />
      <hr />
      <User />
      <hr />
      <ServerMessages />
    </>
  );
}

export default App;
