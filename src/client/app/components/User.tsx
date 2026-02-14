import { useState } from "react";
import { useStore } from "../store";

export default function User() {
  const [state, setState] = useStore();
  const [username, setUsername] = useState(state.username || "");
  return (
    <>
      {state.username ? (
        <p>Playing as {state.username}</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => {
              setState({ username });
            }}
          >
            Set Username
          </button>
        </div>
      )}
    </>
  );
}
