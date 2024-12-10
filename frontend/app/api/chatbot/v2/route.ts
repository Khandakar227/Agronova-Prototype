import { getGroqChatCompletion } from "@/libs/groq";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        ;
        const data = await request.json();
        const { messages } = data;
        const response = await getGroqChatCompletion(messages);
        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))

        return NextResponse.json({ response: response.choices[0]?.message?.content || "" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load', errorName: (error as Error).name });
    }
}