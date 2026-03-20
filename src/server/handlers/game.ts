import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerSocket,
  ServerToClientEvents,
} from "../../types";
import { Game } from "../engine/game";
import { store } from "../store";
import { AINarrator } from "../engine/narrator";

let narratorAssigned = false;

export default function handler(
  socket: ServerSocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  socket.on("game-start", () => {
    const game = new Game(store.players);
    store.setGame(game);
    game.room.on("message", (m) => {
      for (const player of game.players.values()) {
        player.socket.emit("broadcast", m.toJSON());
      }
    });

    if (!narratorAssigned) {
      new AINarrator();
      narratorAssigned = true;
    }

    game.start();
    socket.emit("game-update", {
      game_status: "on_going",
      round: "discuss",
    });
  });
}
