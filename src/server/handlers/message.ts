import {
  ClientToServerEvents,
  ServerSocket,
  ServerToClientEvents,
} from "../../types";
import { Server } from "socket.io";
import { RoomManager } from "../engine/room";

export default function handler(
  socket: ServerSocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  socket.on("message", (message, uuid, room) => {
    RoomManager.get(room)?.message(message, uuid);
  });
}
