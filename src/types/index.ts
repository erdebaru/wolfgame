import { Socket } from "socket.io";
import { Socket as SocketClient } from "socket.io-client";

export interface Player {
  uuid: string;
  name: string;
  alive: boolean;
}

export interface Info {
  game_status: "waiting" | "on_going";
  round:
  | "new_day"
  | "discuss"
  | "lynch_voting"
  | "lynch"
  | "eliminate_voting"
  | "eliminate";
}

export type Rooms = "lobby" | "game" | "wolf";

export interface ClientToServerEvents {
  "new-player": (name: string, callback: (uuid: string) => void) => void;
  message: (message: string, uuid: string, room: Rooms) => void;
  "game-start": () => void;
  "get-players": (callback: (players: Player[]) => void) => void;
  "add-bot": () => void;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderName?: string;
  senderId?: string;
  timestamp: number;
}

export interface ServerToClientEvents {
  broadcast: (message: ChatMessage | ChatMessage[]) => void;
  "new-player": () => void;
  "game-update": (info: Info) => void;
}

export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = SocketClient<
  ServerToClientEvents,
  ClientToServerEvents
>;
