import { geminiProModel } from "@/libs/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const {crop, fertilizer, N, P, K} = data;
        const prompt = `
        You are an agricultural expert who is skilled in fertilizer and soil nutrient management. Provide a detailed analysis based on the following information:
Input Information

Crop Name: ${crop}
Fertilizer Name: ${fertilizer}
Nitrogen (N) Value in Soil: ${N} kg/hectare
Phosphorus (P) Value in Soil: ${P} kg/hectare
Potassium (K) Value in Soil: ${K} kg/hectare

Required Output

Fertilizer Description:
Provide a brief overview of the fertilizer
Explain the primary nutrient composition and common agricultural uses
Highlight the key benefits for crop growth

Recommended Application:
Recommend optimal application rate per hectare
Provide dose recommendations for different crops
Include seasonal application guidelines

Precautions and Best Practices:
List storage and handling recommendations
Provide environmental considerations
Recommend complementary agricultural practices`;

        const result = await geminiProModel.generateContent(prompt);
        
        const response = result.response.text();
        
        console.log(response)

        // const json = JSON.parse(response.replaceAll("```json", "").replace("```", ""))
        
        return NextResponse.json({ fertilizer, response });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to load', errorName: (error as Error).name  });
    }
}