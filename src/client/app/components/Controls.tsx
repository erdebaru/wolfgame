import { useSocket } from "../socket";
import { useStore } from "../store";

export default function Controls() {
  const [state] = useStore();
  const { socket } = useSocket();
  const actions = [
    {
      name: "Start Game",
      action: () => {},
    },
    {
      name: "Next Round ",
      action: () => {},
    },
    {
      name: "Add player",
      action: () => {
        console.log("Adding player...");
        const result = socket.emit("new-player", state.username);
      },
    },
  ];
  return (
    <div>
      <h2>Controls</h2>
      {actions.map((a) => (
        <button key={a.name} onClick={a.action}>
          {a.name}
        </button>
      ))}
    </div>
  );
}
