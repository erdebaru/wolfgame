import { Socket } from "socket.io";
import { Socket as SocketClient } from "socket.io-client";

export type Player = {
  name: string;
  uuid: string;
};

export interface ClientToServerEvents {
  "new-player": (name: string, callback: (uuid: string) => void) => void;
  message: (message: string, uuid: string) => void;
  "game-start": () => void;
  "get-players": (callback: (players: Player[]) => void) => void;
}

export interface ServerToClientEvents {
  broadcast: (message: string) => void;
}

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = SocketClient<
  ServerToClientEvents,
  ClientToServerEvents
>;
