import { ServerSocket } from "../types";
import { Game } from "./engine/game";
import { Player, Players } from "./engine/player";
import { Room, RoomManager } from "./engine/room";

export class GameStore {
  private _game?: Game;
  private _players: Players = new Map();
  private _lobby?: Room;

  get game(): Game | undefined {
    return this._game;
  }

  get players(): Players {
    return this._players;
  }

  get lobby(): Room {
    if (!this._lobby) {
      this._lobby = RoomManager.createRoom("lobby", this._players);
    }
    return this._lobby;
  }

  createLobby() {
    // Ensures lobby is created via the getter
    this.lobby;
  }

  setGame(newGame: Game) {
    this._game = newGame;
  }

  addPlayer(player: Player) {
    this._players.set(player.uuid, player);
  }

  getPlayer(uuid: string): Player | undefined {
    return this._players.get(uuid);
  }

  removePlayer(uuid: string) {
    this._players.delete(uuid);
  }

  getAllPlayers(): Player[] {
    return Array.from(this._players.values());
  }
}

export const store = new GameStore();
