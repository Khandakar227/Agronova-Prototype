import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const latitude = searchParams.get('lat');
        const longitude = searchParams.get('lng');

        if(!latitude || !longitude) return NextResponse.json({ error: 'Latitude and Longitude are required' }, { status: 400 });
        
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;
        const res = await fetch(`https://power.larc.nasa.gov/api/temporal/monthly/point?start=${lastYear}&end=${currentYear}&latitude=${latitude}&longitude=${longitude}&community=AG&parameters=ALLSKY_SFC_UVA,ALLSKY_SFC_UVB,ALLSKY_SFC_UV_INDEX,T2M,T2MDEW,T2MWET,T2M_RANGE,TS,ALLSKY_SFC_LW_DWN,QV2M,RH2M,PRECTOTCORR,PRECTOTCORR_SUM,PS,WS2M,WS2M_RANGE,WD2M,WS10M,WD10M,GWETTOP,GWETROOT,GWETPROF&format=JSON&theme=light&user=DAVE&time-standard=LST`, {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.7",
              "priority": "u=1, i",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "method": "GET"
          });
        const data = await res.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `You are an agronomist and climate expert. Based on the following data integrating your knowledge, provide crop recommendations don't write too long, suggestions. Here is the data: ${JSON.stringify(data)}`;
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log(response)
        return NextResponse.json({ data: response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to Upload', errorName: (error as Error).name  });
    }
}