import { ServerSocket } from "../types";
import { Game } from "./engine/game";
import { Player, Players } from "./engine/player";
import { Room, RoomManager } from "./engine/room";

class PlayerConnection {
  uuid: string;
  socket: ServerSocket;

  constructor(uuid: string, socket: ServerSocket) {
    this.uuid = uuid;
    this.socket = socket;
  }
}

export default class Store {
  static game?: Game;
  static players: Players = new Map();
  static lobby: Room;

  static createLobby() {
    if (!this.lobby) this.lobby = RoomManager.createRoom("lobby", this.players);
  }

  static setGame(newGame: Game) {
    this.game = newGame;
  }

  static addPlayer(player: Player) {
    this.players.set(player.uuid, player);
  }
}
