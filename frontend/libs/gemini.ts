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