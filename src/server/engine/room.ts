import { EventEmitter } from "node:events";
import { generateSecureString } from "../../utils";
import { Player, Players } from "./player";
import { ChatMessage, Rooms } from "../../types";

type RoomEvents = {
  join: [Player];
  leave: [];
  message: [Message];
};

export class RoomManager {
  static rooms: Map<string, Room> = new Map();

  static createRoom(key: string, participants?: Players) {
    const room = new Room(key, participants || new Map());
    this.rooms.set(key, room);
    return room;
  }

  static get(key: Rooms) {
    return this.rooms.get(key);
  }

  static getMessages(keys: Rooms[]) {
    return [
      ...keys
        .flatMap((key) => this.get(key)?.messages || [])
        .sort((a, b) => a.timestamp - b.timestamp),
    ];
  }
}

export class Room extends EventEmitter<RoomEvents> {
  key: string;
  messages: Message[] = [];
  participants: Players;
  constructor(key: string, participants: Players) {
    super();
    this.participants = participants;
    this.key = key;
  }

  join(player: Player) {
    this.participants.set(player.uuid, player);
    this.emit("join", player);
  }

  leave(player: Player) {
    this.participants.delete(player.uuid);
    this.emit("leave");
  }

  message(message: Message | string, uuid?: string) {
    let msg: Message;
    if (message instanceof Message) {
      msg = message;
    } else {
      msg = new Message(
        message,
        uuid ? this.participants.get(uuid) : undefined,
      );
    }
    this.messages.push(msg);
    this.emit("message", msg);
  }
}

export class Message {
  id: string = generateSecureString(6);
  player: Player | null;
  content: string;
  timestamp: number;

  constructor(content: string, player: Player | null = null) {
    this.player = player;
    this.content = content;
    this.timestamp = Date.now();
  }

  toString(): string {
    if (this.player) return `${this.player.name}: ${this.content}`;
    return this.content;
  }

  toJSON(): ChatMessage {
    return {
      id: this.id,
      content: this.content,
      ...((this.player) && {
        senderName: this.player.name,
        senderId: this.player.uuid,
      }),
      timestamp: this.timestamp,
    };
  }
}
