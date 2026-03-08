import "dotenv/config";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../types";
import gameHandler from "./handlers/game";
import playersHandler from "./handlers/players";
import messageHandler from "./handlers/message";
import Store from "./store";
import { RoomManager } from "./engine/room";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(3000, {
  path: "/ws",
  cors: {
    origin: "*",
  },
});

Store.createLobby();
if (Store.lobby) {
  Store.lobby.on("message", (message) => {
    io.emit("broadcast", message.toJSON());
  });
}

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  gameHandler(socket, io);
  playersHandler(socket, io);
  messageHandler(socket, io);

  socket.emit(
    "broadcast",
    RoomManager.getMessages(["game", "lobby"]).map((m) => m.toJSON()),
  );

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

console.log("Socket.IO server running at http://localhost:3000/");
