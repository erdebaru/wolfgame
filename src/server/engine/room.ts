import { generateSecureString } from "../../utils";
import { Player, Players } from "./player";

export class RoomManager {
  static rooms: Map<string, Room> = new Map();

  static createRoom(key: string, participants?: Players) {
    const room = new Room(participants || new Map());
    this.rooms.set(key, room);
    return room;
  }

  static get(key: string) {
    return this.rooms.get(key);
  }
}

export class Room {
  id: string = generateSecureString(5);
  messages: Message[] = [];
  participants: Players;

  constructor(participants: Players) {
    this.participants = participants;
  }

  addParticipant(player: Player) {
    this.participants.set(player.uuid, player);
  }

  message(message: string, uuid: string) {
    this.messages.push(new Message(message, this.participants.get(uuid)));
  }
}

export class Message {
  id: string = generateSecureString(6);
  player: Player | null;
  content: string;

  constructor(content: string, player: Player | null = null) {
    this.player = player;
    this.content = content;
  }

  toString(): string {
    if (this.player) return `${this.player.name}: ${this.content}`;
    return this.content;
  }
}
