export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const cropRecommendationOptions = {
    soilDepth: [
        { value: "medium (50-150 cm)", label: "Medium (50-150 cm)" },
        { value: "deep (>>150 cm)", label: "Deep (>>150 cm)" },
        { value: "shallow (20-50 cm)", label: "Shallow (20-50 cm)" },
    ],
    soilTexture: [
        { value: "medium", label: "Medium" },
        { value: "light", label: "Light" },
        { value: "heavy", label: "Heavy" },
        { value: "organic", label: "Organic" },
        { value: "wide", label: "Wide" },
    ],
    soilFertility: [
        { value: "moderate", label: "Moderate" },
        { value: "high", label: "High" },
        { value: "low", label: "Low" },
    ],
    soilSalinity: [
        { value: "low (<4 dS/m)", label: "Low (<4 dS/m)" },
        { value: "medium (4-10 dS/m)", label: "Medium (4-10 dS/m)" },
        { value: "high (>10 dS/m))", label: "High (>10 dS/m)" },
        { value: "none", label: "None" },
    ],
    soilDrainage: [
        { value: "low (<4 dS/m)", label: "Low (<4 dS/m)" },
        { value: "medium (4-10 dS/m)", label: "Medium (4-10 dS/m)" },
        { value: "high (>10 dS/m))", label: "High (>10 dS/m)" },
        { value: "none", label: "None" },
    ],
    lightIntensity: [
        { value: "very bright", label: "Very Bright" },
        { value: "clear skies", label: "Clear Skies" },
        { value: "cloudy skies", label: "Cloudy Skies" },
        { value: "light shade", label: "Light Shade" },
        { value: "heavy shade", label: "Heavy Shade" },
    ],
};

export const fertilizersSoilType = {
    "Black": "Black Soil",
    "Clayey": "Clay Soil",
    "Loamy": "Loamy Soil",
    "Red": "Red Soil",
    "Sandy": "Sandy Soil",
};

export const fertilizersCrops = {
    "Barley": "Barley",
    "Cotton": "Cotton",
    "Ground Nuts": "Groundnuts",
    "Maize": "Maize",
    "Millets": "Millets",
    "Oil seeds": "Oilseeds",
    "Paddy": "Paddy",
    "Pulses": "Pulses",
    "Sugarcane": "Sugarcane",
    "Tobacco": "Tobacco",
    "Wheat": "Wheat",
    "coffee": "Coffee",
    "kidneybeans": "Kidney Beans",
    "orange": "Orange",
    "pomegranate": "Pomegranate",
    "rice": "Rice",
    "watermelon": "Watermelon",
};
