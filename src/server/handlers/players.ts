import { Player } from "../engine";
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
  socket.on("new-player", (name: string) => {
    const newPlayer: Player = new Player(name);
    Store.players.push(newPlayer);
    io.emit("broadcast", `${newPlayer.name} has joined the game!`);
    return newPlayer.uuid;
  });
}
