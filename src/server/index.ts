import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../types";
import gameHandler from "./handlers/game";
import playersHandler from "./handlers/players";
import messageHandler from "./handlers/message";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(3000, {
  path: "/",
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  gameHandler(socket, io);
  playersHandler(socket, io);
  messageHandler(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

console.log("Socket.IO server running at http://localhost:3000/");
