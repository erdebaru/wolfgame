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
      name: "Next Round",
      action: () => { },
    },
    {
      name: "Add Bot",
      action: () => {
        socket.emit("add-bot");
      },
    },
  ];
  return (
    <div className="bg-slate-700 p-2 py-4">
      <div className="flex gap-2">
        {actions.map((a) => (
          <button
            className="p-2 text-amber-800 bg-amber-300 rounded cursor-pointer"
            key={a.name}
            onClick={a.action}
          >
            {a.name}
          </button>
        ))}
      </div>
    </div>
  );
}
