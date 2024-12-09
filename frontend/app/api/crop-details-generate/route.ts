import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const data = await request.json();
        const crop = data.crop;
        const prompt = `Give plain description(no markdown) (for a farmer about it, its benefits etc) about ${crop} in bangla, also its local name in bengali. Please respond only in JSON format: {name: "", description: ""})`;
        const result = await model.generateContent(prompt);
        
        const response = result.response.text();
        const refined = response
                        .replaceAll("```json", "")
                        .replace("```", "")
                        .replace(/\s+/g, ' ')
                        .replace(/(\r\n|\n|\r)/g, '')
                        .trim();
        console.log(refined)
        const json = JSON.parse(refined);

        return NextResponse.json({ crop, result:json });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload', errorName: (error as Error).name  });
    }
}