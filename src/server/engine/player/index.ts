import { ServerSocket, Player as PlayerInterface } from "../../../types";
import { generateSecureString } from "../../../utils";

export type Players = Map<string, Player>;

export abstract class GamePlayer {

  abstract message(message: string): void;
}

export class Player extends GamePlayer implements PlayerInterface {

  uuid: string = generateSecureString(5);
  name: string;
  alive: boolean = true;
  socket: ServerSocket;

  constructor(name: string, socket: ServerSocket) {
    super();
    this.name = name;
    this.socket = socket;
  }

  message(message: string): void {
    throw new Error("Method not implemented.");
  }
}
