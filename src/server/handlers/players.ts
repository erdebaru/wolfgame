import { Player } from "../engine/player";
import {
  ClientToServerEvents,
  ServerSocket,
  ServerToClientEvents,
} from "../../types";
import Store from "../store";
import { Server } from "socket.io";
import { AIBot } from "../engine/player/bot";
import personas from "../engine/player/personas";

export default function handler(
  socket: ServerSocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  socket.on("new-player", (name: string, callback) => {
    const newPlayer: Player = new Player(name, socket);
    Store.addPlayer(newPlayer);
    Store.lobby.message(`${newPlayer.name} has joined the game!`);
    io.emit("new-player");
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

  socket.on("add-bot", () => {
    const persona = personas[Math.floor(Math.random() * personas.length)];
    if (!persona) return;
    new AIBot({
      name: `${persona.name} (Bot)`,
      systemPrompt: `You are playing Werewolf. Your persona is: ${persona.personality}. Keep chat to 1-2 short sentences. Do not use asterisks or markdown, just talk.`,
    });
  });
}
