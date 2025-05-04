import { GoogleGenerativeAI, } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const data = await request.json();
        const question = data.question;
        const prompt = `You are an AI chatbot named KrishiMitro. A user has asked a question related to agriculture. Understand the question and respond with accurate advice in simple English. Consider factors like crop name, climate, soil quality, and any other relevant agricultural information.
        Question: ${question}`;


        const result = await model.generateContent(prompt);

        const response = result.response.text();

        console.log(response)

        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))

        return NextResponse.json({ question, response });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload', errorName: (error as Error).name });
    }
}