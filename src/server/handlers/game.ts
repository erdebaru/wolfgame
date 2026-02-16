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
  if (Store.game) {
    Store.game.messages.map((m) => socket.emit("broadcast", m.toString()));
  }
  socket.on("game-start", () => {
    const game = new Game(Game.assignPlayers(Store.players, 2));
    Store.setGame(game);
    game.messages.map((m) => io.emit("broadcast", m.toString()));
    game.on("message", (message) => {
      io.emit("broadcast", message.toString());
    });
  });
}
