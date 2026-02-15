import { useSocket } from "../socket";
import { useStore } from "../store";

export default function Controls() {
  const { socket } = useSocket();
  const actions = [
    {
      name: "Start Game",
      action: () => {
        socket.emit("game-start");
      },
    },
    {
      name: "Next Round ",
      action: () => {},
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
