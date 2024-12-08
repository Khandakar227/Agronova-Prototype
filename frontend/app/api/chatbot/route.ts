import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const data = await request.json();
        const question = data.question;
        const prompt = `আপনি একজন AI চ্যাটবট, যার নাম কৃষিমিত্র। একজন ব্যবহারকারী কৃষি বিষয়ক প্রশ্ন করেছে। তার প্রশ্ন বুঝে সহজ বাংলা ভাষায় সঠিক পরামর্শ দিন। ফসলের নাম, জলবায়ু, মাটির গুণাগুণ, এবং অন্যান্য প্রাসঙ্গিক তথ্য বিবেচনা করুন।
        প্রশ্ন: ${question}`;

        const result = await model.generateContent(prompt);
        
        const response = result.response.text();
        
        console.log(response)

        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))
        
        return NextResponse.json({ question, response });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload', errorName: (error as Error).name  });
    }
}