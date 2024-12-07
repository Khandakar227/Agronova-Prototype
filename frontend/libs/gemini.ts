export const getCropDetails = async(crop: string) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({crop})
      };
      
    const res = await (await fetch('/api/crop-details-generate', options)).json();
    return res;
}