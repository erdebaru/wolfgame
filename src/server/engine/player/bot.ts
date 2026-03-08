import { AIClient, AIClientOptions } from "./ai-client";
import { ChatMessage, Info } from "../../../types";

export class AIBot extends AIClient {
  constructor(options: AIClientOptions) {
    super(options);
  }

  protected async handleBroadcast(message: ChatMessage): Promise<void> {
    // Do not respond to our own messages to avoid self-loop
    if (message.senderName === this.name) return;

    this.addHumanMessage(`Chat/Event: ${message.content}`);

    // If the game is just chatting, the bot has a chance to respond.
    // If the bot's name is mentioned, it always responds.
    const isMentioned = message.content.includes(this.name);
    const shouldReply = isMentioned || Math.random() > 0.7;

    if (shouldReply) {
      try {
        // Let's explicitly instruct the model to reply to the current chat
        const responseMessage = this.addHumanMessage("System: Please provide your next chat response or action. If you have nothing to say, output exactly 'SILENCE'.");

        const response = await this.model.invoke(this.messages);
        const reply = response.content.toString().trim();

        // Remove the system prompt requesting a response from memory to keep it clean
        this.messages.pop(); // removes the AI message
        this.messages.pop(); // removes the "System: Please provide..." human message

        if (reply !== "SILENCE" && reply !== "") {
          this.sendMessage(reply, "game");
        } else {
          // we popped out the AI message from Langchain, so we are good
        }
      } catch (e) {
        console.error(`[AIBot ${this.name}] Error generating response:`, e);
      }
    }
  }

  protected async handleGameUpdate(info: Info): Promise<void> {
    this.addHumanMessage(`System: Game state changed to ${info.game_status}, Phase: ${info.round}`);

    // If voting, could instruct the bot to vote via a specialized function or tool later.
    // For now, it will just know the phase changed.
  }
}
