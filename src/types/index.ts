import { Socket } from "socket.io";
import { Socket as SocketClient } from "socket.io-client";

export interface ClientToServerEvents {
  "new-player": (name: string, callback: (uuid: string) => void) => void;
  message: (message: string, uuid: string) => void;
  "game-start": () => void;
}

export interface ServerToClientEvents {
  broadcast: (message: string) => void;
}

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = SocketClient<
  ServerToClientEvents,
  ClientToServerEvents
>;
