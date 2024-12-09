import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const data = await request.json();
        const crop = data.crop;
        const prompt = `Give description (for a farmer about it, its benefits etc) about ${crop} in bangla, also its local name in bangla. Please respond only in JSON format: {name: "", description: ""})`;
        const result = await model.generateContent(prompt);
        
        const response = result.response.text();
        
        console.log(response)

        const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))

        
        return NextResponse.json({ crop, result:json });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload', errorName: (error as Error).name  });
    }
}