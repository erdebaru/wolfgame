import { Game, Player, Players } from "./engine";

export default class Store {
  static game?: Game;
  static players: Player[] = [];
  static playerMap: Players = new Map();

  static setGame(newGame: Game) {
    this.game = newGame;
  }

  static addPlayer(player: Player) {
    this.players.push(player);
    this.playerMap.set(player.uuid, player);
  }
}
