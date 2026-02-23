import { useEffect, useState } from "react";
import { useSocket } from "../socket";
import { Player } from "../../../types";

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const { socket } = useSocket();
  const getUsers = () => {
    socket.emit("get-players", (players) => {
      setPlayers(players);
    });
  };
  useEffect(() => {
    getUsers();
    const onNewPlayer = () => {
      getUsers();
    };
    socket.on("new-player", onNewPlayer);
    return () => {
      socket.off("new-player", onNewPlayer);
    };
  }, []);
  return (
    <div className="bg-slate-600 text-slate-400 flex-2/12 px-2 py-2">
      <h2 className="">Players</h2>
      {players.map((p) => (
        <div
          key={p.uuid}
          className="rounded px-2 py-1 bg-slate-500 text-slate-800 mb-2"
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
