import { GoogleGenerativeAI } from "@google/generative-ai";

export const getCropDetails = async(crop: string) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({crop})
      };
      
    const res = await (await fetch('/api/crop-details-generate', options)).json();
    return res;
}

export const getFertilizerInfo = async(data: {crop: string, fertilizer: string, N: number, P:number, K:number}) => {
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    
  const res = await (await fetch('/api/fertilizer-info', options)).json();
  return res;
}

export const getPlantDiseaseInfo = async(data: {crop: string, disease: string}) => {
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    
  const res = await (await fetch('/api/plant-disease', options)).json();
  return res;
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
export const geminiProModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })