import { EventEmitter } from "node:events";
import { generateSecureString, randomlyPick } from "../../utils";

type GameEvents = {
    round_start: [],
    discussion_start: [],
    lynch_voting_start: [],
    lynched: [],
    eliminate_voting_start: [],
    eliminated: []
    message: [Message]
}


class Game extends EventEmitter<GameEvents> {
    players: Players = new Map();
    wolves: Players = new Map();
    rounds: Round[] = [];
    current: Round;
    messages: Message[] = [];
    phase: "discuss" | "lynch-voting" | "lynch" | "eliminate-voting" | "eliminate" = "discuss";

    constructor(players: Players) {
        super();
        this.players = players;
        for(const [uuid, player] of players.entries()){
            if(player.is === "wolf") this.wolves.set(uuid, player);
        }
        this.current = new Round(this.players)
        this.message(`Game started with ${this.players.size} players, including ${this.wolves.size} wolves.`);
    }

    startRound() {
        this.current = new Round(this.players);
        this.rounds.push(this.current);
        this.message("Round started, Start discussing");
        this.emit('round_start');
        return this.current;
    }

    progress(){
        switch(this.phase) {
            case "discuss": 
                this.message("Vote for who to be lynched");
                this.emit('lynch_voting_start');
                this.phase = "lynch-voting";
                break;
            case "lynch-voting":
                this.message("Voting closed");
                this.emit('lynch_voting_end');
                this.phase = "lynch";
                break;
            case "lynch":
                this.message(this.current.lynch());
                this.emit('lynched');
                this.phase = "eliminate-voting";
                break;
            case "eliminate-voting":
                this.message("Night has arrived.");
                this.emit('eliminate_voting_start');
                this.phase = "eliminate";
                break;
            case "eliminate":
                this.message("New dawn arrives.");
                this.message(`Last night ${this.current.eliminate()}`);
                this.emit('eliminated');
                this.current.end();
                break
                
        }
    }

    message(content: string, player: Player | null = null) {
        const msg = new Message(content, player);
        this.messages.push(msg);
        this.emit("message", msg);
        return msg;
    }

    lynchVote(player: Player, target: Player){
        this.current.lynchVoting.vote(target);
        this.message( `${player.name} voted for ${target.name} to be lynched.`);
    }

    eliminateVote(player: Player, target: Player){
        this.current.eliminateVoting.vote(target);
        this.message( `${player.name} voted for ${target.name} to be eliminated.`);
    }

    static assignPlayers(players: Player[], numOfWolves: number): Players {
        const output: Players = new Map();
        for(const player of players){
            output.set(player.uuid, player);
        }
        const entries = Array.from(output.entries())
        for(let i = 0; i < numOfWolves; i++){
            const wolf = entries[randomlyPick(entries.length)]
            if(!wolf) throw "Failed to pick a wolf";
            wolf[1].is = "wolf";
        }
        return output;
    }
}


class Round {
    players: Players = new Map();
    lynched: Player | undefined;
    eliminated: Player | undefined;
    lynchVoting: Voting = new Voting();
    eliminateVoting: Voting = new Voting();

    constructor(players: Players) {
        this.players = players;
    }

    eliminate(){
        const { success, result } = this.lynchVoting.results();
        if(success) {
            const eliminateTarget = this.players.get(result);
            if(eliminateTarget){
                eliminateTarget.alive = false;
                this.eliminated = eliminateTarget;
                return `[${eliminateTarget.name}] has been eliminated.`
            }
        }
        return "no one was eliminated."
    }

    lynch() {
        const { success, result } = this.lynchVoting.results();
        if(success){
            const lynchTarget = this.players.get(result);
            if(lynchTarget){
                lynchTarget.alive = false;
                this.lynched = lynchTarget;
                return `[${lynchTarget.name}] has been lynched.`
            }
        }
        return "No one was lynched today.";
    }

    end(){
        return "Round ended";
    }
}


class Voting {
    
    votes: Map<string, number> = new Map();
    
    vote(target: Player) {
        this.votes.set(target.uuid, (this.votes.get(target.uuid) ?? 0) + 1);
    }

    results(){
        let highestVote = 0, prev = 0;
        let voteOffUuid: string | undefined;
        for(const [uuid, count] of this.votes.entries()){
            if(highestVote < count) {
                voteOffUuid = uuid;
                prev = highestVote;
                highestVote = count;
            }
        }
        if(highestVote === 0) return { success: false, result: "No votes" }
        if(highestVote === prev || !voteOffUuid) return { success: false, result: "There was a draw" }
        return { success: true, result: voteOffUuid }
    }
}


type Players = Map<string, Player>;

class Player {
    public uuid: string = generateSecureString(5);
    public name: string;
    public is: "villager" | "wolf";
    public alive: boolean = true;

    constructor(name: string, is: "villager" | "wolf" = "villager") {
        this.name = name;
        this.is = is;
    }
}


class Message {
    player: Player | null;
    content: string;

    constructor(content: string, player: Player | null = null) {
        this.player = player;
        this.content = content;
    }

    toString(): string {
        if(this.player)
            return `${this.player.name}: ${this.content}`;
        return this.content;
    }
}

export { Game, Player, Round, Message };