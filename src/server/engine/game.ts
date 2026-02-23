import { EventEmitter } from "node:events";
import { Players, Player } from "./player";
import { Room, RoomManager } from "./room";

type GameEvents = {
  new_day: [];
  discuss: [];
  lynch_voting: [];
  lynch: [];
  eliminate_voting: [];
  eliminate: [];
};

export class Game extends EventEmitter<GameEvents> {
  players: Players = new Map();
  rounds: Round[] = [];
  current: Round;
  room: Room;
  phase: keyof GameEvents = "discuss";

  constructor(players: Players) {
    super();
    this.players = players;
    this.current = new Round(this.players);
    this.room = RoomManager.createRoom("game", this.players);
  }

  start() {
    this.room.message(`Game started with ${this.players.size} players`);
    this.startRound();
  }

  startRound() {
    this.current = new Round(this.players);
    this.rounds.push(this.current);
    this.room.message("Round started, Start discussing");
    this.emit("round_start");
    return this.current;
  }

  progress() {
    switch (this.phase) {
      case "discuss":
        this.room.message("Vote for who to be lynched");
        this.phase = "lynch_voting";
        break;
      case "lynch_voting":
        this.room.message("Voting closed");
        this.phase = "lynch";
        break;
      case "lynch":
        this.room.message(this.current.lynch());
        this.phase = "eliminate_voting";
        break;
      case "eliminate_voting":
        this.room.message("Night has arrived.");
        this.phase = "eliminate";
        break;
      case "eliminate":
        this.room.message("What a horrible night to have a curse");
        this.current.eliminate();
        this.phase = "new_day";
        break;
      case "new_day":
        this.room.message("New dawn arrives.");
        this.room.message(`Last night ${this.current.eliminated}`);
        this.current.end();
        break;
    }
    this.emit(this.phase);
  }

  lynchVote(player: Player, target: Player) {
    this.current.lynchVoting.vote(target);
    this.room.message(`${player.name} voted for ${target.name} to be lynched.`);
  }

  eliminateVote(player: Player, target: Player) {
    this.current.eliminateVoting.vote(target);
    this.room.message(
      `${player.name} voted for ${target.name} to be eliminated.`,
    );
  }
}

export class Round {
  players: Players = new Map();
  lynched: Player | undefined;
  eliminated: Player | undefined;
  lynchVoting: Voting = new Voting();
  eliminateVoting: Voting = new Voting();

  constructor(players: Players) {
    this.players = players;
  }

  eliminate() {
    const { success, result } = this.lynchVoting.results();
    if (success) {
      const eliminateTarget = this.players.get(result);
      if (eliminateTarget) {
        eliminateTarget.alive = false;
        this.eliminated = eliminateTarget;
        return `[${eliminateTarget.name}] has been eliminated.`;
      }
    }
    return "no one was eliminated.";
  }

  lynch() {
    const { success, result } = this.lynchVoting.results();
    if (success) {
      const lynchTarget = this.players.get(result);
      if (lynchTarget) {
        lynchTarget.alive = false;
        this.lynched = lynchTarget;
        return `[${lynchTarget.name}] has been lynched.`;
      }
    }
    return "No one was lynched today.";
  }

  end() {
    return "Round ended";
  }
}

class Voting {
  votes: Map<string, number> = new Map();

  vote(target: Player) {
    this.votes.set(target.uuid, (this.votes.get(target.uuid) ?? 0) + 1);
  }

  results() {
    let highestVote = 0,
      prev = 0;
    let voteOffUuid: string | undefined;
    for (const [uuid, count] of this.votes.entries()) {
      if (highestVote < count) {
        voteOffUuid = uuid;
        prev = highestVote;
        highestVote = count;
      }
    }
    if (highestVote === 0) return { success: false, result: "No votes" };
    if (highestVote === prev || !voteOffUuid)
      return { success: false, result: "There was a draw" };
    return { success: true, result: voteOffUuid };
  }
}
