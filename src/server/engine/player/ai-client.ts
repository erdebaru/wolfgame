import { io } from "socket.io-client";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ClientSocket, Info } from "../../../types";

export interface AIClientOptions {
    name: string;
    systemPrompt: string;
}

export abstract class AIClient {
    public socket: ClientSocket;
    public uuid: string | null = null;
    public name: string;

    protected model: ChatGoogleGenerativeAI;
    protected messages: (SystemMessage | HumanMessage | AIMessage)[] = [];
    protected systemPrompt: string;

    constructor(options: AIClientOptions) {
        this.name = options.name;
        this.systemPrompt = options.systemPrompt;

        this.messages = [
            new SystemMessage(this.systemPrompt)
        ];

        this.model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            temperature: 0.8,
        });

        // Connect to the local socket server
        this.socket = io("http://localhost:3000", {
            path: "/ws",
        });

        this.socket.on("connect", () => {
            this.socket.emit("new-player", this.name, (uuid) => {
                this.uuid = uuid;
                this.onConnected();
            });
        });

        this.socket.on("broadcast", async (message: string | string[]) => {
            if (Array.isArray(message)) {
                for (const msg of message) {
                    await this.handleBroadcast(msg);
                }
            } else {
                await this.handleBroadcast(message);
            }
        });

        this.socket.on("game-update", (info: Info) => {
            this.handleGameUpdate(info);
        });
    }

    /**
     * Called when the socket receives a broadcast.
     * AI clients should process the messages and decide if they want to speak.
     */
    protected abstract handleBroadcast(message: string): Promise<void>;

    /**
     * Called when the game state updates (e.g. going into lynch phase)
     */
    protected abstract handleGameUpdate(info: Info): Promise<void>;

    /**
     * Optional hook called after receiving uuid
     */
    protected onConnected() {
        console.log(`${this.name} (AI) connected with UUID ${this.uuid}`);
    }

    /**
     * Sends a message to a room via socket
     */
    public sendMessage(content: string, room: "lobby" | "game" | "wolf" = "game") {
        if (!this.uuid) return;
        this.socket.emit("message", content, this.uuid, room);

        // Also save the bot's own message to its memory so it doesn't get confused
        this.messages.push(new AIMessage(content));
    }

    /**
     * Helper to append to memory and return the new human message
     */
    protected addHumanMessage(content: string) {
        const msg = new HumanMessage(content);
        this.messages.push(msg);
        return msg;
    }
}
