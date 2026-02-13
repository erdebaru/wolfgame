import { Game, Player, Players } from "./engine";

export default class Store {
    static game?: Game;
    static players: Player[] = [];
    static playerMap: Players;

    static setGame(newGame: Game){
        this.game = newGame;
    }

    static assignPlayers(){
        this.playerMap = Game.assignPlayers(this.players, 2);
    }
}
