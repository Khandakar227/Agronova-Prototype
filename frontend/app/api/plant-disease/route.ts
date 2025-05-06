import { getGroqChatCompletion } from "@/libs/groq";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        ;
        const data = await request.json();
        const { crop, disease } = data;
        const prompt = `
You are an agricultural expert who is skilled in plant diseases and their remedies and prevention. Provide a detailed analysis based on the following information:
Input information

Crop name: ${crop}

Disease name: ${disease}

Required output

Disease description
Remedy
Prevention

Mention from the perspective of Bangladesh.
`;
        const response = await getGroqChatCompletion([{ role: "user", content: prompt }]);
        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))

        return NextResponse.json({ crop, disease, response: response.choices[0]?.message?.content || "" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load', errorName: (error as Error).name });
    }
}