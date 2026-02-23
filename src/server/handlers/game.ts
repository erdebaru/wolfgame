import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerSocket,
  ServerToClientEvents,
} from "../../types";
import { Game } from "../engine/game";
import Store from "../store";

export default function handler(
  socket: ServerSocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  socket.on("game-start", () => {
    const game = new Game(Store.players);
    Store.setGame(game);
    game.room.on("message", (m) => {
      for (const player of game.players.values()) {
        try {
          player.socket.emit("broadcast", m.toString());
        } catch (err) {
          console.error(
            "Error emitting game message to player",
            player.uuid,
            err,
          );
        }
      }
    });
    game.start();
  });
}
