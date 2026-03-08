import { AIClient } from "./player/ai-client";
import { Info } from "../../types";

export class AINarrator extends AIClient {
    constructor() {
        super({
            name: "Game Master",
            systemPrompt: "You are the dramatic and mysterious Game Master for a game of Werewolf. You watch the events unfold and give brief, flavorful commentary to the players. Never reveal roles unless instructed. Keep it to 1-2 short sentences. Do not use asterisks for roleplay actions, just speak your dialogue.",
        });
    }

    protected async handleBroadcast(message: string): Promise<void> {
        // The Game Master only responds to system events, not player chatter
        // System events in default implementation start with capitalized words usually
        const isSystemEvent = [
            "Game started",
            "Round started,",
            "Vote for who",
            "Voting closed",
            "Night has arrived",
            "What a horrible night",
            "New dawn",
            "Last night",
            "has been lynched",
            "has been eliminated",
        ].some(prefix => message.includes(prefix));

        if (isSystemEvent) {
            this.addHumanMessage(`System Event: ${message}\n\nProvide flavorful commentary based on this event. Keep it brief and thematic.`);
            try {
                const response = await this.model.invoke(this.messages);
                if (response.content) {
                    const reply = response.content.toString().trim();
                    // Store the system event itself in memory without the prompt hook for cleaner history
                    this.messages.pop(); // remove AI msg
                    this.messages.pop(); // remove prompt
                    this.messages.push(this.addHumanMessage(`System Event: ${message}`)); // add clean msg

                    this.sendMessage(reply, "game");
                }
            } catch (e) {
                console.error("[AINarrator] Error:", e);
            }
        } else {
            // Just quietly observe the chat to know context
            if (!message.startsWith("Game Master:")) {
                this.addHumanMessage(`Chat: ${message}`);
            }
        }
    }

    protected async handleGameUpdate(info: Info): Promise<void> {
        // Narrator behavior is mostly driven by broadcast events right now
    }
}
