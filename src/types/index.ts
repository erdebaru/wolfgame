import { Socket } from "socket.io";
import { Socket as SocketClient } from "socket.io-client";

export interface Player {
  uuid: string;
  name: string;
  alive: boolean;
}

export type Rooms = "lobby" | "game" | "wolf";

export interface ClientToServerEvents {
  "new-player": (name: string, callback: (uuid: string) => void) => void;
  message: (message: string, uuid: string, room: Rooms) => void;
  "game-start": () => void;
  "get-players": (callback: (players: Player[]) => void) => void;
}

export interface ServerToClientEvents {
  broadcast: (message: string | string[]) => void;
  "new-player": () => void;
}

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = SocketClient<
  ServerToClientEvents,
  ClientToServerEvents
>;
