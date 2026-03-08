import * as z from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

export function createBot() {
  const discuss = tool(
    (_, config) => {
      return config.context.user_name;
    },
    {
      name: "get_user_name",
      description: "Get the user's name.",
      schema: z.object({}),
    },
  );
}
