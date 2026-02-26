import { GamePlayer } from ".";
import { Player } from "../../../types";

export class Bot extends GamePlayer implements Player {

    uuid: string;
    name: string;
    alive: boolean;
    id: string;

    constructor(uuid: string, name: string) {
        super();
        this.uuid = uuid;
        this.name = name;
        this.alive = true;
        this.id = `bot-${uuid}`;
    }

    message(message: string): void {
        throw new Error("Method not implemented.");
    }
}