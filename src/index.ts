import { createInterface } from "readline/promises";

import {
  Game,
  Player,
} from "./engine/game";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const players = [
    new Player("Baru"),
    new Player("Sherlock"),
    new Player("Tintin"),
    new Player("Conway"),
    new Player("Murphy"),
  ]
  const game = new Game(Game.assignPlayers(players, 1));
  console.log(game.messages.join("\n"))
  game.on("message", (message) => {
    console.log(message);
  });
}

main();