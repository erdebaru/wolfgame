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
    <div className="bg-slate-800 text-slate-200 p-2 py-4">
      {state.uuid ? (
        <p>
          Playing as {state.username} [{state.uuid}]
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-slate-700 rounded px-4 cursor-pointer"
            onClick={onSet}
          >
            Set Username
          </button>
        </div>
      )}
    </div>
  );
}
