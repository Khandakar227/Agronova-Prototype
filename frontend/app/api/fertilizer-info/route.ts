import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const data = await request.json();
        const {crop, fertilizer, N, P, K} = data;
        const prompt = `
        আপনি একজন কৃষি বিশেষজ্ঞ যিনি সার এবং মাটির পুষ্টি ব্যবস্থাপনায় দক্ষ। নিম্নলিখিত তথ্যের ভিত্তিতে একটি বিস্তারিত বিশ্লেষণ প্রদান করুন:
ইনপুট তথ্য

ফসলের নাম: ${crop}
সারের নাম: ${fertilizer}
মাটিতে নাইট্রোজেন (N) মান: ${N} kg/hectare
মাটিতে ফসফরাস (P) মান:  ${P} kg/hectare
মাটিতে পটাসিয়াম (K) মান: ${K} kg/hectare

প্রয়োজনীয় আউটপুট

সার বিবরণ:
সারের একটি সংক্ষিপ্ত পর্যালোচনা প্রদান করুন
প্রাথমিক পুষ্টি সংক্রান্ত গঠন এবং সাধারণ কৃষি ব্যবহার ব্যাখ্যা করুন
ফসল বৃদ্ধির জন্য মূল সুবিধাগুলি তুলে ধরুন


প্রস্তাবিত প্রয়োগ:
প্রতি হেক্টর অনুকূল প্রয়োগ হার সুপারিশ করুন
বিভিন্ন ফসলের জন্য মাত্রা সুপারিশ প্রদান করুন
মৌসুমী প্রয়োগ নির্দেশিকা অন্তর্ভুক্ত করুন


সতর্কতা এবং সর্বোত্তম অনুশীলন:
সংরক্ষণ এবং হ্যান্ডলিংয়ের সুপারিশ তালিকা করুন
পরিবেশগত বিবেচনা প্রদান করুন
পরিপূরক কৃষি অনুশীলন সুপারিশ করুন`;

        const result = await model.generateContent(prompt);
        
        const response = result.response.text();
        
        console.log(response)

        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))
        
        return NextResponse.json({ fertilizer, response });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load', errorName: (error as Error).name  });
    }
}