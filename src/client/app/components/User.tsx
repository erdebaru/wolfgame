import { useState } from "react";
import { useStore } from "../store";
import { useSocket } from "../socket";

export default function User() {
  const [state, setState] = useStore();
  const { socket } = useSocket();
  const [username, setUsername] = useState(state.username || "");
  const onSet = () => {
    socket.emit("new-player", username, (uuid) => {
      setState({
        username,
        uuid,
      });
    });
  };
  return (
    <>
      {state.uuid ? (
        <p>
          Playing as {state.username} [{state.uuid}]
        </p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={onSet}>Set Username</button>
        </div>
      )}
    </>
  );
}
