import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(messages: ChatCompletionMessageParam[]) {
    return groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192"
    });
  }