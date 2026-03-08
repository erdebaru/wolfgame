import { ServerSocket, Player as PlayerInterface } from "../../../types";
import { generateSecureString } from "../../../utils";

export type Players = Map<string, Player>;

export class Player implements PlayerInterface {
  uuid: string = generateSecureString(5);
  name: string;
  alive: boolean = true;
  socket: ServerSocket;

  constructor(name: string, socket: ServerSocket) {
    this.name = name;
    this.socket = socket;
  }
}
