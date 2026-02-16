import { Game } from "./engine/game";
import { Player, Players } from "./engine/player";

export default class Store {
  static game?: Game;
  static players: Player[] = [];
  static playerMap: Players = new Map();
  static messages: string[] = [];

  static setGame(newGame: Game) {
    this.game = newGame;
  }

  static addPlayer(player: Player) {
    this.players.push(player);
    this.playerMap.set(player.uuid, player);
  }
}
