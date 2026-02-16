import { generateSecureString } from "../../../utils";

export type Players = Map<string, Player>;

export class Player {
  public uuid: string = generateSecureString(5);
  public name: string;
  public is: "villager" | "wolf";
  public alive: boolean = true;

  constructor(name: string, is: "villager" | "wolf" = "villager") {
    this.name = name;
    this.is = is;
  }
}
