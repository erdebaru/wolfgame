import { Player } from "../engine";
import { ServerSocket } from "../../types";
import Store from "../store";

export default function handler(socket: ServerSocket) {
  socket.on("new-player", (name: string) => {
    const newPlayer: Player = new Player(name);
    Store.players.push(newPlayer);
    return newPlayer.uuid;
  });
}
