import { Player } from "../engine/player";
import {
  ClientToServerEvents,
  ServerSocket,
  ServerToClientEvents,
} from "../../types";
import Store from "../store";
import { Server } from "socket.io";

export default function handler(
  socket: ServerSocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  socket.on("new-player", (name: string, callback) => {
    const newPlayer: Player = new Player(name, socket);
    Store.addPlayer(newPlayer);
    io.emit("broadcast", `${newPlayer.name} has joined the game!`);
    callback(newPlayer.uuid);
  });

  socket.on("get-players", (callback) => {
    // Return a plain, serializable version of players to avoid circular
    // references (Player contains a socket which can't be serialized).
    const plainPlayers = [...Store.players.values()].map((p) => ({
      uuid: p.uuid,
      name: p.name,
      alive: p.alive,
    }));
    callback(plainPlayers);
  });
}
