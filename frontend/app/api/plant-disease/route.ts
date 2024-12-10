import { geminiProModel } from "@/libs/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {;
        const data = await request.json();
        const {crop, disease} = data;
        const prompt = `
        আপনি একজন কৃষি বিশেষজ্ঞ যিনি গাছের রোগ ও তার প্রতিকার ও প্রতিরোধে দক্ষ। নিম্নলিখিত তথ্যের ভিত্তিতে একটি বিস্তারিত বিশ্লেষণ প্রদান করুন:
ইনপুট তথ্য

ফসলের নাম: ${crop}
রোগের নাম: ${disease}

প্রয়োজনীয় আউটপুট

রোগের বিবরণ
প্রতিকার
প্রতিরোধ

বাংলাদেশের দৃষ্টিকোণ থেকে উল্লেখ করুন। পুরো রেসপ্নস অত্যন্ত সংক্ষিপ্ত রাখুন।
`;

        const result = await geminiProModel.generateContent(prompt);
        
        const response = result.response.text();
        
        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))
        
        return NextResponse.json({ crop, disease, response });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load', errorName: (error as Error).name  });
    }
}